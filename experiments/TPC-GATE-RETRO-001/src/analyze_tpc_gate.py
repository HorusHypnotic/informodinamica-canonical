import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import HistGradientBoostingRegressor, RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.inspection import permutation_importance

ROOT = Path('/home/ubuntu/tpc_gate')
raw = pd.read_csv(ROOT/'incident_event_log.csv', low_memory=False)
raw['opened_at_dt'] = pd.to_datetime(raw['opened_at'], dayfirst=True, errors='coerce')
raw['updated_at_dt'] = pd.to_datetime(raw['sys_updated_at'], dayfirst=True, errors='coerce')
raw['resolved_at_dt'] = pd.to_datetime(raw['resolved_at'], dayfirst=True, errors='coerce')
raw['closed_at_dt'] = pd.to_datetime(raw['closed_at'], dayfirst=True, errors='coerce')
raw['impact_num'] = raw['impact'].astype(str).str.extract(r'(\d)').astype(float)
raw['urgency_num'] = raw['urgency'].astype(str).str.extract(r'(\d)').astype(float)
raw['priority_num'] = raw['priority'].astype(str).str.extract(r'(\d)').astype(float)

# First event is used to avoid using future incident information in predictors.
r = raw.sort_values(['number','updated_at_dt']).groupby('number', sort=False).first().reset_index()
# Incident-level end times are taken from all rows; these define outcome duration only.
ends = raw.groupby('number').agg(resolved_at_dt=('resolved_at_dt','max'), closed_at_dt=('closed_at_dt','max'),
                                n_events=('number','size'), max_reassign=('reassignment_count','max'),
                                max_reopen=('reopen_count','max'), max_mod=('sys_mod_count','max')).reset_index()
r = r.drop(columns=[c for c in ['resolved_at_dt','closed_at_dt','n_events','max_reassign','max_reopen','max_mod'] if c in r])
r = r.merge(ends, on='number', how='left')
r['Y_hours'] = (r['resolved_at_dt']-r['opened_at_dt']).dt.total_seconds()/3600
r['closed_hours'] = (r['closed_at_dt']-r['opened_at_dt']).dt.total_seconds()/3600
r = r[(r['opened_at_dt'].notna()) & (r['Y_hours'].notna()) & (r['Y_hours']>=0)].copy()
r = r.sort_values('opened_at_dt').reset_index(drop=True)

# First state transition time is an output observed after opening but before closure.
first_updates = raw.groupby('number').agg(first_update=('updated_at_dt','min')).reset_index()
r = r.merge(first_updates, on='number', how='left')
r['O_first_update_hours'] = (r['first_update']-r['opened_at_dt']).dt.total_seconds()/3600
# Use early observable output only; cap extreme values for stable modeling.
r['O_first_update_hours'] = r['O_first_update_hours'].clip(lower=0, upper=r['O_first_update_hours'].quantile(.99))

# Build pre-event group history using only incidents opened before current timestamp.
# X: prior 30-day event burden and unresolved backlog in assignment group.
# C proxy: prior 30-day completion throughput and inverse active backlog; independent of current incident output.
r['group'] = r['assignment_group'].fillna('UNKNOWN').astype(str)
r['category_clean'] = r['category'].fillna('UNKNOWN').astype(str)
r['opened_day'] = r['opened_at_dt'].dt.floor('D')
all_open = r[['number','group','opened_at_dt','closed_at_dt','Y_hours']].copy()
# Efficient historical features via per-group rolling time windows.
parts=[]
for g, d in r.groupby('group', sort=False):
    d=d.sort_values('opened_at_dt').copy().set_index('opened_at_dt')
    # shift ensures current incident cannot enter its own history
    d['X_prior_30d_opened'] = d['number'].rolling('30D').count().shift(1)
    d['X_prior_90d_opened'] = d['number'].rolling('90D').count().shift(1)
    # throughput of incidents resolved in prior 30d based on resolution timestamps
    resolved = d[['closed_at_dt']].copy()
    # count previous closed incidents by closed time using original table below
    parts.append(d.reset_index())
h = pd.concat(parts, ignore_index=True)
# Recompute backlog and throughput per incident with explicit prior-event joins per group, avoiding current leakage.
# For each group/time, prior opened count minus prior closed count.
starts = r[['number','group','opened_at_dt']].sort_values('opened_at_dt')
closes = r[['number','group','closed_at_dt']].dropna().sort_values('closed_at_dt')
backlog=[]; throughput=[]
for _, row in r.iterrows():
    g,t=row['group'],row['opened_at_dt']
    prior_open=((starts['group']==g)&(starts['opened_at_dt']<t)&(starts['opened_at_dt']>=t-pd.Timedelta(days=30))).sum()
    prior_close=((closes['group']==g)&(closes['closed_at_dt']<t)&(closes['closed_at_dt']>=t-pd.Timedelta(days=30))).sum()
    backlog.append(max(prior_open-prior_close,0))
    throughput.append(prior_close)
r['X_backlog_30d']=backlog
r['C_throughput_30d']=throughput
r['C_capacity_proxy']=1/(1+r['X_backlog_30d'])
# prior group mean duration, only closed before current opening, as a second capacity/legacy proxy
prior_mean=[]
for _, row in r.iterrows():
    q=r[(r['group']==row['group'])&(r['closed_at_dt']<row['opened_at_dt'])&(r['closed_at_dt']>=row['opened_at_dt']-pd.Timedelta(days=90))]
    prior_mean.append(q['Y_hours'].mean() if len(q) else np.nan)
r['C_prior_mean_resolution']=prior_mean

# Next comparable perturbation Y: next incident in same group, with comparable P dimensions. Use next incident as outcome.
r = r.sort_values(['group','opened_at_dt']).reset_index(drop=True)
r['next_Y_hours']=r.groupby('group')['Y_hours'].shift(-1)
r['next_impact_num']=r.groupby('group')['impact_num'].shift(-1)
r['next_urgency_num']=r.groupby('group')['urgency_num'].shift(-1)
r['next_dt_hours']=(r.groupby('group')['opened_at_dt'].shift(-1)-r['opened_at_dt']).dt.total_seconds()/3600
# Retain rows where next event outcome exists and predictors are pre-next-event.
df=r[(r['next_Y_hours'].notna()) & (r['O_first_update_hours'].notna())].copy()
# Define Tr independently from target: 24h operational recovery threshold (predeclared); test only as sensitivity.
df['delta_lt_Tr']=(df['next_dt_hours']<24).astype(int)
# Basic categorical and numeric features. Baseline uses P + O + S0.
base_num=['impact_num','urgency_num','priority_num','O_first_update_hours']
base_cat=['category_clean','contact_type','group']
xc_num=['X_backlog_30d','C_throughput_30d','C_capacity_proxy','C_prior_mean_resolution']
# time split 80/20 to prevent temporal leakage
df=df.sort_values('opened_at_dt').reset_index(drop=True)
split=int(len(df)*0.8); train=df.iloc[:split]; test=df.iloc[split:]

def fit_eval(cols_num, cols_cat, train=train, test=test):
    pre=ColumnTransformer([('num',Pipeline([('imp',SimpleImputer(strategy='median')),('sc',StandardScaler())]),cols_num),
                          ('cat',Pipeline([('imp',SimpleImputer(strategy='most_frequent')),('oh',OneHotEncoder(handle_unknown='ignore', sparse_output=False))]),cols_cat)])
    model=Pipeline([('pre',pre),('model',HistGradientBoostingRegressor(max_iter=180,max_leaf_nodes=15, learning_rate=.06, l2_regularization=1.0, random_state=7))])
    model.fit(train[cols_num+cols_cat],train['next_Y_hours'])
    pred=model.predict(test[cols_num+cols_cat])
    return {'MAE_hours':mean_absolute_error(test['next_Y_hours'],pred),'RMSE_hours':mean_squared_error(test['next_Y_hours'],pred)**0.5,'R2':r2_score(test['next_Y_hours'],pred)}, model, pred

results=[]
configs=[('P+O+S0',base_num,base_cat),('P+O+X',base_num+['X_backlog_30d'],base_cat),('P+O+C',base_num+['C_throughput_30d','C_capacity_proxy','C_prior_mean_resolution'],base_cat),('P+O+X+C',base_num+xc_num,base_cat)]
models={}
for name,n,c in configs:
    m,model,p=fit_eval(n,c); m['model']=name; results.append(m); models[name]=(model,p)

# Placebo: shuffle X/C within training only, preserving marginal distribution but destroying temporal meaning.
rng=np.random.default_rng(7)
placebo_train=train.copy()
for col in xc_num: placebo_train[col]=rng.permutation(placebo_train[col].to_numpy())
pre=ColumnTransformer([('num',Pipeline([('imp',SimpleImputer(strategy='median')),('sc',StandardScaler())]),base_num+xc_num),('cat',Pipeline([('imp',SimpleImputer(strategy='most_frequent')),('oh',OneHotEncoder(handle_unknown='ignore', sparse_output=False))]),base_cat)])
placebo_model=Pipeline([('pre',pre),('model',HistGradientBoostingRegressor(max_iter=180,max_leaf_nodes=15, learning_rate=.06,l2_regularization=1.0,random_state=7))])
placebo_model.fit(placebo_train[base_num+xc_num+base_cat],placebo_train['next_Y_hours'])
pp=placebo_model.predict(test[base_num+xc_num+base_cat])
results.append({'model':'P+O+X+C placebo shuffled','MAE_hours':mean_absolute_error(test['next_Y_hours'],pp),'RMSE_hours':mean_squared_error(test['next_Y_hours'],pp)**0.5,'R2':r2_score(test['next_Y_hours'],pp)})

# Δt sensitivity: compare conditional means and a simple regression coefficient with controls.
summary=df.groupby('delta_lt_Tr').agg(n=('next_Y_hours','size'),mean_next_Y=('next_Y_hours','mean'),median_next_Y=('next_Y_hours','median'),mean_X=('X_backlog_30d','mean'),mean_C=('C_capacity_proxy','mean')).reset_index()
# Robustness by temporal halves and severity strata
rob=[]
for label, sub in [('early',df.iloc[:len(df)//2]),('late',df.iloc[len(df)//2:])]:
    if len(sub)>50:
        tr=int(len(sub)*.8); a=sub.iloc[:tr]; b=sub.iloc[tr:]
        m,_,_=fit_eval(base_num+xc_num,base_cat,train=a,test=b)
        m['segment']=label; rob.append(m)
for label, sub in df.groupby('impact_num'):
    if len(sub)>100:
        tr=int(len(sub)*.8); a=sub.sort_values('opened_at_dt').iloc[:tr]; b=sub.sort_values('opened_at_dt').iloc[tr:]
        m,_,_=fit_eval(base_num+xc_num,base_cat,train=a,test=b); m['segment']=f'impact_{label}';rob.append(m)

df[['number','group','opened_at_dt','next_dt_hours','impact_num','urgency_num','O_first_update_hours','X_backlog_30d','C_throughput_30d','C_capacity_proxy','C_prior_mean_resolution','next_Y_hours','delta_lt_Tr']].to_csv(ROOT/'tpc_analysis_rows.csv',index=False)
pd.DataFrame(results).to_csv(ROOT/'model_results.csv',index=False)
summary.to_csv(ROOT/'delta_tr_summary.csv',index=False)
pd.DataFrame(rob).to_csv(ROOT/'robustness_results.csv',index=False)
print('ROWS_RAW',len(raw),'INCIDENTS',len(r),'ANALYSIS_ROWS',len(df),'TRAIN',len(train),'TEST',len(test))
print(pd.DataFrame(results).to_string(index=False))
print('DELTA_TR')
print(summary.to_string(index=False))
print('ROBUSTNESS')
print(pd.DataFrame(rob).to_string(index=False))

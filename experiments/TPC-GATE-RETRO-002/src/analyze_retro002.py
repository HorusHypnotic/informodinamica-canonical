import pandas as pd, numpy as np
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

ROOT=Path('/home/ubuntu/tpc_gate'); OUT=ROOT/'retro002_outputs'; OUT.mkdir(exist_ok=True)
raw=pd.read_csv(ROOT/'incident_event_log.csv',low_memory=False)
for c in ['opened_at','sys_updated_at','resolved_at','closed_at']:
    raw[c+'_dt']=pd.to_datetime(raw[c],dayfirst=True,errors='coerce')
raw['impact_num']=raw['impact'].astype(str).str.extract(r'(\d)').astype(float)
raw['urgency_num']=raw['urgency'].astype(str).str.extract(r'(\d)').astype(float)
raw['priority_num']=raw['priority'].astype(str).str.extract(r'(\d)').astype(float)
raw=raw.sort_values(['number','sys_updated_at_dt'])
first=raw.groupby('number',sort=False).first().reset_index()
ends=raw.groupby('number').agg(resolved_at_dt=('resolved_at_dt','max'),closed_at_dt=('closed_at_dt','max'),n_events=('number','size'),max_reassign=('reassignment_count','max'),max_reopen=('reopen_count','max'),max_mod=('sys_mod_count','max')).reset_index()
r=first.drop(columns=[c for c in ['resolved_at_dt','closed_at_dt','n_events','max_reassign','max_reopen','max_mod'] if c in first]).merge(ends,on='number')
r['Y_hours']=(r.resolved_at_dt-r.opened_at_dt).dt.total_seconds()/3600
first_update=raw.groupby('number').agg(first_update=('sys_updated_at_dt','min')).reset_index(); r=r.merge(first_update,on='number')
r['O_first_update_hours']=((r.first_update-r.opened_at_dt).dt.total_seconds()/3600).clip(lower=0)
r['group']=r.assignment_group.fillna('UNKNOWN').astype(str); r['category_clean']=r.category.fillna('UNKNOWN').astype(str)
r=r[(r.opened_at_dt.notna())&(r.Y_hours.notna())&(r.Y_hours>=0)].sort_values('opened_at_dt').reset_index(drop=True)
# Historical features are strictly prior to each opening. X is 30d backlog; C is throughput and inverse backlog. MH is raw history, no TPC labels.
starts=r[['number','group','opened_at_dt','impact_num','urgency_num','Y_hours']].sort_values('opened_at_dt'); closes=r[['number','group','closed_at_dt','Y_hours']].dropna().sort_values('closed_at_dt')
features=[]
for _,row in r.iterrows():
    g,t=row.group,row.opened_at_dt
    op=(starts.group.eq(g)&starts.opened_at_dt.lt(t)); cl=(closes.group.eq(g)&closes.closed_at_dt.lt(t))
    w30=op&starts.opened_at_dt.ge(t-pd.Timedelta(days=30)); w90=op&starts.opened_at_dt.ge(t-pd.Timedelta(days=90))
    cw30=cl&closes.closed_at_dt.ge(t-pd.Timedelta(days=30)); cw90=cl&closes.closed_at_dt.ge(t-pd.Timedelta(days=90))
    prior_durs=closes.loc[cw90,'Y_hours']
    prior_imp=starts.loc[w90,'impact_num']; prior_urg=starts.loc[w90,'urgency_num']
    last_ts=starts.loc[op,'opened_at_dt'].max() if op.any() else pd.NaT
    features.append({'X_backlog_30d':max(int(w30.sum())-int(cw30.sum()),0),'C_throughput_30d':int(cw30.sum()),'C_capacity_proxy':1/(1+max(int(w30.sum())-int(cw30.sum()),0)),'C_prior_mean_resolution':prior_durs.mean() if len(prior_durs) else np.nan,'H_prior_open_30d':int(w30.sum()),'H_prior_open_90d':int(w90.sum()),'H_prior_mean_impact_90d':prior_imp.mean() if len(prior_imp) else np.nan,'H_prior_mean_urgency_90d':prior_urg.mean() if len(prior_urg) else np.nan,'H_prior_mean_duration_90d':prior_durs.mean() if len(prior_durs) else np.nan,'H_prior_incident_rate_30d':int(w30.sum())/30,'H_hours_since_prior':((t-last_ts).total_seconds()/3600 if pd.notna(last_ts) else np.nan)})
r=pd.concat([r.reset_index(drop=True),pd.DataFrame(features)],axis=1)
r=r.sort_values(['group','opened_at_dt']).reset_index(drop=True)
r['next_Y_hours']=r.groupby('group').Y_hours.shift(-1); r['next_opened_at']=r.groupby('group').opened_at_dt.shift(-1); r['next_dt_hours']=(r.next_opened_at-r.opened_at_dt).dt.total_seconds()/3600
r=r[r.next_Y_hours.notna()].copy(); r['delta_lt_24']=(r.next_dt_hours<24).astype(int)
# Time split by current opening; all features pre-current and target is next group incident.
r=r.sort_values('opened_at_dt').reset_index(drop=True); cut=int(.8*len(r)); train=r.iloc[:cut].copy(); test=r.iloc[cut:].copy()
base_num=['impact_num','urgency_num','priority_num','O_first_update_hours']; cat=['category_clean','contact_type','group']
x_num=['X_backlog_30d']; c_num=['C_throughput_30d','C_capacity_proxy','C_prior_mean_resolution']; hist_num=['H_prior_open_30d','H_prior_open_90d','H_prior_mean_impact_90d','H_prior_mean_urgency_90d','H_prior_mean_duration_90d','H_prior_incident_rate_30d','H_hours_since_prior']
def fit(cols):
    pre=ColumnTransformer([('n',Pipeline([('i',SimpleImputer(strategy='median')),('s',StandardScaler())]),cols),('c',Pipeline([('i',SimpleImputer(strategy='most_frequent')),('o',OneHotEncoder(handle_unknown='ignore',sparse_output=False))]),cat)])
    m=Pipeline([('p',pre),('g',HistGradientBoostingRegressor(max_iter=180,max_leaf_nodes=15,learning_rate=.06,l2_regularization=1,random_state=7))]); m.fit(train[cols+cat],train.next_Y_hours); p=m.predict(test[cols+cat]); return {'MAE_hours':mean_absolute_error(test.next_Y_hours,p),'RMSE_hours':mean_squared_error(test.next_Y_hours,p)**.5,'R2':r2_score(test.next_Y_hours,p)}
configs={'M0_P+O+S0':base_num,'M1_P+O+X':base_num+x_num,'M2_P+O+C':base_num+c_num,'M3_P+O+X+C':base_num+x_num+c_num,'MH_P+O+S0+HIST':base_num+hist_num,'MHXC_P+O+S0+HIST+X+C':base_num+hist_num+x_num+c_num,'NULL_HISTORY':base_num+['H_prior_open_30d','H_prior_open_90d','H_prior_mean_impact_90d','H_prior_mean_urgency_90d','H_prior_mean_duration_90d']}
res=[]
for name,cols in configs.items():
    z=fit(cols); z['model']=name; res.append(z)
# placebos: repeat 20 permutations of historical X/C in both train/test, preserving marginal distributions.
rng=np.random.default_rng(2026); placebo=[]
for i in range(20):
    tr=train.copy(); te=test.copy()
    for col in x_num+c_num:
        tr[col]=rng.permutation(tr[col].to_numpy()); te[col]=rng.permutation(te[col].to_numpy())
    old_train,old_test=train,test; train,test=tr,te; z=fit(base_num+x_num+c_num); train,test=old_train,old_test
    z.update({'replicate':i+1,'model':'TPC_PLACEBO_SHUFFLED'}); placebo.append(z)
pd.DataFrame(placebo).to_csv(OUT/'placebo_results.csv',index=False)
# window sensitivity: recompute backlog/throughput approximately from fixed 7/30/90-day raw history using same routine values already available for 30; use history windows as predictors where available and compare model specification.
# stability by time halves and impact strata
stab=[]
for label,sub in [('early',r.iloc[:len(r)//2]),('late',r.iloc[len(r)//2:])]:
    c=int(.8*len(sub)); a,b=train,test
    # local temporal split
    a=sub.iloc[:c]; b=sub.iloc[c:]
    for name,cols in {'M0':base_num,'M3':base_num+x_num+c_num,'MH':base_num+hist_num,'MHXC':base_num+hist_num+x_num+c_num}.items():
        old_train,old_test=train,test; train,test=a,b; z=fit(cols); train,test=old_train,old_test; z.update({'segment':label,'model':name}); stab.append(z)
for val,sub in r.groupby('impact_num'):
    if len(sub)>200:
        c=int(.8*len(sub)); a,b=sub.iloc[:c],sub.iloc[c:]
        for name,cols in {'M0':base_num,'M3':base_num+x_num+c_num,'MH':base_num+hist_num,'MHXC':base_num+hist_num+x_num+c_num}.items():
            old_train,old_test=train,test; train,test=a,b; z=fit(cols); train,test=old_train,old_test; z.update({'segment':f'impact_{val}','model':name}); stab.append(z)
# delta summary, with explicit not-testable warning
summary=r.groupby('delta_lt_24').agg(n=('next_Y_hours','size'),mean_Y=('next_Y_hours','mean'),median_Y=('next_Y_hours','median'),mean_X=('X_backlog_30d','mean'),mean_C=('C_capacity_proxy','mean')).reset_index()
pd.DataFrame(res).to_csv(OUT/'model_results_retro002.csv',index=False); pd.DataFrame(stab).to_csv(OUT/'stability_results.csv',index=False); summary.to_csv(OUT/'delta_24_summary.csv',index=False)
r[['number','group','opened_at_dt','next_dt_hours','impact_num','urgency_num','O_first_update_hours','X_backlog_30d','C_throughput_30d','C_capacity_proxy','C_prior_mean_resolution','H_prior_open_30d','H_prior_open_90d','H_prior_mean_duration_90d','next_Y_hours','delta_lt_24']].to_csv(OUT/'analysis_rows_retro002.csv',index=False)
print('RAW_EVENTS',len(raw),'INCIDENTS',len(r),'TRAIN',len(train),'TEST',len(test)); print(pd.DataFrame(res).to_string(index=False)); print('\nPLACEBO'); print(pd.DataFrame(placebo).describe().to_string()); print('\nSTABILITY'); print(pd.DataFrame(stab).to_string(index=False)); print('\nDELTA'); print(summary.to_string(index=False))

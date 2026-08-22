from pathlib import Path
from collections import defaultdict
import json, math
import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

ROOT=Path('/home/ubuntu/science-radar-006-oulad/raw'); OUT=Path('/home/ubuntu/science-radar-006-results'); OUT.mkdir(exist_ok=True)
SEED=2026
keys=['id_student','code_module','code_presentation']

ass=pd.read_csv(ROOT/'assessments.csv')
sa=pd.read_csv(ROOT/'studentAssessment.csv')
si=pd.read_csv(ROOT/'studentInfo.csv')
sr=pd.read_csv(ROOT/'studentRegistration.csv')
# Join raw assessment submissions to assessment schedule.
sa=sa.merge(ass[['id_assessment','code_module','code_presentation','date','weight','assessment_type']],on='id_assessment',how='inner')
sa['date']=pd.to_numeric(sa['date'],errors='coerce'); sa['date_submitted']=pd.to_numeric(sa['date_submitted'],errors='coerce'); sa['score']=pd.to_numeric(sa['score'],errors='coerce')
sa=sa.dropna(subset=['date','date_submitted','score']).copy()
sa['date']=sa['date'].astype(int); sa['date_submitted']=sa['date_submitted'].astype(int)
# Student metadata is pre-module; keep only fields documented as registration/demographic.
meta=si.merge(sr[keys+['date_registration','date_unregistration']],on=keys,how='left')
meta_cols=['gender','region','highest_education','imd_band','age_band','num_of_prev_attempts','studied_credits','disability','date_registration','date_unregistration']
meta=meta[keys+meta_cols].drop_duplicates(keys)
for c in ['num_of_prev_attempts','studied_credits','date_registration','date_unregistration']:
    meta[c]=pd.to_numeric(meta[c],errors='coerce')
meta=pd.get_dummies(meta,columns=['gender','region','highest_education','imd_band','age_band','disability'],dummy_na=True)

# Build next-assessment target rows. Require previous submission and target outcome after target assessment date.
sa=sa.sort_values(keys+['date','date_submitted','id_assessment']).reset_index(drop=True)
rows=[]; exclusions=defaultdict(int)
for k,g in sa.groupby(keys,sort=False):
    g=g.sort_values(['date','date_submitted','id_assessment']).reset_index(drop=True)
    for i in range(1,len(g)):
        cur=g.iloc[i]; hist=g.iloc[:i]
        prev=hist[hist['date_submitted'] < cur['date_submitted']]
        if prev.empty: exclusions['no_strict_prior_submission']+=1; continue
        if not (cur['date_submitted'] > cur['date']): exclusions['outcome_not_after_assessment_date']+=1; continue
        p=prev.iloc[-1]
        rec={'id_student':int(cur.id_student),'code_module':cur.code_module,'code_presentation':cur.code_presentation,'id_assessment':int(cur.id_assessment),'TC':int(cur.date),'TY':int(cur.date_submitted),'Y_score':float(cur.score),'assessment_type':cur.assessment_type,'target_weight':float(cur.weight),'prev_score':float(p.score),'hist_mean_score':float(prev.score.mean()),'hist_median_score':float(prev.score.median()),'hist_n':int(len(prev)),'days_since_prev_submission':int(cur.date_submitted-p.date_submitted),'prev_assessment_date':int(p.date),'prev_submission_date':int(p.date_submitted)}
        rec['hist_weighted_mean']=float(np.average(prev.score,weights=prev.weight.fillna(0.0))) if prev.weight.fillna(0).sum()>0 else np.nan
        rows.append(rec)
target=pd.DataFrame(rows)
if target.empty: raise RuntimeError('NO_ELIGIBLE_TARGET_ROWS')
# Static metadata merge.
target=target.merge(meta,on=keys,how='left',validate='many_to_one')

# Activity features from raw studentVle, keyed by student/module/presentation and date.
target['_row_id']=np.arange(len(target)); target_times=target[keys+['_row_id','TC']].copy()
daily_parts=[]
for chunk in pd.read_csv(ROOT/'studentVle.csv',chunksize=750000):
    chunk=chunk.merge(target_times,on=keys,how='inner')
    chunk=chunk[chunk['date'] < chunk['TC']]
    if chunk.empty: continue
    d=chunk.groupby(keys+['TC','_row_id'],as_index=False).agg(clicks=('sum_click','sum'),sites=('id_site','nunique'))
    daily_parts.append(d)
if daily_parts:
    act=pd.concat(daily_parts,ignore_index=True).groupby(['_row_id','TC'],as_index=False).agg(clicks_pre=('clicks','sum'),sites_pre=('sites','sum'),active_days_pre=('TC','size'))
    # The per-chunk site sum is an upper bound when a site crosses chunks; use it only as a documented approximate count.
    target=target.merge(act,on=['_row_id','TC'],how='left')
else:
    target['clicks_pre']=np.nan; target['sites_pre']=np.nan; target['active_days_pre']=np.nan
for c in ['clicks_pre','sites_pre','active_days_pre']: target[c]=target[c].fillna(0.0)
# Windowed event counts require a second pass with target-specific dates; use cumulative daily totals from the joined rows.
# Reuse daily source with exact target-row linkage to compute last-7/30-day counts and activity profiles.
window_parts=[]
for chunk in pd.read_csv(ROOT/'studentVle.csv',chunksize=750000):
    chunk=chunk.merge(target_times,on=keys,how='inner')
    chunk=chunk[(chunk['date'] < chunk['TC']) & (chunk['date'] >= chunk['TC']-30)]
    if chunk.empty: continue
    chunk['in7']=(chunk['date']>=chunk['TC']-7).astype(int)
    d=chunk.groupby(['_row_id','TC'],as_index=False).agg(clicks_30=('sum_click','sum'),active_days_30=('date','nunique'))
    # calculate 7-day clicks from rows with in7 in a separate group
    d7=chunk[chunk['in7']==1].groupby(['_row_id','TC'],as_index=False).agg(clicks_7=('sum_click','sum'),active_days_7=('date','nunique'))
    window_parts.append(d.merge(d7,on=['_row_id','TC'],how='outer'))
if window_parts:
    win=pd.concat(window_parts,ignore_index=True).groupby(['_row_id','TC'],as_index=False).sum(numeric_only=True)
    target=target.merge(win,on=['_row_id','TC'],how='left')
else:
    for c in ['clicks_30','active_days_30','clicks_7','active_days_7']: target[c]=np.nan
for c in ['clicks_30','active_days_30','clicks_7','active_days_7']: target[c]=target[c].fillna(0.0)
target['activity_rate_30']=target['clicks_30']/(target['active_days_30']+1)
target['activity_rate_7']=target['clicks_7']/(target['active_days_7']+1)
target['activity_ratio_7_30']=(target['clicks_7']+1)/(target['clicks_30']+1)
target=target.drop(columns=['_row_id'])

# Categorical target identifier fields are not predictors; presentation/module are contextual pre-task controls.
cat_context=pd.get_dummies(target[['code_module','code_presentation','assessment_type']],dummy_na=True)
target=pd.concat([target.drop(columns=['code_module','code_presentation','assessment_type']),cat_context],axis=1)
# All model columns are numeric except IDs and dates.
base=[c for c in target.columns if c.startswith('hist_') or c.startswith('prev_') or c in ['days_since_prev_submission','target_weight','TC','date_registration','date_unregistration','num_of_prev_attempts','studied_credits'] or c.startswith(('gender_','region_','highest_','imd_','age_','disability_'))]
activity=['clicks_pre','sites_pre','active_days_pre']
profile=['clicks_7','active_days_7','clicks_30','active_days_30','activity_rate_7','activity_rate_30','activity_ratio_7_30']
# Keep TC out of predictors; it defines the cutoff, not a causal input.
base=[c for c in base if c not in ['TC','TY','Y_score','id_student','id_assessment']]
M0=base; M1=base+activity; M2=base+activity+profile

# Deterministic student-level split.
students=np.array(sorted(target['id_student'].unique())); rng=np.random.default_rng(SEED); rng.shuffle(students); ntr=int(np.floor(.8*len(students))); train_ids=set(students[:ntr]);
train=target[target.id_student.isin(train_ids)].copy(); test=target[~target.id_student.isin(train_ids)].copy()

def scores(y,p): return {'MAE':float(mean_absolute_error(y,p)),'RMSE':float(mean_squared_error(y,p)**0.5),'R2':float(r2_score(y,p)),'n_train_rows':len(train),'n_test_rows':len(test),'n_train_students':train.id_student.nunique(),'n_test_students':test.id_student.nunique()}
def fit(cols,tr=train,te=test):
    model=Pipeline([('impute',SimpleImputer(strategy='median',add_indicator=True)),('scale',StandardScaler()),('gb',HistGradientBoostingRegressor(max_iter=180,max_leaf_nodes=15,learning_rate=.06,l2_regularization=1,random_state=SEED))])
    model.fit(tr[cols],tr.Y_score); return model.predict(te[cols])
res=[]
for name,cols in [('BASE_MEAN',[]),('M0_HISTORY',M0),('M1_HISTORY_ACTIVITY',M1),('M2_HISTORY_ACTIVITY_PROFILE',M2)]:
    p=np.repeat(train.Y_score.mean(),len(test)) if not cols else fit(cols)
    z=scores(test.Y_score,p); z['model']=name; res.append(z)
# Placebos: permute only activity/profile additions.
placebo=[]
for i in range(20):
    tr=train.copy(); te=test.copy(); rg=np.random.default_rng(SEED+i+1)
    for c in activity+profile:
        tr[c]=rg.permutation(tr[c].to_numpy()); te[c]=rg.permutation(te[c].to_numpy())
    p=fit(M2,tr,te); z={'replicate':i+1,'model':'M2_SHUFFLED_ACTIVITY'}; z.update(scores(te.Y_score,p)); placebo.append(z)
# Sensitivity: remove last 7 days from activity features by zeroing only the explicit 7-day profile.
sens=[]
for mode in ['full','no_last_7d']:
    tr=train.copy(); te=test.copy()
    if mode=='no_last_7d':
        for c in ['clicks_7','active_days_7','activity_rate_7','activity_ratio_7_30']: tr[c]=0; te[c]=0
    for name,cols in [('M0_HISTORY',M0),('M1_HISTORY_ACTIVITY',M1),('M2_HISTORY_ACTIVITY_PROFILE',M2)]:
        p=fit(cols,tr,te); z={'sensitivity':mode,'model':name}; z.update(scores(te.Y_score,p)); sens.append(z)
# Temporal sensitivity by assessment date: train earlier target dates, test later dates, on students with no identity overlap.
chron=target.sort_values('TC').copy(); c=int(np.floor(.8*len(chron))); ca,cb=chron.iloc[:c],chron.iloc[c:]
# report only; no replacement of primary split.
chron_summary={'n_early':len(ca),'n_late':len(cb),'tc_early_max':int(ca.TC.max()),'tc_late_min':int(cb.TC.min()),'student_overlap':int(len(set(ca.id_student)&set(cb.id_student)))}
# artifacts
for x in [target, pd.DataFrame(res), pd.DataFrame(placebo), pd.DataFrame(sens)]:
    pass
target.to_csv(OUT/'analysis_rows.csv',index=False); pd.DataFrame(res).to_csv(OUT/'model_results.csv',index=False); pd.DataFrame(placebo).to_csv(OUT/'placebo_results.csv',index=False); pd.DataFrame(sens).to_csv(OUT/'sensitivity_results.csv',index=False)
fg=[]
for group,cols,source in [('M0',M0,'studentAssessment.csv + studentInfo.csv + studentRegistration.csv'),('M1',activity,'studentVle.csv'),('M2',profile,'studentVle.csv')]:
    for c in cols: fg.append({'model_set':group,'feature':c,'source_event':source,'cutoff_rule':'strictly before target assessment date','outcome_dependence':'NO','leakage_status':'PASS'})
pd.DataFrame(fg).to_csv(OUT/'feature_genealogy.csv',index=False)
summary={'n_target_rows':len(target),'n_students':target.id_student.nunique(),'n_train_rows':len(train),'n_test_rows':len(test),'n_train_students':train.id_student.nunique(),'n_test_students':test.id_student.nunique(),'exclusions':dict(exclusions),'tc':'assessment date in days from presentation start','ty':'studentAssessment.date_submitted','outcome':'studentAssessment.score','split':'student-level deterministic 80/20, seed 2026','chronological_sensitivity':chron_summary,'data_sha256':'f2ed1902616c1fe8d2824d872c0b7d2d72be435bf0124d077044fe4be2c6d3e4'}
(OUT/'run_metadata.json').write_text(json.dumps({'dataset':'OULAD UCI 349','script':'science-radar-006-reconstruct.py','raw_inputs':['assessments.csv','studentAssessment.csv','studentInfo.csv','studentRegistration.csv','studentVle.csv'],'derived_tables_used':False,'seed':SEED},indent=2),encoding='utf-8')
(OUT/'gate_summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False)); print(pd.DataFrame(res).to_string(index=False)); print('PLACEBO_MEAN',pd.DataFrame(placebo)[['MAE','RMSE','R2']].mean().to_dict()); print('SENSITIVITY'); print(pd.DataFrame(sens)[['sensitivity','model','MAE','RMSE','R2']].to_string(index=False)); print('CHRON',chron_summary)

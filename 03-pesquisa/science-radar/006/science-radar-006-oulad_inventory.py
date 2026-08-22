from pathlib import Path
import pandas as pd

root=Path('/home/ubuntu/science-radar-006-oulad/raw')
for name in ['assessments.csv','studentAssessment.csv','studentInfo.csv','studentRegistration.csv','studentVle.csv','vle.csv']:
    df=pd.read_csv(root/name)
    print(name,'shape=',df.shape)
    print('columns=',list(df.columns))
    print('nulls=',df.isna().sum().to_dict())
    if name in ('assessments.csv','studentAssessment.csv','studentRegistration.csv','studentVle.csv'):
        print(df.head(3).to_string(index=False))
    print()
ass=pd.read_csv(root/'assessments.csv')
sa=pd.read_csv(root/'studentAssessment.csv')
si=pd.read_csv(root/'studentInfo.csv')
sv=pd.read_csv(root/'studentVle.csv')
print('assessment_types',ass['assessment_type'].value_counts(dropna=False).to_dict())
print('assessment_dates',ass['date'].describe().to_dict())
print('submitted_dates',sa['date_submitted'].describe().to_dict())
print('scores',sa['score'].describe().to_dict())
print('presentations',sorted(ass['code_presentation'].unique().tolist()))
print('modules',sorted(ass['code_module'].unique().tolist()))
print('student_vle_dates',sv['date'].describe().to_dict())
print('assessment_join_coverage',len(sa.merge(ass,on=['id_assessment'],how='left')),sa['id_assessment'].isin(ass['id_assessment']).mean())
print('score_unique',sa['score'].nunique(),'student_unique',sa['id_student'].nunique())
print('assessment_rows_by_presentation',ass.groupby('code_presentation').size().to_dict())

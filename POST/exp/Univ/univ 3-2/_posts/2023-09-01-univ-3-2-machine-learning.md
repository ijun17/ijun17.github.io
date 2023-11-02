---
layout: post
title: "[3학년2학기]기계학습활용"
order: 20
---

# 캐글

캐글이란 데이터 분석 & 대회 플랫폼

Caggle > Competitions > titanic으로 실습 진행

titanic 데이터셋에는 아래 세가지 파일이 있음
* gender_submission.csv - 답안지(캐글에 제출해야함)
* test.csv - 문제
* train.csv - 학습용(정답(survived)가 나와있음)

# pandas와 csv

판다스는 행렬 연산 라이브러리인 numpy 기반으로 만들어진 라이브러리

numpy는 c로 컴파일 되었기 때문에 제공하는 연산이 매우 빠름

자료구조
* `pandas.Series`: 1차원 배열
* `pandas.DataFrame`: 2차원 배열

```python
import numpy as np
import pandas as pd

df_train=pd.read_csv("/kaggle/input/titanic/train.csv")
df_test=pd.read_csv("/kaggle/input/titanic/test.csv")

# 열접근
print(df_train.Survived)
print(df_train["Survived"])
print(df_train.loc[:,["Survived","PassengerId"]])

# 행접근
print(df_train.iloc[0])
print(df_train.iloc[[0, 2]])
print(df_train.iloc[range(0,10)])

# 성별이 'female'인 경우 1인 series
survs = (df_train.Sex == 'female')*1

# 정확도 검사
(df_train.Survived == survs).sum()/len(survs) # 방법1
(df_train.Survived == survs).mean() # 방법2

```


# 타이타닉 Random Forest

랜덤 포레스트는 여러 개의 결정 트리를 생성하고, 각각의 트리가 독립적으로 학습하여 예측을 수행한 뒤, 종합하여 최종 예측을 결정

**RandomForestClassifier(n_estimators=100, max_depth=5, random_state=1)**
* `n_estimators`: 의사 결정 트리의 개수. 높을수록 과적합을 줄이고 안정적인 예측을 할 수 있으나 시간과 비용이 많이 들음
* `max_depth`: 각 의사 결정 트리의 최대 깊이. 깊을수록 복잡한 패턴을 해석할 수 있으나 과적합이 발생할 수 있음 
* `random_state`: 랜덤 시드값. 설정하면 일관된 결과를 얻을 수 있음

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

df_train=pd.read_csv("/kaggle/input/titanic/train.csv")
df_test=pd.read_csv("/kaggle/input/titanic/test.csv")

# 모델이 예측해야할 featrue
y = df_train.Survived 

# 예측에 사용되는 features
features = ["Pclass","Sex","SibSp","Parch"]

# 범주형 변수를 가변수(0,1,2...)로 바꾼다
X = pd.get_dummies(df_train[features]) 
X_test = pd.get_dummies(df_test[features])

# 랜덤 포레스트 학습
model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=1)
model.fit(X, y) 

# df_train으로 정확도를 평가한다.
train_predictions = model.predict(X) #예측한 Survived 시리즈
print("트레인 정확도",(train_predictions == y).mean())

# df_test로 제출할 답안지를 작성한다.
test_predictions = model.predict(X_test) #예측한 Survived 시리즈
output = pd.DataFrame({'PassengerId': df_test.PassengerId, 'Survived': test_predictions})
output.to_csv('titanic-autogluon.csv', index=False)
```



# 타이타닉 Autogluon

* AutoGluon은 여러 머신러닝 작업을 자동화하고 간소화하는 오픈소스 라이브러리
* 머신러닝 모델의 선택, 튜닝, 훈련, 평가 및 배포를 자동화

캐글에서 실행시 `pip install autogluon` 설치(네트워크 설정이 켜야 됨)

**Autogluon fit presets**
* `best_quality`: 가장 높은 품질이지만 속도 느림
* `high_quality_fast_inference_only_refit`: 높은 품질, 빠른 속도
* `good_quality_faster_inference`: 좋은 품질, 빠른 속도
* 등등


```python
import numpy as np
import pandas as pd
from autogluon.tabular import TabularDataset, TabularPredictor

df_train = TabularDataset('/kaggle/input/titanic/train.csv')
df_test = TabularDataset('/kaggle/input/titanic/test.csv')

# 문제를 풀어주는 거
predictr = TabularPredictor("Survived") # "Survived"열을 예측하겠다! 
predictr.fit(df_train) 

# best_quality 프리셋 적용
# predictr.fit(df_train,presets='best_quality') 

# 각 모델 별 점수, 등수, 예측 시간, 학습 시간 등을 보여줌
predictr.leaderboard()

# 트레인 데이터로 예측 점수
(df_train.Survived == predictr.predict(df_train)).mean()

# 캐글 제출 csv 만들기
test_predictions = predictr.predict(df_test) #예측한 Survived 시리즈
output = pd.DataFrame({'PassengerId': df_test.PassengerId, 'Survived': test_predictions})
output.to_csv('titanic_random_forest.csv', index=False)
```

알게된 점
* 여기서 리더보드에서 가장 높은 점수가 실제 predict를 수행했을 때의 결과와 다를 수 있다.
* 여러 feature에 선형적인 관계를 갖는 feature를 학습에 이용했을 때 점수가 떨어질 수 있다. 
* 모든 feature를 사용하기 보다 필요없는 것을 삭제하는게 효과가 좋을 수 있다.  





# sklearn.linear_model 연속형 예측1

Scikit-learn은 선형 회귀 및 다양한 머신러닝 모델을 제공

여기서는 아래 url에서 기온 데이터를 받고, 랜덤으로 오차를 두어 아이스크림 판매량을 가정하여 Scikit-learn으로 분석을 한다.

`matplotlib.pyplot`
* 그래프그리는 라이브러리
* plot()의 'o'옵션은 데이터를 원으로 표시하는것

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn.linear_model

temp = pd.read_csv('https://raw.githubusercontent.com/guebin/DV2022/master/posts/temp.csv').iloc[:,3].to_numpy()[:100]
temp.sort()

np.random.seed(43052)
eps = np.random.randn(100)*3 # 오차
icecream_sales = 20 + temp * 2.5 + eps 

X = df_train[['temp']] # 독립변수 = 설명변수 = 피쳐
y = df_train[['sales']] # 종속변수 = 반응변수 = 타겟 

plt.plot(X,y,'o')

predictr = sklearn.linear_model.LinearRegression()
predictr.fit(X,y) 
yhat = predictr.predict(X)

# 기존에는 독립변수 X로 종속변수 y를 예측하였다면
# 이번에는 y=ax+b로 두어 a와 b를 예측
a = predictr.coef_, b = predictr.intercept_

plt.plot(X,y,'o',alpha=0.5)
plt.plot(X,yhat,'--',alpha=0.5)
```

여기서 아이스크림을 초코와 바닐라로 나눈다면


```python
np.random.seed(43052)
choco = 20 + temp * 2.5 + np.random.randn(100)*3
vanilla = 40 + temp * 2.5 + np.random.randn(100)*3

plt.plot(temp,choco,'o',label='choco')
plt.plot(temp,vanilla,'o',label='vanilla')
plt.legend() # 범례를 나타냄

# 두 데이터를 합쳐서 분석한다
df1 = pd.DataFrame({'temp':temp,'sales':choco}).assign(type='choco')
df2 = pd.DataFrame({'temp':temp,'sales':vanilla}).assign(type='vanilla')
df_train = pd.concat([df1,df2])

X = df_train[['temp','type']] # 독립변수, 설명변수, 피쳐
y = df_train[['sales']] # 종속변수, 반응변수, 타겟 
X = X.assign(type = [type == 'choco' for type in X.type]) # 가변수로
# X = pd.get_dummies(X) # 원핫 인코딩
# 만약 원핫 인코딩을 한다면 오버피팅을 막기 위해 더미변수 중 하나를 제거

predictr = sklearn.linear_model.LinearRegression() 
predictr.fit(X,y)
yhat = predictr.predict(X)

# 아이스크립 종류별로 선이 잘나온것을 볼 수 있다.
plt.plot(df_train.temp,df_train.sales,'o',alpha=0.5)
plt.plot(df_train.temp,yhat, 'x',alpha=0.5)
```





# sklearn.linear_model 연속형 예측2

여기서는 보험료 정보로 학습을 할 것이다.

```python
import numpy as np
import pandas as pd 
import sklearn.linear_model


df_train = pd.read_csv('https://raw.githubusercontent.com/guebin/MP2023/main/posts/insurance.csv')
print(df_train.columns) # 나이, 성별, bmi, 아이, 담배, 지역, 보험료

X = pd.get_dummies(df_train.drop(['charges'],axis=1)) # 원핫인코딩
y = df_train[['charges']]

predictr = sklearn.linear_model.LinearRegression()
predictr.fit(X,y)
predictr.score(X,y)

# 계수들
coef = pd.DataFrame({'name':list(X.columns), 'coef':predictr.coef_.reshape(-1)})
# 상수항
inte = predictr.intercept_
```



# sklearn.linear_model 범주형 예측

가상의 토익 점수와 학점으로 취업을 했는지 예측

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn.linear_model

# 데이터- 토익, 학점, 취업
df_train = pd.read_csv('https://raw.githubusercontent.com/guebin/MP2023/main/posts/employment.csv')


X = pd.get_dummies(df_train[['toeic','gpa']])
y = df_train[['employment']]

# y범주형인 경우(중요) LogisticRegression
predictr = sklearn.linear_model.LogisticRegression()
predictr.fit(X,y)
predictr.predict(X) 
predictr.score(X,y)

# 정확도는 약 0.88
# 모델을 개선하여 정확도를 높일 수 있지만 오버피팅 발생확률 높음

# 로지스틱 회귀의 경우 함수로 확률을 계산하여 범주를 예측을 한다.
print( predictr.predict_proba(X)[:5].round(3) ) # 확률
```

# 타이타닉 LogisticRegression

LogisticRegression을 사용하여 범주형 데이터 Survived를 예측

전처리
* 결측치가 없어야함
* 결측치가 있는 feature를 제거하거나, 한 행을 제거
* Object 타입의 변수를 원-핫 인코딩하거나 버려야 한다.

```python
import numpy as np
import pandas as pd 
import sklearn.linear_model

df_train = pd.read_csv('titanic/train.csv')
df_test = pd.read_csv('titanic/test.csv')

X = pd.get_dummies(df_train.drop(['PassengerId','Survived'],axis=1))
y = df_train[['Survived']]

predictr = sklearn.linear_model.LogisticRegression()
predictr.fit(X,y)
# 문제 > X에 결측치가 있음
df_train.info() # 데이터 정보를 알 수 있음-결측치,데이터 타입 등
# Age,Cabin,Embarked에 NaN값이 있음
# Cabin에 너무 많은 결측치 > 제거
# 이름을 원핫인코딩하면 너무 많음 > 제거
# 티켓 번호도 이름과 같음 > 제거

X = pd.get_dummies(df_train[["Pclass", "Sex", "SibSp", "Parch"]])
y = df_train[["Survived"]]
predictr = sklearn.linear_model.LogisticRegression()
predictr.fit(X, y)
y_hat = predictr.predict(X)
df_train.assign(Survived_hat=y_hat).loc[:,['Survived','Survived_hat']]
predictr.score(X,y)

# 사실 Name에는 혼인 정보가 포함되어 있다.
# 범주가 너무 많은 경우 변수를 제거하기보단 공통 범주로 묶는게 좋을 수도?
# 불필요한 변수는 반드시 제거 - 오버피팅 발생
```


# 결측치 처리

## 결측치 시각화 msno

```python
df.info() #데이터 프레임으로 결측치 확인(기본적)

# msno 사용
msno.bar(df) # 막대그래프로 보여줌
msno.matrix(df) # 패턴 시각화(바코드 처럼)
msno.heatmap(df) # 
msno.dendrogram(df) 
```

## 결측치 처리 impute

`sklearn.impute.SimpleImputer(strategy=)`
* 'mean': 평균
* 'median': 중앙값
* 'most_frequency': 최빈값
* 'constant',fill_value=상수: 상수로 대체

범주형 결측치의 경우 최빈값이나 상수값만 이용 가능

```python
import sklearn.impute

imputer = sklearn.impute.SimpleImputer()
imputer.fit(df)
imputer.transform(df)
# imputer.fit_transform(df)

# 숫자는 평균값으로, 범주는 최빈값으로
_df = df.copy()
df_num = df.select_dtypes(include="number")
df_cat = df.select_dtypes(exclude="number")
_df[df_num.columns] = sklearn.impute.SimpleImputer(strategy='mean').fit_transform(df_num)
_df[df_cat.columns] = sklearn.impute.SimpleImputer(strategy='most_frequent').fit_transform(df_cat)
```


# predictor에 대해

fit을 해야 coef_, intercept_가 생기며 predict()와 score()를 할 수 있음

fit(X,y)에서
* X는 2d만 가능, y는 2d,1d 모두 가능
* 왜냐하면 데이터 1개로는 학습할 수 없고, 한개 이상의 값을 예측 할 수 있음

이 수업에서 Notations
* X: df_train_X, ndarray2d_train_X,list2d_train_X
* y: df_train_y, series_train_y, … , list_2d_train_y
* XX: df_test_X, ndarray2d_test_X,list2d_test_X
* yy: df_test_y, series_test_y, … , list_2d_test_y
* yhat: predictr.predict(X)
* yyhat: predictr.predict(XX)


# 데이터 스케일링

스케일링이란 연속형 데이터의 범위를 바꾸는 것 ex) 토익 점수를 0~1로

만약 이상치가 있다면 제거하는게 좋음

잘못된 스케일링 방법
1. 학습셋과 테스트셋의 최소,최대 범위가 다른데 다른 기준으로 스케일링
2. 학습셋과 테스트셋을 일단 합쳐서 스케일링 한다.-**정보누수**

## MinMaxScaler

* 데이터를 최소값을 0, 최댁값을 1로 하여 스케일링
* 원하는 범위 내로 데이터를 조정할 때 유용
* 그러나 이상치가 전체 데이터의 스케일링의 큰 영향을 줌 
* 0~1이나 -1~1 범위의 값을 입력으로 받는 신경망의 경우 유리 

```python
import sklearn.preprocessing 

sclr = sklearn.preprocessing.MinMaxScaler()
sclr.fit_transform(df) # 2차원 자료구조를 받음, 0~1사이 값으로 변환
# sclr.fit(df) # 아마 Min, Max값 정하는 듯
# sclr.transform(df)

# 아래도 같으나 1차원도 가능
# 그러나 학습 데이터와 테스트 데이터의 스케일링이 다를수도?
# 왜냐하면 최소,최대값이 학습셋과 테스트셋이 다를 수 있음
# 그렇게 되면 0~1을 벗어난 값이 나옴 - 이게 
sklearn.preprocessing.minmax_scale(df)

# 원래값으로 복원
sclr.inverse_transform(df)
```

## StandardScaler

* 데이터의 평균을 0, 표준편차를 1로 만드는 방식
* 이상치에 덜민감
* 그러나 표준화된 데이터 값이 특정 범위내에 있음을 보장 안함
* 이상치가 많을 경우 유리

```python
import sklearn.preprocessing 

sclr2 = sklearn.preprocessing.StandardScaler()
sclr2.fit_transform(df)
```



# 오버피팅

`오버피팅`
* 학습 데이터에 과도하게 맞추어저 실제 데이터는 잘 예측을 못하는 경우
* 쓸모없거나 대체가능한 값 제거을 제거하여 방지

`다중공선성`
* 독립변수가 다른 독립변수의 조합으로 표현될 수 있는 경우

## Ridge로 다중공선성 상쇄

* 비슷한 변수의 계수가 거의 동일하게 나누어지는 효과
* 원리: 제곱한뒤 합친값이 0에서 떨어져 있을 수록 패널티
* 원래 변수 1개의 계수가 a이고, 비슷한 변수가 99개 있다면 계수는 a/100 
* 그러나 비슷한 변수를 모두 없애는 것보단 효과가 떨어짐
* Ridge의 alpha값이 커지면 계수들이 점점 비슷해지나 총합이 원본보다 조금 작아짐

```python
import sklearn.linear_model

df_train, df_test = sklearn.model_selection.train_test_split(df,test_size=0.3,random_state=42)
X = df_train.loc[:,'gpa':'toeic499']
y = df_train.loc[:,'employment_score']
XX = df_test.loc[:,'gpa':'toeic499']
yy = df_test.loc[:,'employment_score']

# Ridge 사용
predictr = sklearn.linear_model.Ridge(alpha=5e8)
predictr.fit(X,y)

# RidgeCV 사용 - 알파값 선택해줌
predictr2 = sklearn.linear_model.RidgeCV(alphas=[5e2, 5e3, 5e4, 5e5, 5e6, 5e7, 5e8])
predictr2.fit(X,y)
print(predictr.alpha_) #5e7
```

# Lasso로 다중공선성 상쇄

* 적은 변수만을 살리고 나머지는 제거(계수를 0으로 만듦)
* 원리: 절대값을 구하고 합친 값이 0에서 떨어져 있을 수록 패널티

```python
# 같은 데이터 섹 사용
predictr = sklearn.linear_model.Lasso(alpha=1)
predictr.fit(X,y)
# 결과는 Ridge의 alpha가 5e7이였을 때와 비슷함

predictr2 = sklearn.linear_model.LassoCV(alphas= np.linspace(0,2,100))
predictr2.fit(X,y)
```


# 이상치 처리

1. 이상치 제거
2. sklearn.linear_model.HuberRegressor 사용
3. sklearn.preprocessing.PowerTransformer로 이상치 완화

# 교호작용

만약 이전에 했던 아이스크림 판매량 분석에서 초코, 바닐라에 따라 기울기가 다르다면 온도와 아이스크림 타입만으로는 언더피팅이 이루어진다.

이때 온도*타입으로 새로운 feature을 만들면 이것이 해결된다.
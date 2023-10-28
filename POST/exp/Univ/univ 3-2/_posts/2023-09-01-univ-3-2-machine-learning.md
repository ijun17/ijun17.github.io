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


# Random Forest

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



# Autogluon

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





# Scikit-learn

선형 회귀 및 다양한 머신러닝 모델을 제공

여기서는 아래 url에서 기온 데이터를 받고, 랜덤으로 오차를 두어 아이스크림 판매량을 가정하여 분석을 한다.

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

X = df_train[['temp']] # 독립변수, 설명변수, 피쳐
y = df_train[['sales']] # 종속변수, 반응변수, 타겟 

plt.plot(X,y,'o')

predictr = sklearn.linear_model.LinearRegression()
predictr.fit(X,y) 

```


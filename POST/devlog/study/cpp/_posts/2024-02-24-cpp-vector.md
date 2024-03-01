---
layout: post
title: "[c++]vector"
order: 6
---

# vector

벡터는 가변길이 배열이다.

```cpp
#include <vector>

std::vector<int> v;//{}
std::vector<int> v2(3,4); //{4,4,4}
```

# 유용한 함수

|함수|설명|
|:---:|:---:|
|size()|벡터의 사이즈|
|push_back(원소)|뒤에 원소를 추가|
|pop_back(원소)|뒤에 원소를 하나 제거|
|insert(인덱스,원소)|삽입|

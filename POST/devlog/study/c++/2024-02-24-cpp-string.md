---
layout: post
title: "[c++]string"
order: 4
---

# c++ string

c++에서 등장한 string은 문자열을 쉽게 처리할 수 있다. char 배열과의 차이는 길이가 동적이라는 것이다. +나 +=연산자로 길이를 증가시킬 수 있다.

# 기본 연산자

|연산자|설명|
|:---:|:---:|
|+|두 문자열을 합친 문자열 반환|
|+=|문자열을 뒤에 합침|
|==|같으면 true|
|<,>,<=,>=|사전 순으로 뒤에 위치한게 큼|

# 유용한 함수

|함수|설명|
|:---:|:---:|
|`length()`, `size()`|길이|
|`find(문자열)`|검색해서 인덱스 반환|
|`substr(시작인덱스,개수)`|자른 문자열 반환|
|`insert(인덱스,문자열)`|삽입(기존값 변형)|
|`replace(시작인덱스,개수,문자열)`|대체(기존값 변형)|
|`erase(시작인덱스,개수)`|지우기(기존값 변형)|

# 형변환

## string에서 int로
```cpp
#include <string>

std::string = "123";
int num = std::stoi(string);
//만약 숫자가 아니면 0을 반환한다.
```

## int에서 string으로
```cpp
#include <string>

std::string = std::to_string(123);
```

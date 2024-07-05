---
layout: post
title: "[C++]string"
order: 4
---

# c++ string

c++에서 등장한 string은 문자열을 쉽게 처리할 수 있다. char 배열과의 차이는 길이가 동적이라는 것이다. string은 라이브러리를 추가하지 않고 그냥 사용할 수 있다. 다만 string 라이브러리를 추가해 유용한 함수를 사용할 수 있다.

```cpp
std::string s="123";
std::string s2(100, 'a'); //a가 100개
```

# 기본 연산자

|연산자|설명|
|:---:|:---:|
|+|두 문자열을 합친 문자열 반환|
|+=|문자열을 뒤에 합침|
|==|같으면 true|
|<,>,<=,>=|사전 순으로 뒤에 위치한게 큼|

# 유용한 함수

string 라이브러리를 추가해 아래 함수를 사용할 수 있다. 

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

//만약 숫자가 아니면 0을 반환한다.
int num = std::stoi("123");
//그외: std::stoi, std::stol, std::stoll, std::stoul, std::stoull, std::stof, std::stod, std::stold
```

## int에서 string으로
```cpp
#include <string>

std::string = std::to_string(123);
```

---
layout: post
title: "코딩 테스트 공부(바킹독 강의)"
order: 30
---

# 오리엔테이션

[바킹독 실전 알고리즘](https://www.youtube.com/watch?v=LcOIobH7ues&list=PLtqbFd2VIQv4O6D6l9HcD732hdrnYb6CY&index=1)으로 공부한 내용을 정리함

코딩테스트는 성능도 좋고, 쓸만한 라이브러리도 많은 c++로 진행

* `gcc` : c/c++ 컴파일러 중 하나
* `bits/stdc++.h` : **gcc에서만 사용가능한** iostream, string, map, set, stach, vector, functional, algorithm 등을 포함하는 라이브러리
* `STL(Standard Template Library)`은 C++ 표준 라이브러리의 일부로서, 컨테이너, 반복자, 알고리즘 등과 같은 일반적인 데이터 구조와 알고리즘을 제공하는 템플릿 기반 라이브러리
    * **컨테이너(Container)** : 데이터를 저장하고 관리하는 클래스. e.g. 벡터(vector), 리스트(list), 맵(map) 등.
    * **반복자(Iterator)** : 컨테이너의 원소를 순회하는 데 사용되는 클래스
    * **알고리즘(Algorithm)** : 컨테이너에서 데이터를 처리하는 함수. e.g. 정렬(sort), 검색(find), 병합(merge) 등.

# 기초코드 작성 요령

## 1. 시간 복잡도, 공간 복잡도

|연산 횟수(N)|허용 시간 복잡도|
|:---:|:---:|
|N<12|O(N!)|
|N<26|O(2^N)|
|N<100|O(N^4)|
|N<500|O(N^3)|
|N<3000|O(N^2 * logN)|
|N<5000|O(N^2)|
|N<1000,000|O(NlogN)|
|N<10,000,000|O(N)|

공간복잡도는 시간 복잡도에 비해 중요성은 낮다. 다만 512MB는 1.2억개의 int(4B)를 저장할 수 있다는 것을 기억.

## 2. 자료형 

|크기|자료형|
|:---:|:---:|
|1Byte|`byte`|
|2Byte|`short`|
|4Byte|`int`, `char`, `float`|
|8Byte|`long long`, `double`|

주의할점
* integer overflow : 변수의 한계값 주의
* 실수는 왠만하면 double로(float는 정밀도가 작다)
* 실수 비교는 if(abs(a-b)<1e-12)

## 3. STL과 함수 인자

* 깊은 복사 : 등호 연산을 했을때 내부의 모든 값이 복사됨. 일반 변수, 클래스, 구조체, **STL 컨테이너** 등
* 얕은 복사 : 주소 값이 복사됨. 포인터, 참조자, 배열

함수의 매개변수로 **STL 컨테이너**를 보내면 **깊은 복사**를 하기 때문에 `포인터(*)`나 `참조자(&)`를 사용해야함

## 표준 입출력

아래 코드 입력 후 c++의 입출력(cin,cout)만 사용해야함
```cpp
ios::sync_with_stdio(0) //c stream, c++ stream 분리
cin.tie(0) //cin전에 버퍼를 비우지 않게
```
공란
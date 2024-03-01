---
layout: post
title: "[c++]큐 & 스택"
order: 6
---


# stack

스택은 stack 라이브러리에 들어있다.

|함수|설명|
|empty()|비어있는지|
|size()|크기|
|push(원소)|추가|
|pop()|가장 위 원소 제거(반환안함)|
|**top()**|가장 위 원소 반환|
|emplace(매개변수)|원소를 생성과 동시에 삽입|

# queue

큐는 queue 라이브러이에 들어있다. 스택과 다르게 최상위 원소를 front()로 불러온다.

|함수|설명|
|empty()|비어있는지|
|size()|크기|
|push(원소)|추가|
|pop()|가장 위 원소 제거(반환안함)|
|**front()**|가장 위 원소 반환|
|emplace(매개변수)|원소를 생성과 동시에 삽입|

# priority_queue

스택과 큐는 원소가 들어온 순서에 따라 우선순위를 가진다. 반면에 우선순위 큐는 원소의 값에 따라 우선순위를 가진다. 기본적으로 값이 큰 값 먼저 나간다. 우선순위 큐는 스택처럼 최상위 원소를 반환하는 함수가 **top()**이다.

```cpp
#include <queue>

//기본적으로 내림차순(큰값이 먼저 나감)
std::priority_queue<int> pq; 

//오름차순
std::priority_queue<int, vector<int>, greater<int>> q;

// 사용자 정의2
struct Compare {
    bool operator()(const int& a, const int& b) {
        return a > b; // 작은 값이 더 높은 우선순위를 갖도록 함
    }
};
std::priority_queue<int, std::vector<int>, Compare> pq2;
```
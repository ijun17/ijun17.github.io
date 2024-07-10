---
layout: post
title: "[JS]배열"
order: 2
---



# 배열 선언

```js
//기본 배열 선언
let arr1 = []

//배열 길이를 지정
let arr = new Array(5)

//배열의 길이를 지정하고 초기화
let arr = new Array(5).fill(0)
```

# 2차원 배열 선언

```js
//[[],[],[],[],[]]
//가운데 fill이 꼭 들어가야함
let arr21 = Array(5).fill().map(() => []);

//[[0,0],[0,0],[0,0]]
//가운데 fill이 꼭 들어가야함
let arr22 = Array(3).fill().map(() => Array(2).fill(0));
```

# Array.sort 정렬

Array.sort 함수는 원소들을 **문자열로 변환**시킨 뒤 비교한다. 따라서 숫자를 정렬시키기 위해서는 compare 함수를 사용해야한다. sort 함수는 배열의 **원본을 변경**시킨다. 만약 배열에 **정수와 문자열이 혼합되어** 들어있다면 예상치 못하게 정렬된다.

```js
//오름차순 정렬
[0,1,2,3,4].sort((a,b)=>a-b);

//내림차순 정렬
[0,1,2,3,4].sort((a,b)=>b-a);

//우선 순위: 숫자>영어 대문자>영어 소문자>한글
["다","나","가","A","a","1"].sort() //['1', 'A', 'a', '가', '나', '다']

//사전 역순
//(a,b)=>b.localeCompare(a,'de')랑 같음
//new Intl.Collator('de').compare이거도 사용가능
["다","나","가","A","a","1"].sort((a,b)=>{
    if(a>b)return -1;
    if(a<b)return 1;
    return 0;
})

//복잡한 비교 연산: 아래는 오름차순
[1,2,3,4].sort((a,b)=>{
    if(a>b)return 1;
    if(a<b)return -1;
    return 0;
})
```

# Array.map 새로운 형식의 배열

```js
let arr = [0,1,2,3]
arr.map(n=>n*n);
//[0,1,4,9]
//원본 변경 안함
```

# String.split 문자열 분리

```js
let text = "hello world";
text.split(' ');
//["hello", "world"]
//원본 변경 안함
```

# Array.slice 배열 분리

```js
let arr = [0,1,2,3,4];
arr.slice(1,3);
//[1,2]
//원본 변경 안함
```

# Array.reduce 배열의 합

```js
let arr = [0,1,2,3,4];
arr.reduce((acc,cur)=>acc+cur,0);
//10
```

# 배열 탐색, 검색

* indexOf(value): value가 있는 인덱스 반환. 없으면 -1
* find(f): 조건을 만족하는 요소 반환. 없으면 undefined
* findIndex(f): 조건을 만족하는 요소의 인덱스 반환. 없으면 -1
* filter(f): 조건에 만족하는 요소들을 배열로 반환
* includes(value): value를 포함하는지

```js
let arr = ['a','b','c']
arr.indexOf('b') //1
arr.find(e=>e=='b') //'b'
arr.findIndex(e=>e=='b') //1
arr.filter(e=>e=='b') //['b']
```

# Array.join 문자열 배열 합치기

```js
["hello", "world"].join(' ') //"hello world"
```
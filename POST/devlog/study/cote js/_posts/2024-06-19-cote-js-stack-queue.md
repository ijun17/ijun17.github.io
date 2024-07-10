---
layout: post
title: "[JS]스택과 큐"
order: 1
---

자바스크립트는 스택과 큐 자료구조를 제공하지 않기 때문에 직접 만들어야 한다. 연결 리스트로의 구현은 복잡하기 때문에 Array를 사용한다.

# 스택

스택은 Array의 push와 pop으로 사용할 수 있다.

```js
let stack = [];
stack.push(1); //1삽입;
stcak.pop(); //마지막 원소 삭제 및 반환
```

# 큐

삽입, 삭제를 O(1)로 만들기 위해선 몇가지 트릭이 필요하다.

```js
class Queue{
    constructor(){
        this.input = null;
        this.output = null;
        this.count=0;
    }


    push(data) {
        let node = { next: null, data: data };
        if (this.input) this.input.next = node;
        this.input = node;
        if (this.output === null) this.output = node;
        this.count++;
    }

    pop() {
        if (this.count === 0) return null;
        let data = this.output.data;
        this.output = this.output.next;
        if (this.output === null) this.input = null;
        this.count--;
        return data;
    }
}
```

# 우선 순위 큐

```js
class PriorityQueue{
    constructor(compare=()=>{return false;}){
        this.output = null;
        this.count=0;
        this.compare = compare
    }


    push(data) {
        let node = { next: null, data: data };
        let prev = this.output;
        while(prev.next && this.compare(prev.data, data))prev = prex.next;
        if(prev.next) node.next = prev.next;
        prev.next = node;
        this.count++;
    }

    pop() {
        if (this.count === 0) return null;
        let data = this.output.data;
        this.output = this.output.next;
        this.count--;
        return data;
    }
}
```
---
layout: post
title: "내비게이션바 현재 링크 하이라이트하기(CSSStyleSheet)"
order: 3
---
# 현재 링크 하이라이트

현재 어떤 페이지에 있는지 알려주기 위해 내비게이션 링크를 하이라이트하는 법을 다뤄보겠다. 여기서 js만으로 이 기능을 구현하려면 조금 복잡하다. 링크가 바뀔때마다 내비게이션바안에서 링크를 탐색하고, 이전 링크를 원래대로 바꾸고, 현재 링크를 하이라이트 해야한다. 

# CSSStyleSheet

나는 이 문제를 `CSSStyleSheet`을 통해 간단하게 해결했다. CSSStyleSheet이란 쉽게 말해 css파일을 수정할 수 있게하는 자바스크립트 인터페이스이다. css 파일을 만들고 이 안에 링크를 하이라이트하는 규칙을 넣으면 내비게이션안에서 링크를 탐색하고, 이전 링크를 원래대로 바꾸는 작업을 할 필요가 없다. 이는 css가 알아서 해준다. 우리는 링크가 바뀔때마다 css파일만 조금 바꾸면 되는 것이다.

아래에 `CSS` 객체는 CSSStyleSheet을 더욱 편리하게 쓰기 위한 것이다.

```js
let CSS={
    sheet:null, //css 파일의 style sheet
    rules:[], //css rule을 만들기 위한 함수 배열
    addRule:function(f,state){ //f:css룰 문자열을 반환하는 함수, state:f의 매개변수
        CSS.sheet.insertRule(f(state),CSS.rules.length);
        CSS.rules.push(f);
        return CSS.rules.length-1; //return id
    },
    setState:function(id,state){ //id:룰에 할당된 정수 식별자, state:룰 함수의 매개변수 
        if(CSS.rules.length>id){
            CSS.sheet.insertRule(CSS.rules[id](state),id);
            CSS.sheet.deleteRule(id+1);
        }
    },
    init:function(){
        CSS.sheet = document.head.appendChild(document.createElement('style')).sheet;
    }
}

CSS.init();
```

아래는 CSS 객체를 이용해 현재 링크를 하이라이트하는 코드이다. (실제 코드와는 다르다)

```js
//룰 생성 : 현재 링크 파란색으로
let ruleF=(s)=>{return `.navbar-file[data-url="${s}"]{font-weight: bold;color:cornflowerblue;}`}
let cssRuleid1=CSS.addRule(ruleF, document.location.pathname)

//popstate 이벤트 시 룰 변경
let popstateHandler=function(){CSS.setState(cssRuleid1,document.location.pathname)}) 
window.addEventListener("popstate",popstateHandler) 
```
이처럼 CSSStyleSheet는 html의 radio 버튼처럼 **여러개 중에 단 하나만 선택하는** 문제에 적합한 해결책이 될 수 있다. 추가로 이 기능으로 내비게이션바의 `최상위 카테고리 탭-하단 카테고리 트리` 구조의 탭 전환을 구현하는데 이용했다.
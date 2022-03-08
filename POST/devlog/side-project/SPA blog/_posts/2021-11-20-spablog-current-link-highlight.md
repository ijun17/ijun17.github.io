---
layout: post
title: "네비게이션바 현재 링크 하이라이트하기(CSSStyleSheet)"
order: 3
---
# 현재 링크 하이라이트

네비게이션바에서 현재 어떤 페이지에 있는지 사용자에게 알려주기 위해 현재 링크를 하이라이트하는 법을 다뤄보겠다. 여기서 js만으로 이 기능을 구현하려면 조금 복잡하다. 링크가 바뀔때마다 네비게이션바안에서 링크를 탐색하고, 이전 링크를 원래대로 바꾸고, 현재 링크를 하이라이트 해야한다. 

# CSSStyleSheet

나는 이 문제를 `CSSStyleSheet`을 통해 간단하게 해결했다. CSSStyleSheet이란 쉽게 말해 css파일을 다루는 자바스크립트 인터페이스이다. css 파일을 만들고 이 안에 링크를 하이라이트하는 규칙을 넣으면 네비게이션안에서 링크를 탐색하고, 이전 링크를 원래대로 바꾸는 작업을 할 필요가 없다. 이는 css가 알아서 해준다. 우리는 링크가 바뀔때마다 css파일만 조금 바꾸면 되는것이다.

아래에 `CSS` 객체는 CSSStyleSheet을 더욱 편리하게 쓰기 위해 캡슐화한 것이다.

```js
let CSS={
    sheet:null, //css 파일의 style sheet
    rules:[], //css rule을 만들기 위한 함수 배열
    setState:function(id,state){
        if(CSS.rules.length>id){
            CSS.sheet.insertRule(CSS.rules[id](state),id);
            CSS.sheet.deleteRule(id+1);
        }
    },
    addRule:function(f,state){
        CSS.sheet.insertRule(f(state),CSS.rules.length);
        CSS.rules.push(f);
        return CSS.rules.length-1; //return id
    },
    init:function(){
        CSS.sheet = document.head.appendChild(document.createElement('style')).sheet;
    }
}

CSS.init();
```

아래는 CSS 객체를 이용해 현재 링크를 하이라이트하는 코드이다. 

```js
let cssRuleid1=CSS.addRule((s)=>{
    return `.navbar-file[data-url="${s}"]{font-weight: bold;color:cornflowerblue;}`
    }, document.location.pathname);

window.addEventListener("popstate",function () {
    CSS.setState(cssRuleid1,document.location.pathname);}) 
```
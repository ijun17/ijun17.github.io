---
layout: post
title: "[Web]위치를 정의하는법"
order: 1
---

HTML, CSS, JS에서는 다양한 방법으로 위치를 정의하고 있다.

# 마우스 이벤트

자바스크립트에서 **마우스 이벤트**가 발생했을 때 생성된 이벤트 객체에는 속성들이 존재한다. 이들은 모두 좌표이지만 원점을 정하는 기준이 다르다. 모두 원점으로부터 오른쪽 아래로 갈 수록 양으로 증가한다.

- `offsetX`, `offsetY` : 원점은 특정 엘레멘트의 좌상단
- `clientX`, `clientY` : 원점은 스크롤을 무시한 페이지의 좌상단
- `pageX`, `pageY` : 원점은 웹페이지의 좌상단
- `screenX`, `screenY` : 원점은 모니터 화면의 좌상단

**마우스 이벤트들** : click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, contextmenu, wheel

```js
//직접 확인해보자
const events = `click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, contextmenu, wheel`;
events.split(', ').forEach(e=>{
    document.addEventListener(e, event=>{
        console.log(e, event.offsetX, event.clientX, event.pageX, event.screenX)
    },{once:true})
})
```

# 터치 이벤트

**터치 이벤트**에서도 이벤트에 좌표가 생성된다. 마우스 이벤트와 다르게, 터치 이벤트는 여러 곳에서 터치가 발생할 수 있다. 터치 이벤트 객체는 아래 세가지의 **TouchList**를 가지고 있으며, TouchList는  **Touch** 객체들을 포함한다.

- `touches` : 화면에서 활성화된 TouchList
- `targetTouches` : 엘레멘트에서 활성화된 TouchList
- `changedTouches` : 최근에 변경된 TouchList

Touch 객체는 아래와 같은 속성을 같는다. 마우스 이벤트와는 달리 offsetX가 없고 radiusX가 존재한다.

- `radiusX`, `radiusY` : 접촉 영역을 가장 밀접하게 둘러싸는 타원의 반경
- `clientX`, `clientY` : 원점은 스크롤을 무시한 페이지의 좌상단
- `pageX`, `pageY` : 원점은 웹페이지의 좌상단
- `screenX`, `screenY` : 원점은 모니터 화면의 좌상단

```js
// 직접 확인해보자
// 브라우저 콘솔에 입력하고 디바이스를 모바일로 설정한다.
const events = `touchstart, touchend, touchmove`;
events.split(', ').forEach(e=>{
    document.addEventListener(e, event=>{
        console.log(e, event.touches, event.targetTouches, event.changedTouches)
    },{once:true})
})
```


# getBoundingClientRect

`Element.getBoundingClientRect()`는 엘레멘트의 위치와 사이즈를 반환한다. 

- `top` = `y` : 엘레멘트의 상단 좌표
- `left` = `x` : 엘레멘트의 좌측 좌표
- `bottom` : 엘레멘트의 하단 좌표
- `right` : 엘레멘트의 우측 좌표
- `width` : 엘레멘트의 너비
- `height` : 엘레멘트의 높이

<img src="https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect/element-box-diagram.png" width="50%">


# CSS position

css에는 top, left, right, bottom이라는 프로퍼티가 존재한다. 각각은 엘레멘트가 기준 점으로 부터 **어디서부터** **얼마나** 떨어져 있나를 정의한다. 

- `top` : **상단**으로부터 얼마나 떨어져 있는가
- `left` : **좌측**으로부터 얼마나 떨어져 있는가
- `bottom` : **하단**으로부터 얼마나 떨어져 있는가
- `right` : **우측**으로부터 얼마나 떨어져 있는가

여기서 **"어디서부터"**의 기준점은 **position** 프로퍼티로 정의된다. 

- `static` : top, left, right, bottom에 영향을 받지 않는다.
- `absolute` : body의 뷰포트를 기준으로 위치한다. 단, position이 relative, absolute, fixed, sticky인 조상이 있는 경우 그것을 기준으로 위치한다.
- `fixed` : 뷰포트를 기준으로 위치하며, 스크롤에 영향을 받지 않는다.
- `relative` : 원점은 엘레멘트가 static일 때를 기준으로 위치한다.
- `sticky` : 평소에는 스크롤에 따라 relative처럼 위치하다가, 특정 위치가 되면 fixed로 위치한다.
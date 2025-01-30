---
layout: post
title: "[LSA]리팩토링(컴포넌트)"
order: 3
---

LSA의 웹 프론트를 바닐라 자바스크립트로 개발하고 있었는데, 점점 개발하다보니 하나의 페이지에 대한 자바스크립트 코드가 비대해졌다. 평소 리액트 문법과 편리성에 관심이 많아 페이지에서 자주 쓰이는 것들을 컴포넌트로 분리해야 겠다고 결정했다. 따라서 현재 만든 컴포넌트는 아래와 같고 점점 더 많은 컴포넌트를 만들고 있다.

- modalComponent
- topbarComponent
- dropdownComponent
- manageLabComponent

# 컴포넌트 형식

컴포넌트는 리액트의 함수형 컴포넌트에 영감을 받아서 만들었다. 차이점은 컴포넌트를 외부에서 제어하기 위해 제어 함수를 같이 반환한다는 것이다. 예를 들어 다음과 같이 만들었다.

```js
function sampleComponent(name) {
  const div = document.createElement("div");
  div.className = "sample-component";
  div.innerHTML = `${name}`;
  let setName = (name) => {
    div.innerText = name;
  };
  return [div, setName];
}
```

# 모달 컴포넌트

모달창은 LSA 웹에서 가장 빈번하게 사용되는 컴포넌트이다. 모달창은 하나만 만들고 계속 재사용할 수 있다. 이 컴포넌트의 제어 함수는 다음과 같다.

- openModal(내용, 버튼 이름 리스트, 버튼 핸들러 리스트): 모달창을 보여줌
- closeModal(): 모달창을 닫음

```js
const modalComponent = () => {
  const div = document.createElement("div");
  div.className = "modal-component display-none";
  div.innerHTML = `
        <div class="overlay"></div>
        <div class="modal-body">
            <div class="modal-content"></div>
            <div class="button-list"></div>
        </div>    
        `;
  const modalContent = div.querySelector(".modal-content");
  const buttonList = div.querySelector(".button-list");

  const closeModal = () => {
    div.classList.add("display-none");
  };

  //모달의 내용과 버튼들을 생성하고 화면에 보인다.
  const openModal = (content, buttonNames = [], handlers = []) => {
    div.classList.remove("display-none");
    modalContent.innerHTML = content;
    buttonList.innerHTML = "";
    if (buttonNames.length != handlers.length)
      console.error(
        "modal-component: different length of buttonNames and handlers"
      );
    for (let i = 0; i < buttonNames.length; i++) {
      //각 버튼에 핸들러를 등록한다.
      const button = document.createElement("button");
      button.innerText = buttonNames[i];
      button.addEventListener("click", handlers[i]);
      buttonList.appendChild(button);
    }
  };

  return [div, openModal, closeModal];
};
```

이 모달 컴포넌트를 사용하는 방법은 다음과 같다.

```js
const modalComponentWrapper = document.querySelector(
  ".modal-component-wrapper"
);
const [modal, openModal, closeModal] = modalComponent();
modalComponentWrapper.appendChild(modal);

openModal(
  `<h1>오류</h1>
    <p>연구실에 소속되어 있지 않습니다.</p>
    <p><span class="main-color">연구실 소속</span>을 등록하고,<br> 다시 시도해주세요.</p>`,
  ["확인", "등록하기"],
  [
    () => {
      closeModal();
    },
    () => {
      closeModal();
      showLabBottomSheet();
    },
  ]
);
```

# 결과

## 응집도 향상

기존에는 컴포넌트에 대한 코드들이 페이지 코드 전역에 흩뿌려져 있었다면, 지금은 컴포넌트 별로 캡슐화되어 관리된다. 이로 인해 응집도가 향상되었고, 페이지 코드에 정의된 변수와 함수가 많이 줄게 되었다. 또한 컴포넌트가 REST API를 사용해 자신의 정보를 직접 받아올 수 있도록 하여 외부에서 따로 정보를 입력해야 하는 귀찮은 점을 줄였다.

## 함수형 컴포넌트

리액트의 함수형 컴포넌트에 영감을 받아 이렇게 만들었지만, 다른 점이 몇가지 있다. HTML element와 그것의 제어함수를 함께 반환한다는 것. 컴포넌트를 사용하는 개발자는 그 컴포넌트가 무슨 함수를 반환하는지 알아야 한다는 단점이 있다. 만약 컴포넌트를 클래스로 만들었어도 같은 상황일 것이지만, 함수형의 장점은 제어 함수의 이름 변경으로부터 안전하다는 것이다. 클래스형 컴포넌트의 제어 함수 이름을 변경하면 그 컴포넌트를 사용하는 코드에서도 함수 이름을 수정해야한다. 반면에 함수형으로 만들면 함수의 이름이 바뀌어도 함수의 반환 위치가 바뀌지 않는 한 변경으로부터 안전하다.

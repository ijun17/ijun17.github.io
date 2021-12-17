---
layout: post
title: "jekyll로 SPA 블로그 만들기"
order: 0
---
# 블로그 소개
내가 개발을 하면서 있었던 일들을 기록하고 싶어서 이 블로그를 만들었다. 호스팅 장소는 github page로 정했다. 포스트의 빠른 로딩과 다른 페이지로 이동시 네비게이션바 새로고침을 막기위해 SPA(Single Page Application)로 개발을 하였으며, SPA의 단점을 보완하기 위해 jekyll을 이용했다. jekyll은 github page를 지원하는 정적사이트 생성기이다. 내가 원하는 블로그의 요구사항은 다음과 같다.
* 빠른 속도와 네비게이션바 새로고침을 막기위해 SPA로 개발
* 포스트를 마크다운 파일로 작성
* 네비게이션바만으로 원하는 모든 포스트에 접근할 수 있다

# SPA
`SPA(Single Page Application)`란 하나의 페이지에서 다른 페이지로 이동하지 않고 필요한 정보만 동적으로 가져오는 웹이다. 포스트 내용만 새로 로딩하기 때문에 네비게이션바가 새로고침되지 않고 속도도 빠르다. 

SPA를 구현하기 위해서는 자바스크립트가 필요하다. SPA를 쉽게 구현하기 위한 다양한 프레임워크가 있지만, 나는 그렇게 복잡한 기능을 구현하는것은 아니기 때문에 바닐라 자바스크립트로 SPA를 구현했다. 다음은 dynamic.js의 코드이다.

```js
const html_post=document.querySelector(".post");

let Dynamic = {
    xmlHttp: new XMLHttpRequest(),
    init: function () {
        this.xmlHttp.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == this.DONE) Dynamic.setPost(this.responseText);
        }
        //특정 클래스를 포함한 엘레멘트를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("dynamic-link")) {
                Dynamic.loadPost(event.target.dataset.url, true);
            }
        })
        //페이지 이전 혹은 이후로 갈때 loadPost 메소드 실행
        window.addEventListener("popstate",function(){Dynamic.loadPost(document.location, false);})
    },
    //포스트를 서버에 요청
    loadPost: function (url, historyPush = true) {
        if (url === document.location.pathname) return;
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
        if (historyPush) history.pushState(null, null, url);
    },
    //포스트 로드가 완료되면 실행되는 함수
    setPost: function (text) { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_post.innerHTML = p1; })
    }
}

Dynamic.init();
``` 

# SPA의 단점
하지만 SPA는 `SEO(검색엔진최적화)`가 어렵다는 단점이 있다. SEO란 구글, 네이버 등의 브라우저에서 웹사이트가 검색이 잘되게 하는 것이다. 브라우저의 검색엔진은 웹사이트를 평가하기 위해 방문하는데, 문제는 구글을 제외한 대부분의 검색엔진이 자바스크립트를 실행시키지 않는다는 것이다. 때문에 검색엔진은 완성되지 않은 html 파일을 받고 웹사이트는 낮은 평가 점수를 받게되어 검색이 잘되지 않는다.

위와 같은 SPA의 문제는 `SSG(정적 사이트 생성기)` 또는 `SSR(서버 측 렌더링)`로 해결할 수 있다. 둘의 공통점은 서버에서 html 파일을 완성하여 클라이언트에게 보낸다는 것이다. 이후에는 SPA의 특성대로 서버와 통신하며 정보를 받아온다. SSR과 SSG의 차이점은 html파일을 만드는 시점이다. SSR은 사용자가 방문하는 시점에 html 파일을 만들고, SSG는 사용자가 방문하기 전에 모든 html 파일들을 미리 만들어 놓는다.

# jekyll
`jekyll`은 대표적인 정적 사이트 생성기이다. jekyll은 SPA의 단점을 상쇄하는것 뿐만 아니라 많은 것을 할 수 있다. 다음은 jekyll에서 지원하는 기능이다.

* 포스트를 마크다운 언어로 작성가능
* 포스트를 카테고리, 날짜 등 다양한 기준으로 분류 가능
* html파일에서 변수, 반복문 등 리퀴드 언어 사용 가능

jekyll을 설치하는 방법과 문법, jekyll에서 사용되는 liquid 언어는 공식 사이트에 잘 나와있다.
* [jekyll 설치 및 문법](https://jekyllrb-ko.github.io/docs/)
* [jekyll 새로운 테마 만들기](https://jekyllrb.com/docs/themes/#creating-a-gem-based-theme)
* [liquid 문법](https://shopify.github.io/liquid/)
---
layout: post
title: "바닐라 js로 SPA 블로그 만들기(feat. jekyll)"
order: 0
---
# SPA란
`SPA(Single Page Application)`란 하나의 페이지에서 다른 페이지로 이동하지 않고 필요한 정보만 동적으로 가져오는 웹이다. 포스트 내용만 새로 렌더링하기 때문에 속도가 빠르다. 

SPA를 구현하기 위해서는 자바스크립트가 필요하다. SPA를 쉽게 구현하기 위한 다양한 프레임워크가 있지만, 나는 그렇게 복잡한 기능을 구현하는것은 아니기 때문에 바닐라 자바스크립트로 SPA를 구현했다. 바닐라 자바스크립에는 SPA를 만들 수 있는 `fetch` API가 있다. fetch는 loadPost 메소드에서 사용되었다.

```js
const html_post=document.querySelector(".post");

let Post = {
    linkClassName:"post-link",
    init:function(){
        //포스트 링크를 클릭시 loadPost 메소드 실행
        document.addEventListener("click", function(event){if (event.target.classList.contains(this.linkClassName)) this.loadPost(event.target.dataset.url, true);}.bind(this));
        //페이지 이전, 이후로 갈때 loadPost 메소드 실행
        window.addEventListener("popstate",function(){this.loadPost(document.location, false);}.bind(this))
    },
    loadPost: function (url, historyPush=true) {
        if (url === document.location.pathname) return;
        //fetch로 url의 텍스트 파일 받아오기
        fetch(url).then((response)=>response.text()).then(this.renderPost);
        if (historyPush) history.pushState(null, null, url);
    },
    renderPost: function (text="") { 
        text.replace(/<!--post start-->(.*)<!--post end-->/s, function (match, p1) { html_post.innerHTML = p1; });
        document.title=html_post.querySelector(".post-title").innerText;
    }
}

Post.init();
``` 

# SPA의 단점
하지만 SPA는 `SEO(검색엔진최적화)`가 어렵다는 단점이 있다. SEO란 구글, 네이버 등의 브라우저에서 웹사이트가 검색이 잘되게 하는 것이다. 브라우저의 검색엔진은 웹사이트를 평가하기 위해 방문하는데, 문제는 구글을 제외한 대부분의 검색엔진이 자바스크립트를 실행시키지 않는다는 것이다. 때문에 검색엔진은 완성되지 않은 html 파일을 받고 웹사이트는 낮은 평가 점수를 받게되어 검색이 잘되지 않는다.

위와 같은 SPA의 문제는 `SSG(정적 사이트 생성기)` 또는 `SSR(서버 측 렌더링)`로 해결할 수 있다. 둘의 공통점은 서버에서 html 파일을 완성하여 클라이언트에게 보낸다는 것이다. 처음 한번만 서버에서 완성된 html을 건네주고, 이후에는 SPA의 특성대로 서버와 통신하며 정보를 동적으로 받아오면, SPA의 장점을 살리면서 단점을 없앨 수 있다. SSR과 SSG의 차이점은 html파일을 만드는 시점이다. SSR은 사용자가 방문하는 시점에 html 파일을 만들고, SSG는 사용자가 방문하기 전에 모든 html 파일들을 미리 만들어 놓는다.

# jekyll
`jekyll`은 대표적인 `SSG(정적 사이트 생성기)`이다. 내가 수많은 솔루션 중에 jekyll을 선택한 이유는 github-page가 jekyll을 지원하기 때문이다. 특별한 작업없이 jekyll 폴더를 업로드만 하면 github-page가 알아서 사이트를 렌더링해준다.

jekyll은 또한 많은 기능이 있다. 다음은 jekyll에서 지원하는 기능이다.

* 포스트를 마크다운 언어로 작성가능
* 포스트를 카테고리, 날짜 등 다양한 기준으로 분류 가능
* html파일에서 변수, 반복문 사용 가능

jekyll을 설치하는 방법과 문법, jekyll에서 사용되는 liquid 언어는 공식 사이트에 잘 나와있다.
* [jekyll 설치 및 문법](https://jekyllrb-ko.github.io/docs/)
* [jekyll 새로운 테마 만들기](https://jekyllrb.com/docs/themes/#creating-a-gem-based-theme)
* [liquid 문법](https://shopify.github.io/liquid/)
---
layout: post
title: "jekyll로 트리 구조 네비게이션바 만들기"
order: 1
---
# 트리구조 네비게이션바란
트리구조 네비게이션바란 단순히 말해 윈도우의 폴더-파일 디렉토리 구조라고 할 수 있다. 나는 여기에 더해 최상위 카테고리를 탭으로 구분하여 더 효율적으로 포스트를 분류하도록 하였다. 이것들을 js로도 만들 수 있지만 jekyll을 한번 써보고 싶어  

밑에 구현 부분에 코드를 작성하면 이 블로그의 네비게이션바를 만들 수 있다.

* 최상위 카테고리는 Tab Interface으로
* 트리 구조의 카테고리

# 디렉토리 구조

카테고리 구조를 
### _data/navigation.json

전체 카테고리 구조를 담고 있는 파일이다. `site.data.navigation`으로 불러올 수 있다.

* name: 폴더의 이름
* folders: 하위 폴더
* category: 카테고리 이름(이 요소가 있으면 해당 카테고리의 포스트들이 생성됨)

```js
[
{"name":"devlog","folders":[
    {"name":"side project","folders":[
        {"name":"Level10(web game)","category":"Level10"},
        {"name":"SPA blog","category":"SPA-blog"}
    ]},
    {"name":"study","folders":[
        {"name":"data structure","category":"data-structure"},
        {"name":"algorithm","category":"algorithm"}
    ]}
]},
{"name":"기록","folders":[
    {"name":"대학교","category":"대학교"},
    {"name":"독서","category":"book"}
]}
]
```

# jekyll로 구현

{% raw %}
### _includes/nav.html

최상위 카테고리를 탭으로 만들고 하위 네비게이션을 생성하는 코드를 불러오는 include 파일. 
**이것을 include 하면 네비게이션바가 생성된다.**
```html
<!--navbar tabs-->
<div class="nav-navbar-title-wrapper">
{% for nav in site.data.navigation %}
    <label class="navbar-title" data-navbar="{% increment id1 %}">{{nav.name}}</label>
{% endfor %}
</div>

<!--navbar subs-->
<div class="nav-navbar-wrapper">
{% for nav in site.data.navigation %}
    <div class="navbar" data-navbar="{% increment id2 %}">
        {% include nav-sub.html navigation=nav %}
    </div>
{% endfor %}
</div>
```

### _includes/nav-sub.html

재귀적으로 트리를 탐색하여 하위 네비게이션을 생성하는 include 파일.
```html
{% assign folders = include.navigation.folders %}
{% if folders %}
    {% for folder in folders %}
        <label class="navbar-folder">{{folder.name}}</label>
        <div class="navbar-folder-box">{% include nav-sub.html navigation=folder %}</div>
    {% endfor %}
{% endif %}

{% assign category = include.navigation.category %}
{% if category %}
    <ol data-category={{category}}>{% include categorizedPosts.html category=category %}</ol>
{% endif %}
```
### _includes/categorizedPosts.html

매개변수로 카테고리 이름을 주면 그에 맞는 포스트들을 반환하는 include 파일. 
```html
{% for category in site.categories %}
    {% if category[0] == include.category %}
        {% assign post_list = category[1] | reverse | sort: "order" %}
        {% for post in post_list %}
            <li><a class='post-link navbar-file' data-url='{{ post.url }}'>{{ post.title }}</a></li>
        {% endfor %}
    {% endif %}
{% endfor %}
```
{% endraw %}

# js로 구현
js로 구현을 하게되면 다음과 같은 귀찮은 상황이 발생함으로 **지금은 사용하지 않는다.**
* 카테고리를 분류하는 작업은 jekyll로 해야한다.
* 디렉토리 정보와 분류된 포스트 정보를 불러오는 작업을 해야한다.

```js
createNavbars: function (navigations) {
    const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
    const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");
    let navbar_id_count=0;
    let navbar_folder_id_count=0;
    let createFolder=function(dir) {
        let folders = dir.folders;
        let category = dir.category;
        let innerHTML = "";
        if (folders != undefined) for (let folder of folders) {
            innerHTML += `
        <label for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.name}</label>
        <div class="navbar-folder-box">${createFolder(folder)}</div>`;
        }
        //this.category는 카테고리별로 분류한 포스트 리스트의 객체
        if (category != undefined) innerHTML += `<ol data-category="${category}">${this.category[category]}</ol>`;
        return innerHTML;
    }.bind(this);

    for (let navigation of navigations) {
        html_navNavbarTitleWrapper.innerHTML += `<label class="navbar-title" data-navbar="${navbar_id_count}">${navigation.title}</label>`;
        html_navNavbarWrapper.innerHTML += `<div class="navbar" data-navbar="${navbar_id_count++}">${createFolder(navigation)}</div>`;
    }
}
```
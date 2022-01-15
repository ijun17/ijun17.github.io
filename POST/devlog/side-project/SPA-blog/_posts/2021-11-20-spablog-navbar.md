---
layout: post
title: "jekyll과 js로 트리 구조 네비게이션바 만들기"
order: 1
---
# 구현하려는 네비게이션바
이 포스트에서 이 블로그의 네비게이션바를 어떻게 만들었는지 다룰 것이다. 내가 원하는 네비게이션바의 요구사항은 다음과 같다. 네비게이션 구조는 일반적인 디렉토리 구조와 비슷하기 때문에 앞으로 카테고리를 폴더, 포스트를 파일로 부르겠다. 

* 트리 구조의 카테고리
* 최상위 카테고리는 Tab Interface으로

# 구현
포스트를 카테고리로 분류하는 기능은 jekyll을 이용하였다. 다음은  jekyll의 _include 폴더 안에 모든 포스트를 카테고리 별로 분류하는 기능을 구현한 category.html 파일이다. 트리구조 맨하단에 분류된 포스트 리스트를 배치해 놓은 것은 따로 작업이 필요하다.
```html
{%raw%}<div class="categories" style="display: none;">
    {% assign navbar_file_id = 0 %}
    {% for category in site.categories %}
        <ol class="{{ category | first }}">
        {% assign post_list = category[1] | reverse | sort: "order" %}
        {% for post in post_list %}
            <li class="dynamic-link navbar-file" data-url="{{ post.url }}">{{ post.title }}</li>
        {% endfor %}
        </ol>
    {% endfor %}
</div>{%endraw%}
```

아래는 js로 구현한 네비게이션의 트리구조이다. 
```js
let navigations=[
{title:"devlog",folders:[
    {name:"side project",folders:[
        {name:"Level10(web game)",category:"Level10"},
        {name:"SPA blog",category:"SPA-blog"}
    ]},
    {name:"study",folders:[
        {name:"data structure",category:"data-structure"},
        {name:"algorithm",category:"algorithm"}
    ]}
]},
{title:"기록",folders:[
    {name:"대학교",category:"대학교"},
    {name:"독서",category:"book"}
]}
]
```

아래는 js로 구현한 최상위 폴더를 탭으로 구분, 트리구조 폴더 구조이다. 
```js
createNavbars: function (navigations) {
    function createFolder(dir) {
        let folders = dir.folders;
        let category = dir.category;
        let innerHTML = "";
        if (folders != undefined) for (let folder of folders) {
            innerHTML += `
            <label for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.name}</label>
            <input type="checkbox" id="navbar_folder${navbar_folder_id_count++}" class="navbar-folder-checkbox" ${folder.category == undefined ? "checked" : ""}>
            <div class="navbar-folder-box">${createFolder(folder)}</div>`;
        }
        if (category != undefined) {
            let posts = html_categories.querySelector("." + category);
            if (posts != null) innerHTML += `<ol data-category="${category}">${posts.innerHTML}</ol>`;
        }
        return innerHTML;
    }
    for (let navigation of navigations) {
        html_navNavbarTitleWrapper.innerHTML += `<label class="navbar-title" data-navbar="${navbar_id_count}">${navigation.title}</label>`;
        html_navNavbarWrapper.innerHTML += `<div class="navbar" data-navbar="${navbar_id_count++}">${createFolder(navigation)}</div>`;
    }
}
```
---
layout: post
title: "jekyll로 트리 구조 내비게이션 바 만들기"
order: 2
---
# 구현하려는 내비게이션 바
이 블로그 좌측에 있는 내비게이션 바를 만들어보려고 한다. 트리구조 내비게이션 바란 단순히 말해 폴더 밑에 폴더 또는 파일이 있는 윈도우의 디렉토리 구조와 유사하다. 트리구조의 카테고리는 상하위 카테고리를 구별하기 쉽지만, 트리의 깊이가 커지면 복잡하고 내용이 잘릴 수 있다는 단점이 있다. 이를 위해 나는 최상위 카테고리를 탭으로 구분하여 더 효율적으로 포스트를 분류하도록 하였다. 이 포스트에서 다루는 것은 html 기본 뼈대를 만드는 것이며, 탭이나 링크가 클릭된 후에 일어나야할 작업 등은 js로 따로 구현해야한다. 디자인도 마찬가지이다. 블로그를 만드는 처음에는 js가 익숙해서 내비게이션 바를 js로 구현하였는데, 몇가지 불편한점이 있어 현재는 jekyll만으로 내비게이션 바를 구현을 한다. 기록용으로 js로 구현한 코드도 포스트 맨 하단에 기록하였다.

아래에 directory.yaml을 _data 폴더에, nav.html, sub-nav.html, categorizedPosts.html을 _includes 폴더에 넣고
{% raw %}`{% include nav.html %}`{% endraw %}를 입력하면 내비게이션 바를 실행할 수 있다. 

{% include nav.html %}

# 디렉토리 구조

디렉토리 구조에 대한 정보는 yaml으로 만들었다. _data/directory.yaml에 넣어 `site.data.directory`으로 불러올 수 있도록 하였다.

* category: 카테고리 이름
* sub: 하위 카테고리들(sub가 없으면 포스트가 생성)

```yaml
- category: devlog
  sub:
  - category: side project
    sub:
    - category: Level10(web game)
    - category: SPA blog
  - category: study
    sub:
    - category: data structure
    - category: algorithm
- category: 기록
  sub:
  - category: 대학교
  - category: 독서
```

# jekyll로 구현

아래 nav.html, sub-nav.html, categorizedPosts.html 파일들은 jekyll의 `리퀴드` 언어로 작성되었다.

{% raw %}
### 1. _includes/nav.html

최상위 카테고리를 탭으로 만들고 하위 내비게이션 을 생성하는 코드를 불러오는 include 파일. 
**이것을 include 하면 내비게이션 바가 생성된다.**
```html
<div class="sidebar-nav">
    <!--navbar tabs-->
    <div class="nav-navbar-title-wrapper">
        {%- for nav in site.data.directory -%}
        <div class="navbar-title" data-navbar="{{nav.category}}">{{nav.category}}</div>
        {%- endfor -%}
    </div>

    <!--navbar subs-->
    <div class="nav-navbar-wrapper">
        {%- for nav in site.data.directory -%}
        <div class="navbar" data-navbar="{{nav.category}}">{%- include nav-sub.html navigation=nav -%}</div>
        {%- endfor -%}
    </div>
</div>
```

### 2. _includes/nav-sub.html

재귀적으로 트리를 탐색하여 하위 내비게이션 을 생성하는 include 파일.
```html
{%- assign sub = include.navigation.sub -%}
{%- if sub -%}
    {%- for folder in sub -%}
        <div class="navbar-folder">{{folder.category}}</div>
        <div class="navbar-folder-box" data-category="{{folder.category}}">{% include nav-sub.html navigation=folder %}</div>
    {%- endfor -%}
{%- else -%}
    <ol>{% include categorizedPosts.html category=include.navigation.category %}</ol>
{%- endif -%}
```
### 3. _includes/categorizedPosts.html

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

# js로 구현(사용X)

jekyll로 구현하는것이 더 효율적이라 **지금은 사용하지 않지만** 기록용으로 남겨놓았다.

```js
createNavbars: function (navigations) {
    const html_navNavbarWrapper=document.querySelector(".nav-navbar-wrapper");
    const html_navNavbarTitleWrapper = document.querySelector(".nav-navbar-title-wrapper");
    let navbar_id_count=0;
    let navbar_folder_id_count=0;
    let createFolder=function(dir) {
        let sub = dir.sub;
        let category = dir.category;
        let innerHTML = "";
        if (sub != undefined) for (let folder of sub) {
            innerHTML += `
        <div for="navbar_folder${navbar_folder_id_count}" class="navbar-folder">${folder.category}</div>
        <div class="navbar-folder-box">${createFolder(folder)}</div>`;
        }else{
            //this.category는 카테고리별로 분류한 포스트 리스트의 객체
            innerHTML += `<ol>${this.categorizedPosts[category]}</ol>`;
        }
        return innerHTML;
    }.bind(this);

    for (let navigation of navigations) {
        html_navNavbarTitleWrapper.innerHTML += `<label class="navbar-title" data-navbar="${navbar_id_count}">${navigation.title}</label>`;
        html_navNavbarWrapper.innerHTML += `<div class="navbar" data-navbar="${navbar_id_count++}">${createFolder(navigation)}</div>`;
    }
}
```
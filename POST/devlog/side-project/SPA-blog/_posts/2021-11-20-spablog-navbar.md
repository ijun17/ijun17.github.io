---
layout: post
title: "jekyll로 트리 구조 네비게이션바 만들기"
order: 1
---
# 구현하려는 네비게이션바
이 포스트에서 블로그 사이드바에 있는 네비게이션바를 어떻게 만들었는지 다룰 것이다. 네비게이션바의 요구사항을 간단히 정리해보면 다음과 같다.

* 최상위 카테고리는 Tab Interface으로
* 트리 구조의 카테고리

# 구현

<br>
**_data/navigation.json**

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

<br>
{% raw %}
**_includes/nav.html**

최상위 카테고리를 탭으로 만들고 하위 네비게이션을 생성하는 코드를 불러오는 include 파일.
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

<br>
**_includes/nav-sub.html**

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
<br>
**_includes/categorizedPosts.html**

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
<br>

{% endraw %}

# 네비게이션바 include 하는법

구현한 네비게이션바를 불러오는 방법은 {% raw %}`{% include nav.html %}`{% endraw %}쓰면 된다. 아래는 이 코드를 쓰면 실제로 어떻게 작동하는지 나와있다.

{% include nav.html %}
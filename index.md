---
layout: post
title: "About Me"
category: "main"
oracle_url: "https://tawkor.xyz"
blog_url: "https://ijun17.github.io"
---

## 프론트엔드 개발자 김준기입니다.

바닐라 자바스크립트에 가장 익숙하며, 다른 사람과의 협업을 위해 react도 공부 중입니다.

Node.js, Flask 등으로 서버를 개발해 클라우드에 배포한 경험이 있습니다. 이러한 경험은 백엔드와의 협업에 도움이 되고 있습니다.

# 프로젝트

{% capture project1 %}
## 연구실 AR 안전교육 시스템

`vanila javascript` `SPA`

[배포1(백엔드 테스트 더블)]({{blog_url}}/LSA-web) / [배포2]({{page.oracle_url}}/LSA) / [깃허브](https://github.com/ijun17/LSA-web) / [REST API 정의서](https://cyber-mitten-d95.notion.site/LSA-REST-API-df2116c15a564d15acd39837cec2684e)

* 개발인원: 5명
* 개발기간: 2024.03 ~ 진행중
* 역할: 프론트엔드

이 프로젝트는 AR 기반의 연구실 안전교육 시스템입니다. 사용자가 AR 환경에서 연구 매뉴얼을 직접 작성할 수 있어 맞춤형 안전교육을 받을 수 있는 시스템입니다.

저는 프론트엔드를 담당하여, 브라우저 및 앱의 웹 뷰에서 동작할 반응형 웹을 개발했습니다. 이 과정에서 디자이너와 피그마로 협력했으며, 백엔드 담당과 REST API 정의서를 만들어 협력했습니다. 현재 진행 중인 프로젝트입니다.

<ul>{%- include categorizedPosts.html category="capstone" -%}</ul>
{% endcapture %}

{% capture project2 %}
## 웹 게임(Level10)

`vanila javascript` `SPA` `node.js`

[배포(게임링크)](https://ijun17.github.io/Level10/) / [깃허브](https://github.com/ijun17/Level10)

* 개발인원: 1명(본인)
* 개발기간: 2020년 1월부터 시작해 꾸준히 개발하고 있습니다.

코드를 작성해 스킬을 만들 수 있는 2D RPG 게임입니다. 자바스크립트에 대한 실력을 향상하고 싶어 진행했던 사이드 프로젝트입니다. 바닐라 자바스크립트로 물리엔진, 멀티 플레이, 화면 UI 및 렌더링, 스케줄링 등을 구현했습니다. 또한 Node.js로 멀티플레이의 매칭 서버(시그널링 서버)를 구현했습니다.

<ul>{%- include categorizedPosts.html category="Level10(web game)" -%}</ul>
{% endcapture %}


{% capture project3 %}
## 블로그

`javascript` `jekyll` `SPA`

개발하면서 맞닥뜨린 문제 상황을 기록하기 위해 만들었습니다. 깔끔함과 군더더기 없음을 지향하며 디자인했으며, 지금까지 보고 개인적으로 느껴왔던 블로그들의 단점을 해결했습니다. 

* 다른 포스트로 이동했을 때 내비게이션 바가 초기화되는 것을 막기 위해 SPA로 구현하였습니다. 
* 페이지 이동 없이 내비게이션 바에서 모든 카테고리와 포스트를 볼 수 있도록 하였습니다. 
* 반응형 웹으로 컴퓨터, 태블릿, 모바일 화면이 모두 잘 보이도록 하였습니다. 

<ul>{%- include categorizedPosts.html category="my blog" -%}</ul>
{% endcapture %}


{% capture project4 %}
## 그 외

### 모바일 기기 원격 접근 시스템
[배포(웹)]({{page.oracle_url}}/connect) / [깃허브](https://github.com/ijun17/mobile-connect)

안드로이드 웹 뷰로 하이브리드 앱을 개발하였고, 파일을 접근하는 브리지를 만들었습니다.
<ul>{%- include categorizedPosts.html category="mobile connect" -%}</ul>

<br>

### 코인 급상승 예측 시스템
[배포]({{page.oracle_url}}/coins) / [깃허브](https://github.com/ijun17/surge-coin-predictor)

스팸 코인의 가격 급상승을 ML로 예측하였습니다. 시계열 데이터를 학습하기 위해 윈도우로 데이터를 전처리했습니다.
<ul>{%- include categorizedPosts.html category="aiot coin" -%}</ul>

<br>

### WebRTC 채팅 서비스
[배포]({{page.blog_url}}/WebRTC-chat) / [깃허브](https://github.com/ijun17/WebRTC-chat)

WebRTC를 공부하기 위해 개발한 간단한 채팅 서비스입니다.
<ul>{%- include categorizedPosts.html category="WebRTC chat" -%}</ul>
{% endcapture %}

<div class="box">{{project1 | markdownify}}</div>
<div class="box">{{project2 | markdownify}}</div>
<div class="box">{{project3 | markdownify}}</div>
<div class="box">{{project4 | markdownify}}</div>

# 수상내역

[증빙자료](https://cyber-mitten-d95.notion.site/11d1f8769793474e8c4ce2c8f3c0d1c6?pvs=4)

### 2023 XR 디바이스 콘텐츠 아이디어톤 장려상

(구미전자정보기술원장상, 2023.11)

### 2024 자율주행 SW 교육 및 경진대회 대상

(전북대학교 공과대학장상, 2024.02)

### 2024 한국정보기술학회 대학생논문경진대회 금상

(”자이로센서 데이터 및 이미지 데이터를 이용한 Aruco 마커 기반 AR 안전 교육 시스템”, 2024.05)




# 활동

### 전북대학교 소프트웨어공학과 동아리 AM:PM

* 기간: 2020.03 ~ 현재
* 활동: 2020년도 웹 스터디 멘티, 2023년도 운영진, 2023년도 깃허브 스터디 멘토  

### 코드클럽 한국위원회 코딩교육 봉사활동

* 기간: 2023.04 ~ 2023.07
* 활동: 중산초등학교 학생들에게 코딩 교육을 했습니다.

### 전북대학교 AI동아리 Jbig

* 기간: 2024.03 ~ 현재
* 활동: 매주 파이썬 인공지능 세미나에 참석했고, 비전공자 분들과 프로젝트를 진행중입니다. 
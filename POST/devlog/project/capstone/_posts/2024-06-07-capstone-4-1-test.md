---
layout: post
title: "[LSA]프론트엔드 테스트 스텁"
order: 5
---

백엔드의 개발이 완료되지 않은 상황에서 테스트 스텁을 만들어 프론트엔드의 UI가 정상적으로 동작하는지 테스트하였다. 테스트 스텁이란 테스트를 위한 가상의 모듈로 여기서는 백엔드에 해당된다. 백엔드와 프론트엔드는 REST API로 소통을 하는데, REST API를 문서화했었다. 따라서 REST API 정의서를 가지고 테스트 스텁을 만들 것이다. 나는 여기서 json 서버를 사용하지 않고, REST API를 캡슐화해서 로컬로 테스트할 것이다.

# RestInterface

RestInterface 클래스를 만들어 필요한 엔트포인트와 인증 토큰을 관리하는 메소드를 만들 것이다. 그리고 이를 상속받는 두 개의 클래스를 만들 것이다. 하나는 실제로 서버와 통신을 하는 구현체이고, 나머지는 테스트 데이터를 반환하는 테스트 스텁이다. 사실 자바스크립트는 동적 타입 언어이기 때문에 interface같은거 안만들고 코드를 복사-붙여넣기 해도되지만 객체지향적으로 개발하기 위해 이렇게 할 것이다.

RestInterface에서 엔드포인트와 대응하는 20개 이상의 함수가 있다. 아래 문서에 있는 모든 엔드포인트를 함수로 정의해서 손쉽게 사용할 수 있도록 할 것이다.

<https://cyber-mitten-d95.notion.site/LSA-REST-API-df2116c15a564d15acd39837cec2684e>
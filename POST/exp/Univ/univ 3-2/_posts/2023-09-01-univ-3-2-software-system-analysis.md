---
layout: post
title: "[3학년2학기]소프트웨어시스템분석"
order: 20
---

* 요구사항 분석 설계
* 유스케이스 - 기능적 요구사항

중간고사
* 소프트웨어모델링이란 무엇인가(자료와 개인적인 생각 / 논리적으로)

프로젝트
* 자바 c++ 등 순수 객체지향적 언어로 된 프로젝트가 좋음
* 상품성없어도 됨 비즈니스 필요없음 


# 소프트웨어 모델링

* OMG에 따르면 : 코딩하기 전에 응용 소프트웨어를 설계하는 것
* 개인적인 생각 : 
* 요구사항 - 유스케이스
* 정적 모델 - 클래스
* 동적 모델 - 

`UML`
* 대표적 UML - 클래스, 유스케이스, 인터렉션(시퀸스, 커뮤니케이션), 스테이트 머신(스테이트 차트)
* 대표적 UML 기반 방법론 - RUP(소프트웨어 개발 프로세스 프레임워크)
* UML을 방법론 독립적이여서 객체지향적 분석 설계 기술이 필요함
* COMET도 UML 기반 방법론(이 수업에서 주로 다룰 예정)

모델링 종류
* use case modeling: 기능적 요구사항을 다룸
* static modeling: 시스템의 구조적인 뷰, 클래스와 그들 간의 관계
* dynamic modeling: 시스템의 행동, 기능적 요구사항을 상호작용으로 실체화

`소프트웨어 아키텍처`
* 높은 수준 : 시스템을 서브 시스템로 분해
* 낮은 수준 : 서브 시스템을 모듈이나 컴포넌트로 분해


# UML 표기법

## Use case Diagram
* use case diagram: 액터와 타원형의 유스케이스
* «extend»로 유스케이스 기능 확장

## Class & Object
* class name, attribute(생략 가능), operation(생략 가능) 순으로 사각형으로 나누어 표기
* 객체는 밑줄로, 클래스나 객체 이름 생략 가능

## Class Diagram
* association(연관): 그냥 화살표(단어를 작성해 어떤 연관인지 표시 가능)
* 상속: 비워진 삼각형 화살표
* Aggregation: 비워진 마름모 화살표
* Composition: 채워진 마름모 화살표
* visibility: public(+), private(-), protected(#)

## Communication Diagram(Interaction Diagram)
* UML 1.X에서는 collaboration diagram임
* 액터가 객체에게 메시지를 전달하고 객체는 다른 객체에게 메시지 전달
* 액터와 객체들은 선으로 연결되며, 객체는 세로로 배치됨
* 화살표와 메시지 이름으로 무슨 메시지인지, 어떤 방향으로 전달되는지 표시
* 메시지 이름 앞에 순서(1,2,...)를 표시하며, 조건을 표시가능

## Sequence Diagram(Interaction Diagram)
* communication D를 90도 돌린것
* 액터와 객체는 그 밑으로 점선이 그려짐
* 메시지는 점선사이에 화살표로 표시됨
* 시간은 밑으로 흐름

## State Transition Diagram
* = state machine = state chart
* `Event\[condition]/Action` (조건은 생략 가능)
* Event: 다른 상태로 전환하게 하는 사건
* Condition: Event가 발생할 때 상태가 전환될 조건
* Action: 상태가 전환될 때 행동
* 시작 상태는 검은 점으로 표시
* 종료 상태는 검은 점을 둘러싼 원으로 표시
* 상태는 둥근 사각형으로 표시하며, composite 상태와 sub 상태가 있음
* 이벤트, 조건, 행동은 화살표 옆이나 상태안에 표시
* composite 상태는 orthogonal region으로 분리 가능

## Package
* 패키지를 model element(class, object, use case 등)를 모아놓은 것
* 패키지는 사각형의 좌상단에 작은 사각형을 하나 더 붙인 폴더 모양
* 패키지 이름을 표시

## Concurrent Commnication Diagram
* Active Object(Concurrent Object): 내부 양옆에 세로선이 그려진 사각형 안에 «active object»로 표기
* Passive Object: 사각형 안에 «passive object»로 표기
* 액티브 오브젝트는 자신이 제어하는 스레드가 있음
* Concurrent Applications: 액티브 오브젝트가 한개 이상 있음(스레드 다수, 비동기 메시지 가능)
* Sequential Applications: 패시브 오브젝트만 있음(한개의 스레드)
* 비동기 메시지는 결합도가 낮고, 동기 메시지는 높음
* 비동기 메시지: 화살표 위에 «Asynchronous Message»와 name(argument list)으로 표시
* 동기 메시지: 채워진 삼각형 화살표 위에 «Synchronous Message»와 name(argument list)으로 표시
* reply 메시지: 점선 화살표 위에 «reply»로 표시
* simple 메시지: 비동기 메시지와 동일하게 표시

## Deployment Diagram
* physical nodes와 physical connections로 physical configuration를 표시

## UML Extension Mechanisms
* Stereotypes: «entity»(DB관련 클래스), «control»(시스템 로직), «boundary»(시스템-외부 인터페이스)
* Tagged Values: 클래스의 설명, 작성자, 생성일 등과 같은 부가 정보
* Constraints: 속성 등에 제약사항을 넣을 수 있음






# COMET

UML 기반의 방법론

* 유스 케이스 기반, 객체 지향 
* 요구사항, 분석, 설계 단계


# UML 다이어그램

<<>> - 길러멧

## 유스케이스 다이어그램

* << extends >>
* << include >>

## 클래스 다이어그램

* 클래스는 박스 안에 속성과 오퍼레이션을 가짐
* 객체는 글자에 밑줄

관계
* assosiation : 화살표
* 
* composition : 검은색 다이아몬드 화살표
* aggregation : 다이아몬드 화살표

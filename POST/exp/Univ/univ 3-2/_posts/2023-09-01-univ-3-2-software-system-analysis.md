---
layout: post
title: "[3학년2학기]소프트웨어시스템분석"
order: 20
---

중간고사
* 소프트웨어모델링이란 무엇인가 소프트웨어 모델링에서 UML이 갖는 의미에 대해 서술하라(자료와 개인적인 생각 / 논리적으로)
* 교재 연습문제
* 영문 그대로
* 클래스 다이어그램으로 표시(아마 교재에 있는 예시로 나올듯)
* 요구사항 분석 설계
* 유스케이스 - 기능적 요구사항
* 액티비티 - 워크 플로우
* 소스코드 주고 클래스 다이어그램 만들기
* 교재에 안나오는 기본적인 
* 교재에 안나옴(클래스 스코프 > 스태틱), (오브젝트or인스턴스 스코프), (메소드 스코프) 
* 클래스 스코프의 스태틱은 다이어그램에서 및줄을 긋는다 
* 추상클래스(상속표기법 extends), 인터페이스(implements, 클래스 다이어그램으로 어떻게 표시?: 상속 화살표에서 점선 화살표)
* 자바 코드 실행결과(에러 발생할 수도?)
* O/X 문제(모호한거 자세히 알아야 할듯)



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
* << extends >> : 조건부로 같이 발생하는 use case
* << include >> : 항상 같이 발생하는 use case

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
* `Event[condition]/Action` (조건은 생략 가능)
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

클래스 분류
* `엔티티`: 데이터 중심(DB)
* `바운더리`: GUI 관련, input/output
    * user interaction
    * device I/O
    * proxy
* `컨트롤`
    * timer
    * state dependant control
    * coordinator
* `어플리케이션 로직`(COMET에서는 컨트롤 클래스에서 떨어져 나옴)
    * business logic
    * algorithm
    * service

특징
* UML 기반의 방법론
* 유스 케이스 기반, 객체 지향 
* 요구사항, 분석, 설계 단계

과정
1. `Requirement Modeling`: 기능적 요구사항 서술, **throwaway prototype**
2. `Analysis Modeling`: static, dynamic modeling
3. `Desgin Modeling`: sw 아키텍처 설계
4. `Incremental Software Construction`: 자세한 설계, 코딩, 유닛 테스트
5. `Incremental Software Integration`: 각각의 use case의 통합 테스트(화이트 박스), 각 통합에서 **Incremental Prototyping**을 만듦, 만약 중대한 문제가 발생한다면 이전 단계 중 하나로 복귀
6. `System Testing`: 시스템의 기능 테스트(블랙 박스)

COMET의 차별점
* Analysis: 문제의 분해
* Design: 해결책을 합성

`SysML`
* system modeling 




# 유스 케이스 모델링

**requirement** > analysis > design

`기능적 요구사항` vs `비기능적 요구사항`
* 기능적 요구사항: 시스템의 기능
* 비기능적 요구사항: 시스템의 성능, 품질
* 기능적 요구사항 설명이 main
* 비기능적 요구사항을 서술식으로 보충 설명 가능

use-case 확장
* << extends >> : 조건부로 같이 발생하는 use case
* << include >> : 항상 같이 발생하는 use case

`요구 사항 명세서`
* 요구 사항 분석가 - 사용자의 합의로 만들어짐
* 개발자도 이해해야함
* 기능적, 비기능적 요구사항 둘다 명세
* Good **SRS(Software Requirements Specification)**-"IEEE Recommended Practice for Software Requirements Specification"를 참조

`use case model` 특징
* 유스 케이스란 액터와 시스템의 상호작용(기능적 요구사항)
* 액터는 시스템에 input을 주고, 시스템은 response를 줌
* 한 유스케이스에 액터가 여러명일 수 있음(복잡한 경우)
* 시스템을 블랙박스로 취급, 내부 동작 방식은 다루지 않음
* 유스 케이스에 참여하는 객체는 아직 정하지 않음(분석 모델링에서 정함)

유스케이스 핵심 요소
* 유스 케이스 및 액터 이름
* 유스 케이스 한 문장으로 요약
* main 이벤트 순차적 설명
* main 시퀸스 대안적 설명

`Actor`
* 시스템 외부 존재(사람, 외부 시스템, 입출력 디바이스 등)
* 스틱 피규어로 표현
* 같은 유형의 모든 액터를 하나의 역할로 표현
* **primary actor**: 이것의 입력으로 유스 케이스가 시작됨
* **secondary actor**: primary가 다른 유스 케이스에서는 이것이 될 수 있음 





# Static Modeling

requirement > **analysis** > design

시스템 안에 클래스들과 그들의 속성, 연산, 관계를 정의

`Association`
* 클래스 간의 관계
* Multiplicity,Association Name,arrow
* unary association : 자신과 연관
* association class : 연관관계 자체가 자신의 속성을 가져야하는 경우
* **Link**: 객체 간의 연결(Association의 인스턴스)

`Composition(집합) & Aggregation(구성)`
* 둘다 비슷한 의미
* 전체-부분 관계(has a)
* association의 특수한 형태
* composition : part object와 같이 생성, 소멸됨 - 한몸
* aggregation : part가 whole과 떨어져 존재할 수 있음
* part > whole 방향으로 표시

`Generalization & specialization`
* is-a 관계(sub is a super)

`Constraints`
* 제약사항은 문자로 표현된다.
* OCL(Object Constraint Language) - *ex) {count >= 0}*

`static modeling`
* physical class와 entity class를 주로 모델링(변하지 않을 것들)
* Physical Class: 물리적인 장치, 사용자
* Entity class: 데이터를 다루는 클래스, 오래 살아남음 

`Context Modeling`
* 시스템 내부와 외부를 식별하는 목적
* 클래스 다이어그램 표기법으로
* system context diagram: 전체 시스템 수준에서(하드웨어 + 소프트웨어)
* software system context diagram: 소프트웨어 수준에서

`«external class»`
* «external user»: standard I/O devices (keyboard/display, mouse)
* «external device» 
    * «external input device»
    * «external output device» *ex) ReciptPrinter, CashDispenser*
    * «external I/O device» *ex) CardReader*
* «external system» 
* «external timer»

`Entity Class`
* 데이터 중심 클래스, 데이터를 저장하고 접근 통제(DB 같은)
* COMET의 정적 모델링에서는 Entity class의 속성과 관계에 중점
* 오퍼레이션은 아직 명세 안함(디자인 모델링 때 함)
* E-R 모델링과의 차이는 정적 모델링은 오퍼레이션을 명시하는 것을 허용*

!정적 모델링은 오퍼레이션을 포함해야 하지만, 동적 모델링 이후에 만드는게 쉽다

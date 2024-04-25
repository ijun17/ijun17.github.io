---
layout: post
title: "[4학년1학기]소프트웨어품질테스팅"
order: 20
---

V&V 
* `validation(확인)`: 올바르게 제품을 구축했는가 - 요구사항대로 제품이 동작하는가
* `verification(검증)`: 올바르게 제품을 구축하고 있는가 - 스펙에 부합하는가

테스팅: 의도된 입력 뿐만나이라 **의도되지 않는 입력**도 

* system under test(SUT): 테스트 대상
* expected output: 기대 출력
* test input: 테스트 대상에 테스트 케이스를 입력
* test case: 입력과 기대 출력
* test oracle: 정답을 가지고 있으며 판정도 가지고 있는 것 - 정답의 세트 - 테스트를 통과 했는지 판단

_

케이스 만들기 - 모든 케이스를 테스트 하기에는 많기 때문에 골라서 몇개만
test suite: 테스트 케이스의 집합

_

* error(버그): 코드에 버그로 존재
* fault(defect=결함): 버그란 코드 내부에 결함으로 존재 - 누락된 결함
* failer(실패): 특정 상황에 대해 버그가 외부로 드러남 - 모든 결함이 실패로 이루어지지 않는다.

_

`테스팅`이란 제품이 정상적으로 동작한다는 것을 보여주는게 아니라, **에러를 발견하는 과정**이다. 좋은 테스팅이란 많은 오류를 발견하는 것이다.

-

* 블랙박스: 입력과 출력만을 보는 테스트 - 요구사항 스펙을 보고 입력을 결정
* 화이트박스: 프로그램의 내부를 보는 테스트 - 코드를 보고 입력을 결정, 그래도 출력은 요구사항 스펙을 보고 결정
* 그레이박스

누군가가 오라클을 줄 수 있으면 입출력을 만들때 요구사항 스펙을 참고하지 않아도 됨.

-

테스팅의 경제성 문제: 모든 경우의 수를 테스팅하는 것은 불가능하다.

-

테스팅 원리 요약
* 테스트 케이스에서 기대 출력은 필수적이다.
* 자기자신의 코드를 테스팅하는 것은 피해야한다.(유닛 테스팅 제외)
* 프로그래밍 조직이 자신의 코드를 테스팅하는 것을 피해야한다.
* 테스팅 과정은 각 테스트 결과에 따른 철저한 검증이 필요
* 테스트 케이스를 만들때 의도된(valid, invalid) 입력 뿐만아니라 얘기치않은(unexpected) 입력도 넣어봐야함
* 
* 일회용 테스팅 케이스를 피하라(회귀시험에)
* 테스팅을 할대 오류가 없다는 것을 검증하기 위해 하지 말아라
* 프로그램에서 에러가 많이 존재하는 부분은 
* 테스팅이라는 것은 매우 창의적이고 기능적인 작업

-


# 정적 시험 Static Testing

* `정적 시험`이란 실행을 안시키고 하는거
* `동적 시험`이란 프로그램을 실행 시켜 실제 입력을 너보는거


**동적 시험과 정적시험의 차이점**
* 정적 시험은 개발 산출물(리뷰 등)을 보고 테스팅. 정적 분석은 복잡하므로 툴만 가지고 할것이다. 
* 정적 분석은 스펙이 주어지고, 예를들어 상태 차트 다이어그램.
* 정적 테스팅은 보안과 안전이 필요한 시스템에서 많이 함


-

정적 테스트에서 사용되는 산출물
* 요구사항 명세서(기능, 비기능)
* High level design
* Low level design
* 디자인 명세서(시스템 아키텍처(하드웨어 포함), 소프트웨어 아키텍처)
* **코드**(코드 리뷰): 인스펙션(코드를 하나씩 보면서)과 워크스루(테스트케이스를 만들어 두뇌시뮬레이션)로 구분
* 유저 가이드

-

개발 단계 별 수행되는 정적 테스트
* 요구사항 분석 - 
* 설계 - 
* 개발 - 코드의 품질
* 테스팅 - 테스트 케이스에 대한 테스튼
* 유지보수

버그는 일찍 발견할 수록 싸다(나중에는 범위도 커지고) 비용이 선형적으로 커짐
코드리뷰를 자주 하면 코드의 품질 높아짐 > 버그 낮아짐

-

가독성과 코드 컨벤션은 정적 테스팅으로만 확인할 수 잇다.

정적 테스팅은 항항 `체크리스트`와 프로세스로 진행된다. 

동적 테스팅은 테스트 케이스를 사용. 정적 테스트도 테스트 케이스를 쓰기도함(머리로 돌림)

-

* 설계 결함: 비효율적 알고리즘, 디비 구조, 높은 결합도, 낮은 응집도
* 코딩 결함: 정의되지 않은 값을 갖는 변수, 선언되었지만 사용되지 않은 변수, 접근할 수 없는 변수, 중복 코드.
* 표준을 준수하지않는 경우
* 잘못된 인터페이스 명세 

-

모든 품질속성을 충족시킬수 없다(trade off). 따라서 중요한 것을 골라서 해야함.

-

인스펙션 팀(4사람으로 구성)
* moderator(중재자): 프로그래밍 잘하는 사람 
* 프로그래머
* 설계자: 폭넓은 지식을 가지는 사람
* 테스트 스페셜리스트

-

오류 종류
* data reference error: 배열 넘어가는 경우
* data declaration error: 데이터 초기화 안하고 사용, 변수 이름이 비슷한가
* computation error: 0으로 나눌때, 다른 타입끼리 연산, 정수끼리 나누는 연산
* comparison error: 1 < a < 2이런거, 실수 비교연산
* control flow error: 루프가 종료가 되는가, off-by-one error
* input/output error: 파일 위치, 권한, rw 모드, EOF 처리
* interface error: 함수 매개변수

-

byte b =127
int a =100;
b = b+a // 오류
값이 줄어들음
-



```java
// 마지막 0을 반환하는 함수
public static int lastZero(int[] x){
    for(int i=0; i<x.length(); i++){
        if(x[i]==0){
            return i;
        }
    }
    return -1;
}
// 결함 : for문에서 역순으로 찾아야함
// 결함을 실행시키지 않는 경우  [1,2,3,4]
// 실행하지만 오류를 발생시키지 않는 경우  [1,0,1]
// 오류를 발생시키는 경우 [1,0,0,1]
```




# Test Case Design

## 효과적인 테스트 케이스 만드는법

모든 오류를 잡을 수 없고, 모든 테스트 케이스를 검사할 수 없다 - 효율성 필요

* random-input testing: 무작위로 숫자를 넣음
* 

## 두 가지 테스트 케이스 만드는 주요 방법 - 블랙박스, 화이트박스

* 화이트 박스(구조 기반 시험): 뒤에 커버리지(코드를 얼마나 실행시키는가) 라는 이름이 붙은 여러 종류의 기법을 가짐. 비용이 많이 드는 시험. 명세가 되어 있는데 코드에 없는 경우 알 수 없음.
* 블랙 박스(명세 기반 시험): 동등분할, 경계값 분석, 원인 결과 그래프, 오류. 명세되지 않은 행위를 구현한 부분을 시험할 수 없다.

## 언제 시험을 끝낼것인가?

**test adequacy**: 테스트 충분성(테스트를 끝내도 되는 기준)
* 프로그램의 구조(화이트), 프로그램의 입력(블랙), 요구사항들(블랙)

coverage 맹신의 위험성: 보증을 하진 않음. 단지 테스팅을 정량화하는데 사용. 테스트를 안한 부분은 모름.
커버리지를 맹신하면 커버리지를 올리려고 비슷한 테스트 케이스를 만들려는 경향이 놓음.

## MCDC pair 만들기

조건에 영향을 주는 여러개의 변수중 하나의 변수가 


## boundary test


## 04-1 test case design 사례


널, 빈, 길이1, 길이1이상

null null null

abc ab bc  길이가 겹침
abcd ab cd 길이가 0
ab b a     길이가 -1


1. open과 close가 사이에 문자가 0개
2. open과 close가 같음
3. 



# 5 test case design 3

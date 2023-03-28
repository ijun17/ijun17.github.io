---
layout: post
title: "[3학년1학기]데이터베이스(작성중)"
order: 30
---
# 실습
XAMPP(잼프) 프로그램은 PHP, Apache, MySQL 프로그램을 패키지 형태로 설치.

* Apache : 클라이언트 측에서 웹 서비스를 요청하면 HTML 파일, 이미지, 동영상 등의 데이터를 HTTP 규약에 따라 클라이언트의 로컬 컴퓨터에 전송. 
* PHP : PHP언어로 작성된 프로그램을 PHP 해석기가 HTML로 변환하여 Apache가 클라이언트로 보낸다. 클라이언트 측 사용자는 해석된 HTML 파일(웹 페이지)을 웹 브라우저로 볼 수 있음.
* MySQL : DBMS(DataBase Management System, 데이터베이스 관리 시스템)의 하나이다. MySQL 데이터베이스는 웹용 데이터를 저장, 검색, 수정, 삭제하는 역할 수행.

다음은 PHP언어이다.
```php

```


다음은 테이블을 생성하고 데이터를 조작하는 SQL언어이다.
```SQL
--테이블 생성
create table member ( 
    num int not null auto_increment, 
    id char(20) not null, 
    name char(20) not null, 
    gender char(1), 
    post_num char(8), 
    address char(80), 
    tel char(20), 
    age int, 
    primary key(num) 
);
--테이블에 데이터 삽입(num은 primary key이므로 삽입안해도됨)
insert into member (id, name, gender, post_num, address, tel, age) values ('yjhwang', '황영주', 'M', '100-011', '서울시 중구 충무로1가', '234-8879', 35); 
--테이블에 저장된 데이터 검색
select * from member;
select name,tel from member;
--해당 조건의 데이터 검색
select id, name, address, gender from member where gender='W';
select name, tel, gender, age from member where age>=50 and gender='M';
select name, tel, age, gender from member where ( (age>=30 and age<=39) or (age>=50 and age<=59) ) and gender='M';
--성이 황씨인 사람 검색 / 주소에 서울시가 들어가는 사람 검색
select * from member where name like '황%';
select * from member where address like '%서울시%';
--나이로 오름차순/내림차순 정렬
select * from member where address like '서울%' order by age;
select * from member where address like '서울%' order by age desc;
--테이블 데이터 수정
update member set tel='123-4567' where name='고재진'; 
--테이블에 데이터 삭제
delete from member where name='김수련'; 
--테이블 삭제(delete from table;)과는 다르게 구조까지 완전삭제 한다는것
drop table member;
```



조별과제
3/27(월) 팀 조직
4/17(월) 프로젝트 계획서 발표(데이터 종류, 분석방법)

과제
xampp 다운 ()

# 1.데이터베이스 기본 개념

* 데이터(data) : 현실 세계에서 단순이 관측하거나 수집한 사실(fact)이나 값(value) 
* 정보(information) : 데이터를 의사결정에 유용하게 활용할 수 있도록 가공한 결과물
* 정보 처리(information processing) : 데이터에서 정보를 추출하는 과정 또는 방법
* 정보 시스템 : 조직에 필요한 데이터를 저장했다가 필요할때 유용한 정보를 만들어주는 수단

데이터베이스란 특정 조직의 여러 사용자가 `공유`하여 사용할 수 있도록 `통합`해서 `저장`한 `운영` 데이터의 집합이다.
* 공유데이터(shared data) : 여러사용자가 함께 소유하고 이용
* 통합데이터(integrated data) : 중복을 최소화하고 통제가능한 중복만 허용하는 데이터
* 저장데이터(stored data) : 컴퓨터가 접근 가능한 매체 저장해야함
* 운영데이터(operational data) : 조직을 운영하기위해 지속적으로 유지해야됨

데이터 베이스의 특징으로 4가지가 있다. 
* 실시간 접근(real-time accessibility) : 대게 몇초 안에 데이터를 제공해야함
* 계속 변화(continue evolution) : 데이터가 계속 삽입, 삭제, 수정됨
* 동시 공유(concurrent sharing) : 서로 다른 데이터 뿐만 아니라 같은 데이터도 동시 사용 가능
* 내용으로 참조(content reference) : 내용, 즉 값으로 참조 가능 ex)재고량이 100이상인 제품 이름

데이터는 형태에 따라 다음과 같이 분류된다.
* 정형 데이터(structured data) : 미리 정해진 구조에 저장된 데이터 ex)엑셀, 관계 DB
* 반정형 데이터(semi-structured data) : 내용안에 구조를 설명 ex)HTML, XML, JSON
  - 내용과 함께 설명된 데이터 구조를 schema 또는 metadata라고 한다. 
* 비정형 데이터(unstructured data) : 정해진 구조가 없음 ex)텍스트, 영상, 이미지, 음성

정형 데이터 이외에의 데이터를 저장하기 위한 `XML DB`나 `멀티미디어 DB`가 있다. XML DB는 웹에서 사용하기위해 만들어졌다. XML 문서를 하나의 단위로 저장하는 방법과 XML의 계층 구조를 유지해 효율성을 높인 XML 전용 DB로 나뉜다. 멀티미디어 DB는 문자나 숫자뿐 아니라 이미지, 영상 등이 조합된 멀티 미디어 데이터를 저장하고 처리하기 위해 개발되었다.

데이터는 특성에 따라서도 분류 가능하다. 효율적인 정보 처리를 위해서는 특성에 맞게 저장 및 분석을 해야한다.  
* 범주형 데이터(categorical data) : 종류를 나타내는 값을 가진 데이터, 비교적 비용이 많이듬 / 정성적 데이터(qualitative data)
  - 명목형 데이터(nominal data) : 서열이 없음 ex)혈액형, 학과명, 거주 지역
  - 순서형 데이터(ordinal data) : 서열이 있음, 산술연산 불가 eX)학년
* 수치형 데이터(numerical data) : 산술연산 가능 / 정량적 데이터(quantitative data)
  - 이산형 데이터(discrete data) : 정수형 ex)고객 수, 판매량
  - 연속형 데이터(continuous data) : 실수형 ex)키, 몸무게

# 2.데이터베이스 관리 시스템

과거에는 `파일 시스템`을 이용해 데이터를 관리했다. 파일 시스템은 운영체제와 함께 설치되며, 응용프로그램 별로 필요한 데이터를 별도의 파일로 보관한다. 파일 시스템은 별도의 구매 비용이 들지 않는다는 장점이 있지만, 다음과 같은 단점이 있다.
1. 같은 내용의 데이터가 여러 파일에 중복 저장된다. 
2. 응용 프로그램이 데이터 파일에 종속적이다. 
3. 데이터 파일에 대한 동시 공유, 보안, 회복 기능이 부족하다. 
4. 응용 프로그램을 개발하기 쉽지 않다. 

`데이터베이스관리시스템(DBMS)`이란 파일 시스템의 문제인 데이터 중복과 데이터 종속 문제를 해결하기 위해 만들어졌다. DBMS는 DB를 생성하고, 접근하며 관리하는 일을 한다. DBMS의 주기능은 크게 세가지로 나눌 수 있는데, 정의기능(DB의 구조를 정의하거나 수정), 조작기능(데이터를 삽입,삭제,수정), 제어기능(데이터를 정확하고 안전하게 유지)이다. 이러한 기능들로 DBMS는 파일 시스템에 비교해 다음과 같은 장점을 가진다.
1. 데이터 중복을 통제 할 수 있다
2. 데이터 독립성이 확보된다
3. 데이터를 동시 공유 할 수 있다
4. 데이터 보안이 향상된다
5. 데이터 무결성을 유지할 수 있다
6. 표준화할 수 있다
7. 장애 발생 시 회복 가능
8. 응용 프로그램 개발 비용이 줄어든다

데이터베이스 관리 시스템의 단점은 다음과 같다
1. 데이터 관리 시스템을 설치하고 유지하는데 비용이 많이 든다
2. 백업과 회복 방법이 복잡하다
3. 중앙 집중 관리로 인한 취약점이 존재

데이터베이스 관리 시스템은 다음과 같은 과정으로 발전했다.
1. (1세대)네트워크·계층 DBMS
2. (2세대)관계 DBMS
3. (3세대)객체지향·객체관계 DBMS
4. (4세대 이후)NoSQL·newSQL DBMS

# 3.데이터베이스 시스템

`데이터베이스 시스템(DBS)`이란 **DBMS와 DB를 합친 개념**으로 DB에 데이터를 저장하고 저장된 데이터를 관리하여 조직에 필요한 정보를 생성해주는 시스템이다. 

`스키마`란 데이터 구조와 제약조건을 정의한 것이다.

# 4.데이터 모델링
# 5.관계 데이터 모델
# 6.관계 데이터 연산
# 7.데이터베이스 언어 SQL
# 8.데이터베이스 설계
# 9.정규화
# 10.회복과 병행 제어
# 11.보안과 권한 관리
# 12.데이터베이스 응용 기술
# 13.데이터 과학과 빅데이터
# 14.데이터베이스 활용



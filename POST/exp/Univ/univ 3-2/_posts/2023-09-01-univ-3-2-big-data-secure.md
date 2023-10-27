---
layout: post
title: "[3학년2학기]빅데이터보안"
order: 20
---

중간고사
- RBAC


# 인터넷

* 멀리 떨어진 대학 연구소에 정보 전달 용도로 시작
* TCP/IP 프로토콜 기반

`프로토콜`
* 통신 규칙과 방법에 대한 약속 또는 규약
* 3가지 요소 - 구문(Syntax), 의미(Semantics), 순서(Timing)
* TCP/IP(Transmission Control Protocol/Internet Protocol)
* TCP/IP는 RFC라는 문서를 통해 공개(https://www.ietf.org/rfc)

`TCP/IP`
* 가장 많이 사용됨
* RFC에 명세

`RFC`
* 국제인터넷표준화기구(IEFT)에서 만듦

`HTTP`
* Request: ex) GET / HTTP / 1.1
* Response: 프로토콜 버전, HTTP 상태 코드(200 OK), 데이터 형식과 길이
* 버전
    1. v0.9 : 서버에서 단순히 읽기 기능
    2. v1.0 : GET, HEAD, POST
    3. v1.1 : OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

`DNS`
* 도메인 네임 서버
* 클라이언트가 DNS에 url을 보내면 DNS는 IP를 보내줌

## 인터넷 거버넌스

* 국제인터넷주소관리기구(ICANN): DNS와 IP주소, 프로토콜 번호 관리
* 인터넷할당번호관리기관(IANA): 사용자에게 인터넷 주소할당, DNS Root Zone 관리
* 인터넷소사이어티(ISOC): 인터넷 기술의 국제적인 협력을 촉진시키는 비영리 기구
* IETF: 인터넷 운영 관리 개발을 협의하고 프로토콜과 구조를 분석하는 인터넷 표준화 기구
* IESG: 인터넷의 기술적인 문제를 해결
* IAB: 인터넷의 방침이나 장기적인 기획 및 기술 정책 등을 심의
* 월드와이드웹컨소시엄(W3C): 웹 브라우저, 웹 서버 표준화 기구
* 국제전기통신연합(ITU): 인터넷에 영향을 미치는 관세 문제



# 웹 해킹 기초

웹 해킹 발전 배경
1. 1990년대 중반 방화벽 및 IDS 같은 보안 장비
2. 닷컴 열풍이 불고 웹 취약점 연구도 진행
3. 2000년 중반 거의 모든 시스템이 방화벽으로 80번 포트(HTTP)만 열림
4. 이에 따라 시트템과 네트워크 해킹보다 웹 해킹을 더 많이 연구


해킹 과정
1. `공격대상선정`: 주로 방문자가 많은 / 도메인을 모두 검색 후 최약한 곳
2. `정보수집`: 개발 언어, 기능, 서버 종류 확인 / 최약점이 가장 많고 영향력이 큰곳(게시판, 자료실) / 웹 사이트 디렉토리 구조
3. `취약점분석`: 
4. `공격`
5. `Report, Defacement, 흔적제거`

intercept 설정 해제

검색엔진을 이용한 정보 수집
* sie: 특정 도메인 지정
* filetype: 특정 파일 타입
* link: 링크에 특정 문자가 포함
* cache: 특정 검색어에 해당하는 캐시된 페이지
* intitle: 페이지 제목에 특정 문자가 포함
* inurl: 페이지 url에 특정 문자가 포함

`OWASP Top 10`
* 웹 취약점을 공유하는 사이트



# 인증 기술과 접근 통제

`인증기술`
1. 
2. 가지고 있는것
3. 생체 인증
4. 위치하는 곳


# SQL인젝션 공격

SQL 구분 **기본적인 문법**
* DML(조작)
* DDL(정의)
* DCL(지시)

SQL 공격 방법
* 



# XSS 공격


크로스 사이트 요청 변조 코드 작성: 피해자가 다른 사이트에 요청을 보내게 만듦




# 소스 코드 취약점 분석

블랙 박스 테스팅 : 겉만 보는것

화이트 박스 테스팅: 속을 보는것

그레이 박스 테스팅: 속, 겉 보는것

취약점 리스트
* 입력값 검증 취약점
* 위험한 형식의 파일 업로드에 대한 입력값 검증 취약점
* 디렉토리 입력 검증 취약점 - 상위 경로 중요한 파일 접근 가능
* 




# 웹 해커의 도구

크롬의 **개발자 도구**

버프슈트 사이트 구조
버프슈터 인크루더 - 특정 값을 범위를 바꾸어 테스트

Arcnetix - 취약점 데이터 베이스를 사용해 취약점을 확인




# SNS 보안 

스파이 웹어
에드웨어
다운로더 
랜섬웨어
...


피싱 - 가짜 사이트를 진짜 처럼해서 아이디 비번 얻음

이블 트윈 - 가짜 sns를 만들어서 진짜인것 처럼






# 웹 & 웹서버 보안

## 사용자 인증 측면에서

* 안전한 패스워드 만들기 - 복잡한 비밀번호, 암호화 엑셀에 저장
* 공인인증서 - 공개키 기반 구조, 패스워드보다 강력

## 아파치 보안

리눅스 환경에서 사용하는 걸로 가정

취약점
* 디렉토리 리스팅 
* FollowSymLinks

```shell
dpkg --configure -a # DPKG 설정 파일 세팅(아마 안해도 될듯)
apt-get install apache2 # 아파치 설치
systemctl start apache2 # 아파치 시작
ps -ef | grep apache2 # 아파치 프로세스 보기

# localhost 접속하면 됨

vi apache2.conf # 아파치 설정파일 확인

# /etc/apache2/ports.conf 에서 포트 정보 볼수 있음
# /etc/apache2/sites-available/000-default.conf 아파치 홈 디렉토리 설정
# /etc/apache2/mods-available/dir.conf 기본문서 설정(DirectoryIndex으로)
# apache2.conf에서 Options에 Indexes가 설정되면 디렉터리 리스팅함
# 디렉토리 리스팅이란 하위 디렉토리 및 파일을 전부 볼 수 있는것 > 취약점
# /var/www/html에 test 디렉터리를 생성하여 접속하면 하위 파일을 볼수있음

systemctl restart apache2 # 설정 수정하고 재시작

ln -s /etc /var/www/html/etc # FollowSymLinks 설정 확인
# FollowSymLinks 활성화되면 url과 서버 dir 일치 > 취약점

vi /var/log/apache2/access.log # 아파치 접속 로그 확인
# /etc/apache2/sites-available/000-default.conf 에서 로그 형식 설정 가능

# setEnvIf ?????????????????
# dontlog ???????????????????

# /var/log/apache2/error.log에서 에러 로그 확인
```





# 보안 정책, 조직, 솔루션

`보안 정책 (피라미드)구조`
* 정책
* 지침
* 절차

예를 들어
* 규정(정책)-세칙(지침)-지침(지침)-절차(절차)

보안 정책 구분
* regulatory : 규칙으로 지켜야 할 정책
* advisory : 정책이 없을 때 지키도록 '권유'하는 정책
* informative : 어떠한 정보나 사실을 알리고자 하는 목적의 정책

보안 수준에 따라 
* Security Policy : 상위 관리자가 작성, 5~10쪽, 보호하는 자산, 역할 및 책임
* Standards : 일반적으로 지켜야할 보안 사항
* Baselines : 기본 적인 
* Guidelines : 특정 상황에서
* Procedures : 가장 하위 문서, 각각의 절차에 대한 세부 내용(메뉴얼)

`ISO 27001`
* 가장 널리 사용되는 정보보호 관리체계
* 


---
layout: post
title: "[3학년2학기]빅데이터보안"
order: 20
---

중간고사
- RBAC


# 인터넷

멀리 떨어진 대학 연구소에 정보 전달 용도로 시작

TCP/IP 프로토콜 기반

`프로토콜`
* 통신 규칙과 방법에 대한 약속 또는 규약
* 3가지 요소 - 구문(Syntax), 의미(Semantics), 순서(Timing)
* TCP/IP(Transmission Control Protocol/Internet Protocol)
* TCP/IP는 RFC라는 문서를 통해 공개(https://www.ietf.org/rfc)

`HTTP`
* v0.9 : 서버에서 단순리 읽기 기능
* v1.0 : GET, HEAD, POST
* v1.1 : OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT


# SQL인젝션 공격

SQLite로 실습함




# 웹 & 웹서버 보안

## 사용자 인증 측면에서

* 안전한 패스워드 만들기 - 복잡한 비밀번호, 암호화 엑셀에 저장
* 공인인증서 - 공개키 기반 구조, 패스워드보다 강력


# 웹 & 웹 서버 보안

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


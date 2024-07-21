---
layout: post
title: "[Ubuntu]ssh 연결"
order: 30
---

# ssh란

ssh는 안전하게 다른 컴퓨터의 터미널에 연결하는 기술이다. 연결이 되는 서버는 ssh 서버를 설치해야 하고, 연결을 하는 클라이언트는 open ssh를 설치한다. 


# ssh 설치

## ssh 서버 설치하기

서버는 우분투 22.04 기준으로 한다. 우분투 서버 버전으로 설치를 했다면 기본으로 설치되었을 것이다. 

```sh
# apt 업데이트
sudo apt update

# openssh-server 설치
sudo apt install openssh-server

# ssh 서버의 실행 상태를 확인
sudo systemctl status ssh
```

## 클라이언트 ssh 설치하기 



# ssh 연결

클라이언트 터미널에서 아래를 입력한다.

```sh
# 기본 - 포트 22
ssh {호스트이름}@{아이피}

# 포트 번호를 따로 설정했을 때
ssh -p {포트번호} {호스트이름}@{아이피} 
```

# 키 설정


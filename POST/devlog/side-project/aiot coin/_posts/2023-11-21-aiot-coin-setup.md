---
layout: post
title: "코인 예측 시스템 배포"
order: 2
---

# 아키텍처

오라클 클라우드의 우분투 환경에서 매일 한국시간 09시 10분마다 업비트 api로 코인들의 캔들 데이터를 수집해 예측을 수행한다. 예측 결과는 data.js라는 파일에 저장한다. 그리고 nginx를 통해 코인들의 예측결과를 보여주는 웹사이트를 호스팅한다.


# nginx

오라클 클라우드에서 nginx를 설치하고 실행
1. `sudo apt install nginx`
2. `sudo systemctl start nginx`
3. `sudo iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT`

그리고 경로 설정한다. 
2. `/etc/nginx/sites-available/default`에서 `location url경로 {root 컴퓨터경로}` 추가
3. `sudo usermod -aG ubuntu www-data` www-data(nginx)를 ubuntu(사용자 그룹)에 추가시켜 접근가능하게
4. `sudo systemctl restart nginx`

# 도메인

1. 가비아에서 도메인을 구매하였다
2. 가비아 > 도메인연결 > 설정 > 레코드 수정
3. 약 20분간 기다렸다가 접속하면 적용됨

|타입|호스트|값/위치|TTL|우선순위|서비스|
|:---:|:---:|:---:|:---:|:---:|:---:|
|A|@|내 아이피|600||DNS 설정|
|A|www|내 아이피|600||DNS 설정|


# 서버 시간 ntp

ntp는 Network Time Protocol의 약자로 네트워크를 통해 시스템의 시간을 동기화하는 프로토콜이다. UTP시간을 사용했으며 0시가 한국시간으로 9시이다.

1. 설치 `sudo apt install ntp`
2. 작동하는지 확인 `ntpq -p`


# cron으로 정적 사이트 생성

cron이란 특정 작업을 특정 시간에 수행하게 해주는 스케줄러와 같다. 아래 크론탭에 작성한 명령은 매일 0시 10분(한국시간으로 9시 10분)에 프로젝트 폴더로 cd하고 coin_predict.py를 실행하고, 이때 로그나 에러 출력을 data.log에 저장한다는 것이다. 왜 프로젝트의 코드가 있는 곳으로 cd를 하냐면 파이썬 내부 코드는 상대경로를 사용하기 때문에 cd로 프로젝트 폴더로 이동한 것이다.

1. `crontab -e`로 편집기를 연다
2. 그리고 이것을 추가한다 `10 0 * * * cd /home/ubuntu/aiotcoin/surge-coin-predictor && /usr/bin/python3 /home/ubuntu/aiotcoin/surge-coin-predictor/coin_predict.py > /home/ubuntu/aiotcoin/surge-coin-predictor/web/coin/data.log 2>&1`
3. `sudo service cron restart`

여기서 cron을 이용해 매일 정적사이트를 생성한다. cron은 매일 coin_predict.py을 실행하는데 이것을 실행시키면 업비트 API로 모든 잡코인의 현재부터 200일 이전까지의 데이터를 받아와 예측을 하고 자바스크립트 파일을 생성한다. 여기서 데이터 베이스를 사용할 수도 있었지만 정적 사이트 생성이 가장 서버 부담이 적다는 판단을 하였다.
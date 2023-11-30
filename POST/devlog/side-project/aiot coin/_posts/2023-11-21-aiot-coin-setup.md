---
layout: post
title: "코인 예측 서비스 여러 설정들"
order: 2
---

잡코인의 가격 상승을 예측하는 모델 서비스이다. 

# 아키텍처

오라클 클라우드의 우분투 환경에서 매일 한국시간 09시 10분마다 업비트 api로 타겟 코인들의 캔들 데이터를 받아와 예측을 수행한다. 예측 결과는 data.js라는 파일에 자바스크립트 문법으로 저장한다. 그리고 nginx를 통해 코인들의 예측결과를 보여주는 웹사이트를 호스팅한다.

# 도메인

1. 가비아에서 도메인 tawkor.xyz 구매
2. 도메인연결 > 설정 > 레코드 수정
3. 약 20분간 기다렸다가 접속하면 적용됨

|타입|호스트|값/위치|TTL|우선순위|서비스|
|:---:|:---:|:---:|:---:|:---:|:---:|
|A|@|내 아이피|600||DNS 설정|
|A|www|내 아이피|600||DNS 설정|


# 서버 시간 ntp

매일 09시 10분마다 업비트로부터 데이터를 받아와야하는데 서버시간이 현실 시간과 달라서 ntp를 설치했다.

1. 설치 `sudo apt install ntp`
2. 작동하는지 확인 `ntpq -p`

# 매일 파이썬 작동 cron

1. `crontab -e`에서 편집기 열어서 아래 추가
1. 이거 추가 `10 0 * * * cd /home/ubuntu/aiotcoin/surge-coin-predictor && /usr/bin/python3 /home/ubuntu/aiotcoin/surge-coin-predictor/coin_predict.py > /home/ubuntu/aiotcoin/surge-coin-predictor/web/coin/data.log 2>&1`
    * 매일 0시 10분에 프로젝트 폴더로 cd하고 coin_predict.py를 실행한다. 이때 로그나 에러 출력을 data.log에 저장한다.
    * 파이썬 내부 코드는 상대경로를 사용하기 때문에 cd로 프로젝트 폴더로 이동한 것이다.
1. `sudo service cron restart`


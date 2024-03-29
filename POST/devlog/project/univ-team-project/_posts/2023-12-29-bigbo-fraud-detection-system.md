---
layout: post
title: "모의 결제 시스템(빅데이터보안)"
order: 1
---

깃허브: <https://github.com/ijun17/credit-fraud-detection-system>

# 개요

빅데이터보안 수업에서 보안과 관련된 주제 중에 "핀테크"를 선택해 프로젝트를 진행하였다. 처음에 핀테크와 관련된 보안으로 이상 거래 탐지 모델을 만들다가 조금 부족하다고 느껴 HTTPS, 전자서명을 추가하여 모의 결제 시스템을 만들었다. 사용자는 카드앱에서 로그인을 하여 결제를 할 수 있다. 만약 중간에서 부적절한 작업(이상 결제, 잘못된 전자서명 등)이 일어나면 이를 차단하는 기능이 있다. 카드앱은 pwa로 만들었으며, 서버는 이상 거래 탐지 모델을 실행하기 위해 파이썬으로 작동되는 플라스크로 만들었다. 

# 이상 거래 탐지 모델

<https://www.kaggle.com/code/janiobachmann/credit-fraud-dealing-with-imbalanced-datasets>

팀원 모두 ml에 대한 지식이 부족하여 캐글에 있는 위 링크의 노트북을 팔로우업했다. 위 코드는 Credit Card Fraud Detection 데이터셋을 사용하고 있다. 데이터셋은 개인정보들을 수치로 변환해서 가렸는데 정확한 방법은 모르겠다. 총 31개의 피쳐 중 이해할 수 있는 정보는 거래 시간, 거래량, 그리고 이상거래인지(1,0)이다. 우리가 맞추어야 할 것이 이상거래인지인데 전체 데이터에서 이상거래(1)인 비율이 매우 낮다. 따라서 처음에 언더샘플링으로 트레인을 하는데 성능이 낮게 나와 다시 오버샘플링을 했다. 모델은 h5 형식으로 추출했다.

# HTTPS

cert 봇으로 인증서를 발급받아 HTTPS를 적용하였다. 

# 전자서명

전자서명이란 전송하는 메시지가 서명자가 작성한 것인지와 위변조되지 않았음을 검증하는 기술이다. 이 시스템에서는 공개키 암호화 방식으로 전자서명을 작성한다. 카드앱에서 로그인 과정에서 서버로 공개키를 전송하고, 로그인이 성공했다면 이후에는 결제를 할 수 있다. 서버로 결제 정보를 보낼 때, 결제정보와 개인키로 생성된 전자서명을 같이 보낸다. 서버에서는 공개키로 인증된 사용자인지와 메시지가 위변조되었는지를 검증한다. 여기서 서명 알고리즘은 RSA-PSS를 사용했다. 이 알고리즘은 먼저 메시지를 해싱하고, 해싱된 문자열에 무작위 솔트를 붙여 개인키로 암호화하여 전자서명을 생성한다. 무작위 솔트를 사용하기 때문에 메시지가 동일해도 서명을 할 때마다 전자서명이 달라진다. 그러나 전자서명은 재전송 공격에 취약할 수 있는데, 공격자가 전송된 메시지와 전자서명을 탈취해서 서버로 똑같은 내용을 다시 보내면 결제가 이루어진다. 하지만 이는 쉽게 해결할 수 있다. 메시지에 단 한번만 사용되는 값(예를 들어 순서 번호)를 포함시키는 방법이다. 

클라이언트에서는 자바스크립트 Web Crypto API를 사용했고, 서버에서는 파이썬 cryptography 라이브러리를 사용했다. 

```js
//javascript
const signature = await subtleCrypto.sign(
    {
        name: 'RSA-PSS',
        saltLength: 32,
    },
    this.keyPair.privateKey,
    data
);
```

```py
#python
public_key.verify(
    signature,
    data.encode('utf-8'),
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=32
    ),
    hashes.SHA256()
)
```
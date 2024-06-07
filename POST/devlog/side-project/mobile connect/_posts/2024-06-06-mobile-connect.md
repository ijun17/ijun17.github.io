---
layout: post
title: "[Connect]모바일 기기 원격 접근 시스템"
order: 1
---

깃허브: <https://github.com/ijun17/mobile-connect> 

이 프로젝트는 모바일앱프로그래밍 수업의 최종 프로젝트이다. connect(또는 mobile-connect)는 모바일 기기(안드로이드)의 파일에 원격을 접근하는 시스템이다. `하이브리드 앱`으로 개발했으며 사용자는 앱 또는 웹으로 이 시스템에 접근할 수 있다. 앱으로 접근된 기기는 다른 기기에게 자신의 파일 정보를 상대에게 전송할 수 있지만, 웹으로 접속한 기기는 다른 기기에게 파일을 보낼 수 없다. 이는 사실 어느정도 당연한 말이다. 웹은 보안 정책에 의해 로컬 파일의 사용자 동의 없이 쉽게 접근할 수 없다. 하지만 하이브리드 앱은 웹과 네이티브가 `브리지`를 통해 직접적인 통신하기 때문에 마음대로 파일에 접근할 수 있다. 물론 앱을 처음 실행시킬때 나오는 파일 접근에 대한 권한 요청을 사용자가 수락해야 한다. 

두 기기의 대한 연결은 `WebRTC`를 사용해 P2P로 연결된다. 서버를 거치지 않기 때문에 카카오톡, 클라우드를 거치는 것보다 보안에 안전하다. WebRTC를 실시간 통신을 위한 UDP 기반의 프로토콜이자 자바스크립트 API이다. 여기서 `시그널링 서버`란 것이 사용되는데 이는 두 피어를 매칭해주는 서버이다. 두 피어가 매칭이 된 이후엔 시그널링 서버가 필요없다.   

# 과제 선정 이유

이 과제를 선정한 이유는 다음과 같다.

1. 캡스톤 프로젝트에서 하이브리드 앱을 개발하여 이를 미리 공부하고 싶다.
2. 하이브리드 앱이 네이티브 앱보다 느리다는데 왜 그런지 알고싶다.
3. 나에게 익숙한 웹을 프로젝트에 적용하고 싶었다.

# 결과

먼저 하이브리드 앱은 네이티브에 비해 그렇게 느리지 않았다. 예전에는 잘 모르겠지만, 지금은 모바일 기기 발달과 브라우저 성능 향상으로 인한 이유인 것 같다. 그러나 브리지 입출력은 문자열이나 숫자로 이루어지는데, 만약 대용량 파일을 다루는 앱이라면 하이브리드 앱은 부적절한 것 같다. 내 생각에 브라우저에서 가능한 일은 하이브리드 앱으로 충분히 가능하다 생각한다. 토스 앱의 경우 하이브리드 앱으로 개발되었다고 알고 있는데, 메인 화면은 네이티브이고 나머지 대부분의 화면은 웹뷰라고 들었다(잘못된 정보일 수도 있다). 토스 앱을 실행시키면 메인 화면은 부드럽게 사용되는데, 주식 화면에 경우 애니메이션이 끊겨서 나타난다. 이게 웹뷰여서 그런지 아니면 통신량이 많아서 그런지 잘 모르겠지만 어느정도 한계가 있는걸까?

데이터
WebRTC의 경우 UDP 기반의 프로토콜이기에 속도가 빠르지만 안정성은 TCP보다 낮다. 모바일 기기에서 다른 기기로 데이터를 전송할 때 용량이 MB단위부터는 속도가 느렸다.. 또한 
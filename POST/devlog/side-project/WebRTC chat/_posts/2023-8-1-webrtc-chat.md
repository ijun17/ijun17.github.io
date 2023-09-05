---
layout: post
title: "WebRTC chat 프로젝트 개요"
order: 0
---

이 프로젝트는 WebRTC를 공부하기 위해 만들었다. 기능은 아래와 같다.
* 두 사용자가 WebRTC datachannel로 메시지를 송수신한다.
* 두 사용자를 매칭하는 방식은 한 사용자가 방을 만들고 다른 사용자는 그 방에 들어가는 것이다.

프로젝트의 깃허브 링크와 채팅 사이트 주소이다.
* [깃허브](https://github.com/ijun17/WebRTC-chat)
* [WebRTC chat](https://ijun17.github.io/WebRTC-chat) 

# WebRTC란

> WebRTC는 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API이다. 

두 브라우저가 p2p로 연결이 되려면 아래에 두 가지 정보를 서로 교환해야 한다.

`SDP(Session Description Protocol)`
* 미디어 정보를 담고 있다.
* PeerConnection.createOffer() 또는 PeerConnection.createAnswer(상대 SDP)로 생성할 수 있다.

`ice candidate`
* 연결가능한 네트워크 후보
* setLocalDescription(자신의 SDP)가 실행되면 생성된다.(한개 이상)
* onicecandidate 이벤트로 얻을 수 있다.


# 시그널링 서버

시그널링 서버란 두 피어의 연결에 필요한 정보를 교환하기 위한 서버이다. 연결을 할 때만 필요하고 연결이 수립된 이후에는 사용하지 않는다. 시그널링 서버는 node.js로 개발했으며, 클라우드타입에 호스팅하였다.

시그널링 서버를 통해 두 정보를 교환하는 과정은 아래와 같다.(두 피어를 host와 guest로 구분하겠다.)
1. **host:** 서버에 방을 생성한다는 신호 전송
1. **host:** createOffer()로 SDP 생성
1. **host:** 자신의 SDP로 setLocalDescription(SDP) 실행
1. **host:** 자신의 SDP를 시그널링 서버에 전송
1. **(계속)host:** 이후 생성되는 ice candidate를 전부 서버에 전송
1. **guest:** 방에 들어간다는 신호를 서버에 전송
1. **guest:** 서버로부터 받은 상대의 SDP로 setRemoteDescription(SDP)하면 자신의 SDP가 생성됨
1. **guest:** setLocalDescription(SDP)로 자신의 SDP를 저장
1. **guest:** 자신의 SDP를 시그널링 서버에 전송
1. **(계속)guest:** 이후 생성되는 ice candidate를 전부 서버에 전송
1. **(계속)host, guest:** 서버로부터 받은 상대의 ice candidate로 addIceCandidate(ice candidate) 실행
1. **host:** 서버로부터 받은 상대의 SDP로 setRemoteDescription(SDP) 실행
1. 이후 문제가 없다면 두 피어가 연결이 수립됨
1. 서버와 연결해제 

시그널링 서버는 위에 기본적인 기능 외에도 아래에 추가적인 기능도 필요하다.
* 방이 생성되면 host에게 방번호 전송
* 연결이 수립되면 방을 삭제
* guest의 상태가 이상하면 연결해제
* host의 상태가 이상하면 방 삭제
* 방에 번호를 할당
* 등등 

---
layout: post
title: "[Level10] 자바스크립트 WebRTC로 멀티플레이 구현하기(미구현)"
order: 5
---

# WebRTC란

WebRTC는 브라우저에서 실시간 통신을 구현하는 데 사용되는 기술이다. WebRTC를 사용하면 브라우저 간에 오디오, 비디오 및 데이터를 교환할 수 있습니다. 두 클라이언트가 텍스트를 공유하는 방법은 다음과 같습니다.

두 클라이언트 간의 WebRTC 연결을 설정합니다.

```js
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};
const peerConnection = new RTCPeerConnection(configuration);
```

클라이언트 A에서 텍스트를 입력하고, 텍스트가 변경될 때마다 데이터 채널을 통해 클라이언트 B에 전송합니다.

```js
const dataChannel = peerConnection.createDataChannel('textChannel');
dataChannel.addEventListener('open', () => {
  // 데이터 채널이 열리면, 클라이언트 A에서 텍스트를 입력할 수 있습니다.
  const input = document.querySelector('input[type="text"]');
  input.addEventListener('input', (event) => {
    const text = event.target.value;
    dataChannel.send(text);
  });
});
```
클라이언트 B에서는 데이터 채널을 수신 대기하고, 데이터를 수신하면 텍스트를 출력합니다.
```js
peerConnection.addEventListener('datachannel', (event) => {
  const dataChannel = event.channel;
  dataChannel.addEventListener('message', (event) => {
    const text = event.data;
    // 텍스트를 출력합니다.
    const div = document.createElement('div');
    div.textContent = text;
    document.body.appendChild(div);
  });
});
```
위 코드를 참고하여 두 클라이언트 간에 WebRTC를 사용하여 텍스트를 공유할 수 있습니다. 이 코드는 간단한 예제이며, 실제 애플리케이션에서는 보안 등 다양한 고려사항이 필요할 수 있습니다.
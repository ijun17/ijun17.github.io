---
layout: post
title: "소켓 서버 없이 게임 테스트하기"
order: 3
---

# 개요

- 개발 3주차에 퀴즈 진행을 구현해야 했습니다.
- 그러나 아직 서버는 완전히 개발되지 않은 상황이었습니다.
- 따라서 소켓을 모킹하여 게임을 테스트하기로 했습니다.
- 학습 곡선이 없고 커스텀하기 쉽도록 `SocketMock` 클래스를 직접 만들기로 결정했습니다.

# 설계

## 지금 상황은?

- 현재 socket.io를 `SocketService`라는 클래스로 래핑하여 사용하고 있습니다.
- 그리고 `SocketService`는 싱글톤으로 사용됩니다.
- 서버와 연결할 때 `SocketService`의 `createRoom` 또는 `joinRoom` 함수를 호출합니다.

## 언제 어떻게 모킹할까?

- pin 번호로 결정
  - `joinRoom` 함수는 접속할 게임방의 pin 번호를 매개변수로 받습니다.
  - 미리 약속된 pin 번호가 들어온다면 웹소켓을 모킹합니다.
- SocketMock과 SocketService
  - `SocketMock`은 socket.io와 유사한 인터페이스를 가지고 있습니다.
  - `SocketService`를 제외한 클라이언트 코드는 소켓이 모킹되어 있는지 알 수 없습니다.
  - `SocketMock`의 자식 클래스는 각자의 시나리오를 가지고 있습니다.

## 다이어그램

- 예시
  1. GamePage에서 `test-chat` PIN으로 joinRoom()
  2. SocketService는 mock-map에 `test-chat`이 존재하는지 확인
  3. mock-map에 `test-chat`이 존재하므로 SocketMockChat을 가져옴

![소켓 목 다이어그램](https://github.com/user-attachments/assets/d9af72bf-4463-44b2-8116-0457a113b2cb)

# 구현

## SocketInterface

SocketInterface는 타입 스크립트로 정의되는 타입이며, SocketService가 socket.io에서 사용하는 변수/함수의 집합입니다. 아래 동일한 함수/변수를 SocketMock 클래스에서 지원해야 합니다.

```jsx
type SocketInterface = {
  connected: boolean;
  id: string;
  emit: <T extends SocketEvent>(event: T, data: SocketDataMap[T]['request']) => void;
  on: <T extends SocketEvent>(event: string,callback: (data: SocketDataMap[T]['response']) => void) => void;
  off: <T extends SocketEvent>(event: string,callback: (data: SocketDataMap[T]['response']) => void) => void;
  onAny: <T extends SocketEvent>(callback: (event: T, data: SocketDataMap[T]['response']) => void) => void;
  disconnect: () => void;
};
```

## SocketMock

SocketMock은 SocketInterface의 변수/함수를 지원해야 합니다.

중요한 것은 `emit`, `on`, `off`입니다.

- `emit` : 클라이언트 요청에 따른 서버 비즈니스 로직을 구현해야 합니다.
  - 서버 비즈니스 로직을 어느 정도까지 비슷하게 구현할지 결정해야 합니다.
  - 어느 정도로 구현하느냐에 따라 실제 서버와 똑같이 동작할 수 있습니다.
  - 현재는 chatMessage, updatePosition, updateRoomOption, updateQuizSet이 구현되어 있습니다.
- `on`, `off` : 클라이언트에서 이벤트 리스너를 등록하고, 해제할 수 있어야 합니다.
  - listenerSet 속성을 만들어 이벤트 별로 리스너를 관리합니다.
  - on을 실행하면 리스너를 추가하고, off를 실행하면 리스너를 제거합니다.

## SocketMock 예시

SocketMockLoadTest는 SocketMock을 상속받고 시나리오를 정의합니다.

```jsx
import { SocketMock } from "../SocketMock";

export default class SocketMockLoadTest extends SocketMock {
  constructor() {
    super();
    // 100명의 더미 플레이어를 생성
    this.createDummyPlayer(100);
    // 5초동안 채팅 및 움직임
    this.performenceTest([this.chatRandom(5, 1), this.moveRandom(5, 1)]);
  }
}
```

## mock-map

mockMap에는 미리 약속된 pin과 SocketMock 클래스가 key-value로 존재합니다. 여기에 속한 pin으로 접속할시 그에 해당하는 SocketMock을 불러옵니다.

```jsx
import SocketMockChat from './SocketMockChat';
import SocketMockLoadTest from './SocketMockLoadTest';
import SocketMockLoadTestOnlyMove from './SocketMockLoadTestOnlyMove';
import SocketMockLoadTestWithQuiz from './SocketMockLoadTestWithQuiz';
import SocketMockNextQuiz from './SocketMockNextQuiz';
import SocketMockStartEnd from './SocketMockStartEnd';
import SocketMockStartGame from './SocketMockStartGame';

const mockMap = {
  'test-chat': SocketMockChat, // 10명의 플레이어가 채팅을 침
  'test-start-game': SocketMockStartGame, // 게임을 시작합니다.
  'test-next-quiz': SocketMockNextQuiz, // 두개의 퀴즈를 빠르게 진행합니다.
  'test-load': SocketMockLoadTest, // 100명의 플레이어가 채팅과 움직임을 만듭니다.
  'test-load-with-quiz': SocketMockLoadTestWithQuiz, // 위와 같은 부하 상황에서 퀴즈를 진행합니다.
  'test-start-end': SocketMockStartEnd, // 퀴즈를 시작하고 종료합니다.
  'test-load-only-move': SocketMockLoadTestOnlyMove // 200명의 플레이어가 움직입니다.
} as const;

export default mockMap;
```

## SocketMock의 유틸 함수

SocketMock은 게임 시나리오를 손쉽게 구현할 수 있도록 여러 유틸함수를 포함합니다.

- `emitServer`: 서버 측 이벤트 발생 함수입니다.
- `delay`: n초 간 지연시킵니다.
- `log`: 채팅에 로그를 남깁니다.
- `random`: 시드 기반 랜덤함수입니다.
- `progressQuiz`: 퀴즈를 진행합니다.
- `createDummyPlayer`: 더미 플레이어를 생성합니다.
- `chatRandom`: 모든 플레이어가 주기적으로 채팅을 보냅니다.
- `moveRandom`: 모든 플레이어가 주기적으로 움직입니다.
- `performenceTest`: Performence API로 성능을 측정합니다.

# 현재까지 구현한 SocketMock(일부)

url은 언제든지 비활성화될 수 있습니다!

- <https://quizground.duckdns.org/game/test-load-with-quiz>
- <https://quizground.duckdns.org/game/test-load>
- <https://quizground.duckdns.org/game/test-load-only-move>

![200명의 플레이어가 테스트하는 화면](https://github.com/user-attachments/assets/d134e1b4-afde-4796-820b-d510b6749d1f)

200명의 플레이어가 테스트하는 화면

# 결론

- 서버가 있는 것처럼 전체적인 게임 진행 상황을 테스트할 수 있습니다.
- 게임 성능을 테스트를 할 수 있습니다.
- 게임 비즈니스 로직이 변경될 때 빠르게 새로운 비즈니스 로직을 적용할 수 있습니다.
- 페어 프로그래밍 상황에서 pin 번호로 각자 원하는 시나리오를 실행할 수 있습니다.

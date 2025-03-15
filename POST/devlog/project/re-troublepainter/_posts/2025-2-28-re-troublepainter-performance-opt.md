---
layout: post
title: "그림꾼 드로잉 성능 최적화"
order: 2
---

네이버 부스트캠프 Web30팀의 **방해꾼은 못 말려** 프로젝트를 클론하여 **리팩토링**하는 과정을 다룹니다.

- [기존 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web30-stop-troublepainter)
- [리팩토링 프로젝트 깃허브 링크](https://github.com/boostcampwm-2024/refactor-web42-stop-troublepainter)

# 개요

Playwright와 CDP로 드로잉 성능을 측정한 결과는 아래와 같다. 지표를 향상하기 위해 다양한 부분에서 최적화를 할 것이다.

| 지표 | 그림꾼(3명 평균) | 구경꾼(2명 평균) |
| :---: | :---: | :---: |
| **LayoutCount** | 443.33 | 22 |
| **RecalcStyleCount** | 497.33 | 7.5 |
| **LayoutDuration** | 0.04107 | 0.0082345 |
| **RecalcStyleDuration** | 0.09295 | 0.003816 |
| **ScriptDuration** | 1.65815 | 0.290524 |
| **TaskDuration** | 7.96949 | 1.4498015 |
| **TaskOtherDuration** | 2.10131 | 1.1472135 |
| **DevToolsCommandDuration** | 4.07601 | 0.0000135 |
| **ThreadTime** | 5.26321 | 0.801016 |
| **ProcessTime** | 26.82355 | 18.878024 |
| **JSHeapUsedSize** | 15709316 | 11346870 |
| **JSHeapTotalSize** | 33177600 | 12861440 |

# 잉크에 의한 리렌더링 최적화

그림꾼과 방해꾼은 자신의 잉크만큼 그림을 그릴 수 있다. 잉크의 잔량은 캔버스의 우측 하단에 표시된다. 문제는 그림을 그릴 때마다 잉크의 잔량을 계산하고 리렌더링을 한다는 것이다. 따라서 **잉크 잔량은 계속 계산하되 리렌더링에만 스로틀링**을 적용하였다. 

throttleSetInkRemaining는 setInkRemaining에 500ms의 스로틀링을 적용한 함수이다. inkRef로 실제 잉크 잔량을 저장하며, 만약 잉크가 0이하라면 바로 잉크 잔량 상태를 변경한다.

```js
const [inkRemaining, setInkRemaining] = useState(maxPixels);
const inkRef = useRef(inkRemaining);

const throttleSetInkRemaining = useCallback(
    (fn: (p: number) => number) => {
        if (inkRemaining === 0) return;
        const nextInk = fn(inkRef.current);
        if (nextInk <= 0) {
        setInkRemaining(0);
        } else if (inkRef.current === inkRemaining) {
        setTimeout(() => {
            if (inkRef.current > 0) setInkRemaining(inkRef.current);
        }, 500);
        }
        inkRef.current = nextInk;
    },
    [inkRemaining, inkRef],
);
```

# 잉크 부족 토스트 메시지 최적화

만약 잉크가 없는데 그림을 그릴 경우 잉크가 없다는 토스트 메시지가 나온다. 이 토스트 메시지에도 스로틀링을 걸었다. lodash의 throttle을 사용해 3000ms의 스로틀링을 걸었다.

```js
const showInkToast = useCallback(
    throttle(() => {
        actions.addToast({
            title: '잉크 부족',
            description: '잉크를 다 써버렸어요 🥲😛😥',
            variant: 'error',
            duration: 2000,
        });
    }, 3000),
    [actions.addToast],
);
```

# 마우스 이벤트에 스로틀링

드로잉은 mousemove 또는 mouseup 이벤트가 발생할 때 수행된다. 여기서 크롬의 경우 **mousemove 이벤트의 발생 빈도**는 모니터의 주사율에 따라 달라진다. 60HZ 모니터의 경우 보통 1초에 60번 발생하고 120HZ 모니터의 경우 1초에 120번 발생한다. 따라서 모니터 주사율 상관없도록 1초에 60번으로 스로틀링을 걸었다. 

```js
const handleDrawMove = useCallback(
    throttle((e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>) => {
    const { canvas } = getCanvasContext(canvasRef);
    const point = getDrawPoint(e, canvas);
    const convertPoint = convertCoordinate(point);

    handleInCanvas(cursorCanvasRef, convertPoint, brushSize);

    const crdtDrawingData = continueDrawing(convertPoint);
    if (crdtDrawingData) {
        void drawingSocketHandlers.sendDrawing(crdtDrawingData);
    }
    }, 16),
    [continueDrawing, convertCoordinate, isConnected],
);
```

참고로 W3C에 따르면 mousemove 이벤트의 발생 빈도는 브라우저 구현에 따라 달라진다고 한다. <https://www.w3.org/TR/uievents/#event-type-mousemove>

# CRDT 메시지를 배치로 전송(롤백)

다른 사람에게 자신이 그림을 그렸다는 것을 알리기 위해 CRDT 메시지를 전송해야 한다. 이 CRDT 메시지는 드로잉이 발생할 때 전송되므로, 보통 1초에 60번을 보낸다고 생각하면 된다. **TCP 오버헤드**를 줄이기 위해 묶어서 보내면 성능이 개선될 것이라 예상을 하였다. 100ms로 간격으로 배치를 했고, 하나의 메시지에 6개 정도의 드로잉 데이터가 같이 보내지게 되었다.

```jsx
import type { CRDTMessage } from '@troublepainter/core';
import { useSocketStore } from '@/stores/socket/socket.store';

const messages: CRDTMessage[] = [];

export const drawingSocketHandlers = {
  // 드로잉 데이터 전송
  sendDrawing: (drawingData: CRDTMessage) => {
    const socket = useSocketStore.getState().sockets.drawing;
    if (!socket) throw new Error('Socket not connected');

    if (messages.length === 0) {
      setTimeout(() => {
        socket.emit('draw', { drawingData: messages });
        messages.length = 0;
      }, 100);
    }

    messages.push(drawingData);
  },
};
```

묶어서 보내진 드로잉 데이터를 한번에 캔버스에 그리면 뚝뚝 끊기게 보이므로 **requestAnimationFrame**으로 부드럽게 보이도록 한다.

```jsx
    const { isConnected } = useDrawingSocket({
      onDrawUpdate: (response) => {
        if (response.drawingData) {
          let i = 0;
          // 부드럽게 렌더링
          const fn = () =>
            requestAnimationFrame(() => {
              applyDrawing(response.drawingData[i]);
              if (++i < response.drawingData.length) fn();
            });
          fn();
        }
      },
      onSubmitRequest: () => {
```

그러나 배치 적용 결과 **성능 저하가 발생**하였다… ThreadTime은 살짝 줄었으나 taskDuration이 거의 두 배 증가하였다. 무엇이 문제일까 생각을 해보았는데 CRDT 내부에는 시간 순으로 정렬된 sortedStroke란 배열이 있다. 만약 시간 순으로 중간에 삽입된다면 splice 함수로 배열 중간에 데이터를 삽입하고 캔버스를 초기화하고 처음부터 다시 그린다. 배치로 오면서 **중간에 삽입되는 빈도가 높아지고, 캔버스 리드로우가 많이 발생한게** 원인이었을까? 시간이 부족한 관계로 더 알아보진 못하고 롤백을 하였다.

# 최적화 결과 

최적화 결과로 리렌더링 횟수가 매우 줄었으며, 이에 따라 대부분의 지표에서 성능이 크게 향상되었다.

| 지표 | 구경꾼 | 그림꾼 |
| :---: | :---: | :---: |
| **LayoutCount** | 34.33 | 24 |
| **RecalcStyleCount** | 60.67 | 4.5 |
| **LayoutDuration** | 0.01695 | 0.00758 |
| **RecalcStyleDuration** | 0.01140 | 0.00114 |
| **ScriptDuration** | 0.76654 | 0.25921 |
| **TaskDuration** | 6.31876 | 1.18630 |
| **TaskOtherDuration** | 1.52217 | 0.91836 |
| **DevToolsCommandDuration** | 4.00170 | 0.00001 |
| **ThreadTime** | 3.93703 | 0.63618 |
| **ProcessTime** | 25.84286 | 18.65333 |
| **JSHeapUsedSize** | 14,710,940 | 11,255,138 |
| **JSHeapTotalSize** | 33,527,125.33 | 14,172,160 |

## 그림꾼 성능 개선율

| 지표 | 개선 전 | 개선 후  | 향상 퍼센트 |
| :---: | :---: | :---: | :---: |
| **LayoutCount** | 443.33 | 34.33 | -92.26% |
| **RecalcStyleCount** | 497.33 | 60.67 | -87.79% |
| **LayoutDuration** | 0.04107 | 0.01695 | -58.72% |
| **RecalcStyleDuration** | 0.09295 | 0.01140 | -87.74% |
| **ScriptDuration** | 1.65815 | 0.76654 | -53.77% |
| **TaskDuration** | 7.96949 | 6.31876 | -20.68% |
| **TaskOtherDuration** | 2.10131 | 1.52217 | -27.58% |
| **DevToolsCommandDuration** | 4.07601 | 4.00170 | -1.83% |
| **ThreadTime** | 5.26321 | 3.93703 | -25.19% |
| **ProcessTime** | 26.82355 | 25.84286 | -3.66% |
| **JSHeapUsedSize** | 15,709,316 | 14,710,940 | -6.37% |
| **JSHeapTotalSize** | 33,177,600 | 33,527,125.33 | +1.06% |
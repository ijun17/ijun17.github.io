---
layout: post
title: "[Level10]게임 스케줄링"
order: 6
---

이 게임은 주기적으로 많은 일을 수행해야 한다. 게임 유닛의 충돌을 판별하고, 속도에 따라 위치를 조정하고, 그것을 화면에 그려야 한다. 또한 일정 시간 지속되는 플레이어 스킬도 있으며, 몬스터의 AI도 구현해야 한다. 이러한 다양하고 복잡한 기능들을 쉽게 관리하기 위해 스케줄러를 만들었다. 


# 스케줄러 설계

이 게임의 스케줄은 크게 두 가지가 있다.

* 메인 스케줄: 물리 연산, 화면 렌더링 등 1tick(가장 작은 시간단위)마다 수행되는 가장 중요한 스케줄
* 일반 스케줄: 시작 시간, 종료 시간, 실행 시간 간격 등을 포함해 동적으로 생성되는 스케줄

여기서 일반 스케줄의 스케줄링을 하는 것이 주 문제이다.


# GameTime 클래스

GameTime 클래스는 setInterval로 100분의 1초마다 스케줄들을 실행한다. addSchedule 함수를 통해 GameSchedule를 추가시킬 수 있다. addSchedule는 초 단위의 매개변수를 받는데 이를 tick(1/fps초) 단위로 변환한다. tick이란 게임 시간의 최소 단위이며 this.tick은 현재 시각(얼마만큼의 tick이 지났는지)이다. 이를 통해 fps가 바뀌어도 스케줄이 실행되는 시간은 거의 동일하도록 하였다.

* startSec: 스케줄이 몇 초 후에 시작될 것인가
* endSec: 스케줄이 몇 초 후에 종료될 것인가
* intervalSec: 스케줄이 몇 초 간격으로 실행될 것인가
* code: 실행되는 코드
* stopCondition: 종료 조건(true를 반환하면 종료)

```js
// 시작(초), 종료(초), 실행 간격(초), 실행 코드, 종료 조건
addSchedule(startSec, endSec, intervalSec, code, stopCondition=function(){return false;}) {
    let startTick=this.tick+startSec*this.fps;
    let endTick=(endSec===undefined ? undefined : this.tick+endSec*this.fps)
    let intervalTick=(intervalSec===undefined || intervalSec===0 ? undefined : intervalSec*this.fps)
    this.scheduleList.push(new GameSchedule(startTick, endTick, intervalTick, code, stopCondition));
}
```

아래 doSchedule은 스케줄을 실행시키는 함수이다. 여기서 this.mainSchedule()은 물리 연산, 화면 렌더링 등 항상 실행되어야하는 중요한 스케줄이다. this.scheduleList는 메인 스케줄 외 스케줄을 담고 있는 연결 리스트로 map 함수를 통해 1tick마다 순회된다. 

```js
doSchedule(){
    this.mainSchedule()
    const currentTick=this.tick;
    this.scheduleList.map(function(e,i,l){if(!e.checkSchedule(currentTick))l.remove(i);})
    this.tick++;
}
```

# GameSchedule 클래스

GameSchedule 클래스는 다음과 같다. 아까 addSchedule으로 tick으로 변환된 매개변수와 실행 코드, 종료 조건을 그대로 저장한다. checkSchedule()는 현재 시각인 currentTick을 매개변수로 받아 실행 조건을 만족하면 스케줄을 실행하고, 종료조건을 만족하거나 종료시간이 되면 false를 반환한다. 

```js
class GameSchedule{
    startTick;
    endTick;
    intervalTick;
    f; // 
    stopCondition; // true를 반환하면 스케줄 삭제
    constructor(startTick, endTick, intervalTick, f, stopCondition){
        this.startTick=startTick;
        this.endTick=endTick;
        this.intervalTick=intervalTick;
        this.f=f;
        this.stopCondition=stopCondition;
    }
    checkSchedule(currentTick){
        if(this.stopCondition()||(this.endTick!=undefined&&this.endTick<currentTick)) return false;
        if(this.startTick<=currentTick){
            if(this.intervalTick!=undefined)this.startTick+=this.intervalTick;
            this.f();
        }
        return true;
    }
}
```


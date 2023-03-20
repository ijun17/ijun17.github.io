---
layout: post
title: "[Level10] 자바스크립트로 물리엔진 구현하기"
order: 2
---

# Level10 물리엔진 소개

Level10의 물리엔진은 정말 간단하다. 물체는 xywh 박스 형태이며 회전하지 않는다. 여기서 물체는 게임유닛으로 지칭한다. 게임유닛 간의 충돌은 게임에서 가장 작은 시간단위인 100분의 1초마다 한번 이루어지며, 이 사이클에서 각 게임유닛은 다른 게임유닛와 단 1번 충돌된다. 충돌 과정은 다음과 같다.

1. 충돌 감지 : 이중 for문으로 서로 겹치는 게임유닛이 있는지 확인
2. 충돌 처리 : 겹치는 게임유닛이 있다면 충돌량을 계산하여 속도와 위치를 수정

# 충돌 감지

물체간의 충돌은 앞서 말했듯이 100분의 1초마다 한번 이루어진다. 다시말해 100분의 1초마다 아래에 interact 메소드가 실행된다는 것이다. 아래 메소드는 GameWorld.js의 GameWorldLayer 클래스에 선언되었으며, 실제 사용되는 코드에서 필수적인 요소만 남겨 작성한 것이다.

```js
interact(){
    let gameUnitList=this.gameUnitList; //물체를 저장하는 배열
    let gameUnit; //물체=게임유닛
    for(let i=gameUnitList.length-1; i>0;i--){
        gameUnit=gameUnitList[i];
        for(let j=i-1; j>=0; j--)gameUnit.interact(gameUnitList[j]);
    }
}
```

물체가 겹치는지는 `unit1.interact(gameUnitList[j]);`에서 이루어진다. 이 메소드가 실행되면 아래에 isCollision 메소드가 실행되는데 `AABB`라고 익히 알려진 방법을 사용한다. 이 메소드에서 true가 반환되면 두 게임유닛이 겹쳐있다는 것이고, 다시 말해 충돌했다는 것이다. 두 물체가 충돌했다고 판단하면 그 다음 충돌 처리과정으로 넘어간다.

```js
//other 매개변수와 this는 pos(위치 x,y)와 size(크기 w,h)를 속성으로 가진다.  
isCollision(other){
    const distance=[other.pos[0]-this.pos[0], other.pos[1]-this.pos[1]]
    if(distance[0]+other.size[0]<0||distance[0]-this.size[0]>0)return false;
    if(distance[1]+other.size[1]<0||distance[1]-this.size[1]>0)return false;
    return true;
}
```

# 충돌 처리

충돌 처리과정에서 두 게임유닛의 1.속도와 2.위치를 조정한다. 속도는 충돌량을 이용해 계산하고, 위치는 물체가 겹치기 전에 딱 접해있을 시점에 좌표를 계산하여 조정한다.


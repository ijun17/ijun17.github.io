---
layout: post
title: "[Level10] 자바스크립트로 물리엔진 구현하기"
order: 2
---

# Level10 물리엔진 소개

Level10의 물리엔진은 정말 간단하다. 물체는 박스 형태이며 회전하지 않는다. 여기서 물체는 게임유닛으로 지칭한다. 게임유닛 간의 충돌은 게임에서 가장 작은 시간단위인 100분의 1초마다 한번 이루어지며, 이 사이클에서 각 게임유닛은 다른 게임유닛와 단 1번 충돌된다. 충돌 과정은 다음과 같다.

1. 충돌 감지 : 이중 for문으로 서로 겹치는 게임유닛이 있는지 확인
2. 충돌 처리 : 겹치는 게임유닛이 있다면 충돌 방향과 충돌 깊이를 계산해 속도와 위치를 수정

그리고 게임유닛은 위치(pos={x,y}), 크기(size={w,h}), 속도(vel={vx,vy})를 가진다. 그리고 앞으로 calvec이라는 메소드가 자주 등장할텐데 이는 벡터계산을 쉽게해주는 메소드이다. 이 메소드의 코드는 맨 밑장에 작성하였다.

# 충돌 감지

물체간의 충돌은 앞서 말했듯이 100분의 1초마다 한번 이루어진다. 다시말해 100분의 1초마다 충돌을 감지하기 위해 아래에 interact 메소드가 실행된다는 것이다. 아래 메소드는 GameWorld.js의 GameWorldLayer 클래스에 선언되었으며, 실제 사용되는 코드에서 필수적인 요소만 남겨 작성한 것이다.

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

물체가 겹치는지는 for문 안에 `gameUnit.interact(gameUnitList[j]);`에서 이루어진다. 이 메소드가 실행되면 아래에 isCollision 메소드가 실행되는데 `AABB`라고 익히 알려진 방법을 사용한다. 이 메소드에서 true가 반환되면 두 게임유닛이 겹쳐있다는 것이고, 다시 말해 충돌했다는 것이다. 두 물체가 충돌했다고 판단하면 그 다음 충돌 처리과정으로 넘어간다.

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

충돌 처리과정에서 두 게임유닛의 속도와 위치 단 두 변수만 수정하면 된다. 속도는 `충격량`을 이용해 계산하고, 위치는 물체가 겹치기 전에 딱 접해있을 시점에 좌표를 계산하여 조정한다.

총돌 감지 과정에서 isCollision 메소드에서 사용되었는데 그게 checkCollision 안에서 실행되는 메소드이다. 메소드의 전체적인 동작 과정은 다음과 같다. 

1. interact(월드) 
2. interact(게임유닛) 
3. checkCollsion 
4. isCollsion 
5. `getCollsionInfo` : 충돌방향, 충돌깊이 계산
6. `applyCollision` : 속도조정
7. `addPos` : 위치조정

충돌처리에 해당하는 과정은 5,6,7번에 해당한다. 7번에 해당하는 위치조정은 단순히 물체에 질량에 따라 충돌 깊이를 나누어 가지는 것이다. 다시말해 무거울수록 덜 밀려나고 가벼울수록 더 밀려나 두 물체가 겹치는 부분이 0이 된다. 여기서 위치조정은 깊게 다루지 않겠다. 실제 물리적인 효과와 틀리고, 계산을 쉽게하기위해 작성했기 때문이다. 속도 조정을 하기 위해서는 두 물체의 충격량을 계산하여야 하는데 이를 위해 충돌방향이 필요하다.  

```js
checkCollision(unit1, unit2){
    const other=unit2.body;
    if (this.isCollision(other)) { //충돌감지
        //5. 충돌방향, 충돌깊이 계산
        let collInfo = this.getCollsionInfo(other);
        //6. 속도조정
        unit1.physics.applyCollision(unit2.physics, [other.vel[0]-this.vel[0], other.vel[1]-this.vel[1]], collInfo.normal)
        //7. 위치조정
        let fixPosRatio = unit1.physics.getMassRatio(unit2.physics); 
        this.addPos(calvec(collInfo.normal,'*',-fixPosRatio[0]*collInfo.depth))
        other.addPos(calvec(collInfo.normal,'*',fixPosRatio[1]*collInfo.depth))
        return;
    }
}
```

아래에 `getCollsionInfo`는 depth(충돌 깊이=물체가 겹치는 깊이), normal(충돌 방향=겹치는 방향)를 객체로 묶어 반환하는 메소드이다. 한 물체를 기준으로 상하좌우 겹치는 부분이 가장 작은 방향이 물체가 충돌한 방향이며, 그 방향으로 겹치는 길이가 충돌 깊이이다. 충돌 방향은 속도 조정에서, 충돌 깊이는 위치 조정에서 사용된다. 

```js
//other 매개변수와 this는 pos(위치 x,y)와 size(크기 w,h)를 속성으로 가진다.  
getCollsionInfo(other){
        const distance=[other.pos[0]-this.pos[0], other.pos[1]-this.pos[1]];
        const depths=[Math.abs(distance[0]-this.size[0]),
                    Math.abs(distance[0]+other.size[0]),
                    Math.abs(distance[1]-this.size[1]),
                    Math.abs(distance[1]+other.size[1])];
        let minIndex=depths[0]>depths[1] ? 1 : 0;
        if(depths[minIndex]>depths[2])minIndex=2;
        if(depths[minIndex]>depths[3])minIndex=3;
        let normal;
        switch(minIndex){
            case 0: normal=[1,0];break; //RIGHT
            case 1: normal=[-1,0];break; //LEFT
            case 2: normal=[0,1];break; //TOP
            case 3: normal=[0,-1];break; //BOTTOM
        }
        return {depth:depths[minIndex], normal:normal};//{충돌깊이, 충돌방향}
    }
```

물체가 충돌한 방향(normal)을 계산했으면 그 방향으로의 충격량을 계산할 수 있다. 충격량 계산은 getImperse에서 이루어진다. 충격량 계산을 이해하기 위해서는 물리를 이해해야한다. getImperse에서 구해진 충격량은 addForce 메소드로 전달된다. 그러면 전달된 충격량을 질량으로 나누어 속도에 더한다. 이렇게 속도를 조정하였고, 충돌 처리가 끝났다.

```js 
applyCollision(other, rel_vel, normal){
    let imperse=this.getImperse(other, rel_vel, normal);
    if(imperse===null)return;
    this.addForce(imperse);
    other.addForce(calvec(imperse,'*',[-1,-1]))
}

getImperse(other, rel_vel, normal){
/*
rel_vel : 상대속도
inv_mass : 1/질량
velAlongNormal : 충돌면의 법선 방향으로 두 공이 서로 밀어내는 속도
bounce=COR : 탄성 계수 0~1
*/
    if(this.inv_mass===0&&other.inv_mass===0)return null;
    let velAlongNormal=normal[0]*rel_vel[0]+normal[1]*rel_vel[1];
    if(velAlongNormal>0)return null;//collsion normal =/= vector direction
    const MASS_RATIO=this.inv_mass+other.inv_mass;
    const COR=1+(this.bounce<other.bounce ? this.bounce : other.bounce);
    const COLLISION_COEF=COR/MASS_RATIO;
    return calvec(normal,'*',velAlongNormal*COLLISION_COEF);
}
```

# 마치며

사실 맨 처음 나온 interact 메소드를 제외하면 전부 게임유닛 객체안에 메소드 같지만, 사실 "유닛바디" 또는 "유닛피직스" 객체에 있는 메소드이고 "게임유닛" 객체는 이들에게 의존하는 형태이다. 당시 코드를 짜다 보니 게임유닛 객체에 너무 많은 책임이 몰려 클래스 분할을 결정했었다. 그렇게 게임유닛에서 충돌을 관리하는 부분을 분리해 유닛바디, 유닛피직스 객체를 만들었다. 이때 게임유닛에 있던 메소드와 속성들을 두 객체에 어떻게 할당해야 결합도가 낮고 응집도가 높을지 고민을 했었다. 지금의 형태가 적절한지는 모르겠지만 이 포스트를 작성하면서 코드를 다시 열어봤더니 난잡한 것은 맞는것 같다. 

그리고 위에 자주 등장하는 `calvec` 메소드는 다음과 같다.

```js
const calvec=function(v1, symbol, other){
    let v2=Number.isFinite(other) ? [other, other] : other;
    let calArray=(v1,v2, f)=>{return [f(v1,v2, 0), f(v1,v2, 1)];}
    switch(symbol){
        case '=': calArray(v1, v2, (v1, v2, i) => { v1[i] = v2[i] }); return v1;
        case '+=': calArray(v1, v2, (v1, v2, i) => { v1[i] += v2[i] }); return v1;
        case '-=': calArray(v1, v2, (v1, v2, i) => { v1[i] -= v2[i] }); return v1;
        case '*=': calArray(v1, v2, (v1, v2, i) => { v1[i] *= v2[i] }); return v1;
        case '/=': calArray(v1, v2, (v1, v2, i) => { v1[i] /= v2[i] }); return v1;
        case '+': return calArray(v1, v2, (v1, v2, i) => { return v1[i] + v2[i] });
        case '-': return calArray(v1, v2, (v1, v2, i) => { return v1[i] - v2[i] });
        case '*': return calArray(v1, v2, (v1, v2, i) => { return v1[i] * v2[i] });
        case '/': return calArray(v1, v2, (v1, v2, i) => { return v1[i] / v2[i] });
    }
}
```
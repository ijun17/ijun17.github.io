---
layout: post
title: "[LSA]백엔드 테스트 더블"
order: 5
---

`테스트 더블`이란 테스트를 위한 실제 모듈처럼 동작하는 가상의 모듈로 여기서는 백엔드에 해당된다. 정확히 말하면 백엔드와의 통신을 담당하는 RestApi 클래스에 대한 테스트 더블을 만들었다. 백엔드의 개발이 완료되지 않은 상황에서 테스트 더블을 만들어 프론트엔드의 UI가 정상적으로 동작하는지 테스트하였다. 

RestApi 클래스와 이것의 테스트 더블인 TestRestApi 클래스는 아래 웹에서 필요한 1~20번의 엔드포인트 요청을 캡슐화 하였다. 

<https://cyber-mitten-d95.notion.site/LSA-REST-API-df2116c15a564d15acd39837cec2684e>

테스트 환경과 실제 환경을 전환하는 방법은 간단하다.

```js
//테스트 환경
const REST = new TestRestApi();

//실제 환경(백엔드와 연결)
const REST = new RestApi();
```

# 테스트 서버 vs 로컬

백엔드를 모방하는 방식으로 테스트를 위한 json 서버를 사용하는 방식과 REST api 요청을 낚아채어 로컬에서만 동작시키는 방식이 있다. 전자는 테스트를 위해 서버를 구동시켜야하기 때문에 후자의 방식을 선택하였다. 후자의 방식은 엔드포인트 요청을 비동기 함수로 캡슐화하여 지연시간 등을 조절할 수 있다는 장점이 있지만 네트워크 오류, CORS 문제 등은 구현하기 어렵다. 

# Stub vs Fake

테스트 더블에는 여러 종류가 있다. 원래는 Stub을 개발하려고 했는데 오류가 발생했을 때의 로직과 사용 시나리오를 테스트하기 위해 Fake를 개발했다. Stub과 Fake의 차이는 아래와 같다.

* stub: 정해진 응답만 반환한다.
* fake: 실제 모듈과 비슷한 동작을 하지만 단순화되어 있다.

나는 브라우저에서만 존재하는 in-memory DB를 만들어 각 REST api 요청마다 DB에서 CRUD가 이루어지도록 하였다. 웹 페이지가 새로고침되지 않는한 DB의 변경사항은 유지된다. in-memory DB는 아래처럼 정의되어있다. 

```js
class TestRestApi{
    token = 6;
    userId = 6
    userDb=[
        {userId:1,name:"김준기",dept:"소프트웨어공학과",role:"RESEARCHER",staffId:"12345",username:"1",password:"1",token:1},
        {userId:2,name:"김규호",dept:"소프트웨어공학과",role:"STUDENT",staffId:"12445",username:"2",password:"2",token:2},
        {userId:3,name:"김채원",dept:"소프트웨어공학과",role:"STUDENT",staffId:"12245",username:"3",password:"3",token:3},
        {userId:4,name:"정혜선",dept:"소프트웨어공학과",role:"STUDENT",staffId:"13245",username:"4",password:"4",token:4},
        {userId:5,name:"최태운",dept:"소프트웨어공학과",role:"STUDENT",staffId:"22245",username:"5",password:"5",token:5},
    ]
    labDb=[
        {labId:1,labName:"LSA 연구실",dept:"소프트웨어공학과",member:[1,2,3]},
        {labId:2,labName:"Crenu 연구실",dept:"소프트웨어공학과",member:[1]},
        {labId:3,labName:"인공지능 연구실",dept:"소프트웨어공학과",member:[]},
        {labId:4,labName:"운영체제 연구실",dept:"소프트웨어공학과",member:[]},
        {labId:5,labName:"클라우드 연구실",dept:"소프트웨어공학과",member:[]}
    ]
    requestId=5
    requestDb=[
        {requestId:1, userId:4, labId: 1},
        {requestId:2, userId:5, labId: 1},
        {requestId:3, userId:2, labId: 2},
        {requestId:4, userId:3, labId: 2}
    ]
    researchId=3
    researchDb=[
        {researchId:1, labId:1, researchName:"아루코 마커"},
        {researchId:2, labId:1, researchName:"핸드 트래킹"}
    ]
    manualId=5
    manualDb=[
        {manualId:1,researchId:1,manualName:"아루코 마커1"},
        {manualId:2,researchId:1,manualName:"아루코 마커2"},
        {manualId:3,researchId:2,manualName:"핸드 트래킹1"},
        {manualId:4,researchId:2,manualName:"핸드 트래킹2"},
    ]

    currentUserId=1
    currentToken=1

    ...
}
```

# TestRestApi 클래스

이 클래스는 실제 서버처럼 요청에 대한 응답을 하는 클래스이다. 실제론 서버와 통신하지 않고, 로컬에서만 동작한다. 이 클래스는 실제 서버와 통신하는 RestApi 클래스의 fake이다. in-memory DB를 사용하며 이곳에서 CRUD가 이루어지고 웹 페이지가 새로고침되지 않는 한 변경사항이 유지된다. 이 클래스는 RestApi 클래스의 인터페이스와 거의 동일하다.

아래는 TestRestAPi 클래스의 함수 중 하나이다. in-memory DB에서 조회 및 삽입을 하고 적절한 응답을 핸들러에게 반환한다.
```js
//12 아이디로 연구실 조회
getLabInfo({labId}, handler, errorHandler){
    this.checkInput({labId});
    const lab = this.labDb.find(e=>e.labId == labId);
    if(lab){
        const labName = lab.labName, dept=lab.dept
        handler(200,{labName, labId, dept})
    }else{
        errorHandler(404,"no lab")
    }
}
```

# RestApi 클래스

이 클래스는 실제 서버와 통신하는 클래스이다. 아래 함수는 위에 TestRestApi의 getLabInfo와 동일한 인터페이스이다. 

```js
//12 아이디로 연구실 조회
getLabInfo({labId}, handler, errorHandler){
    this.checkInput({labId});
    this.handleResponse(this.get(`/api/labs/${labId}/find-labs`,true), handler, errorHandler)
}
```

아래는 서버의 응답을 해석하고 적절하게 변형하여 이를 handler와 errorHandler에게 제공하는 handleResponse 함수이다.

```js
async handleResponse(promise, handler=()=>{}, errorHandler=()=>{}){
    let status=null;
    try{
        const res = await promise;
        status = res.status;
        if(!res.ok)throw new Error(await res.text());
        else{
            const contentType = res.headers.get('Content-Type');
            const data = (contentType && contentType.includes('application/json')) ? await res.json() : await res.text();
            console.log(contentType, data);
            handler(status, data);
        }
    }catch(e){ 
        errorHandler(status, e);
    }
}
```

# 통합 결과

2024.6.18 백엔드와 통합을 성공적으로 하였다. REST api 정의서 기반으로 테스트 코드를 작성하여 빠르게 UI를 테스트할 수 있었으며, 백엔드와 연결했을 때 발생한 오류가 어디에서 발생한 것인지 빠르게 알 수 있었다. 좋은 시도였다고 생각한다.
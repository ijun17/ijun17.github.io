---
layout: post
title: "[LSA]REST API 설계"
order: 2
---

LSA의 프론트엔드를 개발하면서 백엔드와 소통을 편하게 하기 위해 REST API를 설계하고 이를 문서화했다. 처음에 LSA 시스템의 요구사항을 정리하고, 백엔드와 프론트엔드와 각자 개발을 하였다. 하지만 개발을 어느정도 진행하고 중간 회의를 했는데 백엔드에서 주는 정보에 프론트엔드가 필요한 정보가 빠져있는 경우가 있었다. 예를 들어 사용자 정보 요청에 학과가 빠져있었다. 백엔드 담당과 소통이 잘 안되었던 것이다. 이러한 이유로 REST API 정의서를 만들었다.

# 문서화

~~아래는 REST API 정의서이다.~~ 2025년 노션을 정리하면서 블로그로 글을 옮겼다.

~~<https://cyber-mitten-d95.notion.site/LSA-REST-API-df2116c15a564d15acd39837cec2684e>~~

개발하기도 바빠서 체계적으로 만들 시간은 없었다... 그냥 팀원들끼리 이해할 정도로 작성했었다. 문서를 보면 빈값으로 보내거나 하는 경우도 있는데 이는 이미 개발이 되어 바꾸기 어렵거나 하는 경우이다. 문서화 과정에서 지금까지 개발한 것을 최대한 수정하지 않도록 하였다. 그럼에도 불구하고 수정해야할 부분이 생기면 서로 양보해가며 REST를 정의했다. 원래 프론트엔드에서 연구실 위치를 보여주는데 백엔드에서 수정이 어렵다고하여 프론트엔드에서 이를 그냥 삭제하도록 하였다.  

# 결과

REST API에서 I는 인터페이스이다. 객체 지향에서 인터페이스는 구현체를 만들기 전 미리 정의되어야하며, 변경을 최소화해야 한다. REST API도 마찬가지라 생각한다. REST API를 문서화함으로써 백엔드는 이 인터페이스를 보고 어떤 구현체를 만들어야 할지 알 수 있고, 프론트엔드는 어떤 값을 주면 어떤 값을 반환하는지 알 수 있다. 이를 통해 백엔드와 프론트엔드가 독립적으로 개발할 수 있게 되었다고 생각한다. 다시 말해 백엔드가 완성되는 것을 기다리지 않고 프론트엔드를 완성할 수 있다는 것이다. 

또한 문서화를 통해 팀원들과의 소통이 쉬워졌다. 이제는 팀도 REST API 정의서를 관리하는데 적극적인 것 같다. 다만 아쉬운 점은 처음부터 REST API를 문서화했다면 서로 잘못 이해하는 일 없이 개발을 했을 것이다. 이러한 점이 조금 아쉽다.

# 문서를 블로그로

2025년 노션을 정리하고 내용을 블로그로 옯겨왔다. GPT로 정리를 시켰는데 잘못된 부분이 있을 수 있다.

## 회원 관리

### 🔹 1. 회원가입
- **Endpoint:** `POST /api/users/register`
- **Request Body:**
  ```json
  {
    "username": string,
    "password": string,
    "role": "STUDENT" or "RESEARCHER",
    "labs": [],
    "labNames": [],
    "staffId": "",
    "name": "",
    "dept": ""
  }
  ```
- **Response:** `200 OK` (성공) / `400 Bad Request` (오류)

### 🔹 2. 이메일 인증
- **Endpoint:** `POST /api/users/verify`
- **Request Body:**
  ```json
  {
    "email": string,
    "code": string,
    "userDto": {
      "username": string,
      "password": string,
      "role": "",
      "labs": [],
      "labNames": [],
      "staffId": "",
      "name": "",
      "dept": ""
    }
  }
  ```
- **Response:** `200 OK` / `400 Bad Request`

### 🔹 3. 로그인
- **Endpoint:** `POST /api/users/login`
- **Request Body:**
  ```json
  {
    "username": string,
    "password": string
  }
  ```
- **Response:**
  ```json
  {
    "userId": int,
    "token": "jwtToken"
  }
  ```

### 🔹 4. 유저 인적사항 조회
- **Endpoint:** `GET /api/users/{userId}/find-user-info`
- **Response:**
  ```json
  {
    "userId": int, 
    "name": string, 
    "role": "STUDENT" or "RESEARCHER",
    "dept": string,
    "staffId" : string
  }
  ```

---

## 연구실 관리

### 🔹 5. 연구실 가입 요청
- **Endpoint:** `POST /api/labs/request-membership?userId={userId}&labId={labId}`
- **Response:** `200 OK` / `400 Bad Request`

### 🔹 6. 연구실 멤버 삭제
- **Endpoint:** `DELETE /api/labs/remove-membership?userId={userId}&labId={labId}`
- **Response:** `200 OK` / `400 Bad Request`

### 🔹 7. 연구실 가입 승인/거절
- **Endpoint:** `POST /api/labs/respond-to-request?requestId={requestId}&accept={0 or 1}`
- **Response:** `200 OK` / `400 Bad Request`

### 🔹 8. 유저의 연구실 신청 내역 조회
- **Endpoint:** `GET /api/labs/user/{userId}/membership-requests`
- **Response:**
  ```json
  [
    {
      "userId": int,
      "name": string,
      "staffId": string,
      "labId": int,
      "labName": string,
      "role": string,
      "dept": string,
      "labDept": string,
      "requestId": string
    }
  ]
  ```

### 🔹 9. 연구실 멤버 조회
- **Endpoint:** `GET /api/labs/{labId}/find-membership`
- **Response:**
  ```json
  [
    {
      "userId": int,
      "name": string,
      "role": "STUDENT" or "RESEARCHER",
      "dept": string,
      "staffId": int
    }
  ]
  ```

### 🔹 10. 연구실 가입 신청자 조회
- **Endpoint:** `GET /api/labs/{labId}/membership-requests`
- **Response:**
  ```json
  [
    {
      "userId": int,
      "userName": string,
      "staffId": string,
      "labId": int,
      "labName": string,
      "labDept": string,
      "role": "STUDENT" or "RESEARCHER",
      "dept": string,
      "requestId": int
    }
  ]
  ```

### 🔹 11. 유저가 속한 연구실 조회
- **Endpoint:** `GET /api/labs/user/{userId}/find-user-labs`
- **Response:**
  ```json
  [
    {
      "labName": string,
      "labId": int,
      "dept": string
    }
  ]
  ```

### 🔹 12. 연구실 검색 (ID 기준)
- **Endpoint:** `GET /api/labs/{labId}/find-labs`
- **Response:**
  ```json
  {
    "labName": string,
    "labId": int,
    "dept": string
  }
  ```

---

## 연구 관리

### 🔹 13. 연구 조회
- **Endpoint:** `GET /api/research/{labId}/find-research`
- **Response:**
  ```json
  [
    {
      "researchName": string,
      "researchId": int,
      "labId": int
    }
  ]
  ```

### 🔹 14. 연구 생성
- **Endpoint:** `POST /api/research/{labId}/create-research`
- **Request Body:**
  ```json
  {
    "researchName": string
  }
  ```
- **Response:**
  ```json
  {
    "researchId": int
  }
  ```

### 🔹 15. 연구 수정
- **Endpoint:** `PUT /api/research/{labId}/edit-research?researchId={}`
- **Request Body:**
  ```json
  {
    "researchName": string
  }
  ```
- **Response:** 메시지 반환

### 🔹 16. 연구 삭제
- **Endpoint:** `DELETE /api/research/{labId}/delete-research?researchId={}`
- **Response:** 메시지 반환

---

## 매뉴얼 관리

### 🔹 17. 매뉴얼 조회
- **Endpoint:** `GET /api/research/manual/find-manual?researchId={}`
- **Response:**
  ```json
  [
    {
      "manualName": string,
      "manualId": int
    }
  ]
  ```

### 🔹 18. 매뉴얼 생성
- **Endpoint:** `POST /api/research/manual/{labId}/create-manual?researchId={}`
- **Request Body:**
  ```json
  {
    "manualName": string
  }
  ```
- **Response:**
  ```json
  {
    "manualId": int
  }
  ```

### 🔹 19. 매뉴얼 수정
- **Endpoint:** `PUT /api/research/manual/edit-manual?manualId={}`
- **Request Body:**
  ```json
  {
    "manualName": string
  }
  ```
- **Response:** 메시지 반환

### 🔹 20. 매뉴얼 삭제
- **Endpoint:** `DELETE /api/research/manual/delete-manual?manualId={}`
- **Response:** 메시지 반환

---

## 가상 오브젝트 관리

### 🔹 21. 모든 가상 오브젝트 아이디 조회

- **Endpoint:** `GET /api/research/vobject/find-virtual-object-list?manualId={}}`
- **Response:**
  ```json
  int[]
  ```

### 🔹 22. 가상 오브젝트 조회
- **Endpoint:** `GET /api/research/vobject/find-virtual-object-info?virtualObjectId={}`
- **Response:**
  ```json
  {
    "position": [int, int, int],
    "size": [int, int, int],
    "name": string,
    "text": string,
    "imageName": string,
    "soundName": string,
    "manualId": int
  }
  ```

### 🔹 23. 가상 오브젝트 생성
- **Endpoint:** `POST /api/research/vobject/create-virtual-object`
- **Request Body:**
  ```json
  {
    "position": [int, int, int],
    "size": [int, int, int],
    "name": string,
    "text": string,
    "imageName": string,
    "soundName": string,
    "manualId": int
  }
  ```
- **Response:**
  ```json
  {
    "virtualObjectId": int
  }
  ```

### 🔹 24. 가상 오브젝트 수정
- **Endpoint:** `POST /api/research/vobject/edit-virtual-object?virtualObjectId={}`
- **Request Body:**
  ```json
  {
    "position": [int, int, int],
    "size": [int, int, int],
    "name": string,
    "text": string,
    "imageName": string,
    "soundName": string
  }
  ```
- **Response:** 성공 or 실패 메시지

### 🔹 25. 가상 오브젝트 삭제
- **Endpoint:** `DELETE /api/research/vobject/delete-virtual-object?virtualObjectId={}`
- **Response:** 성공 or 실패 메시지

---

## 안전 교육 관리

### 🔹 26. 안전 교육 수강 완료
- **Endpoint:** `POST /api/research/education/{manualId}/complete-education?{userId}`
- **Response:** 성공 or 실패 메시지

### 🔹 27. 안전 교육 수강 여부 조회
- **Endpoint:** `GET /api/research/education/{manualId}/status`
- **Response:** 성공 or 실패 메시지

### 🔹 28. 안전 교육 생성
- **Endpoint:** `POST /api/research/education/{manualId}/start`
- **Request Body:**
  ```json
  {
    "userId": int,
    "manualId": int
  }
  ```
- **Response:** 성공 or 실패 메시지

---

## 매뉴얼 공유

### 🔹 29. 매뉴얼 공유
- **Endpoint:** `POST /api/portal/sharemanual`
- **Request Body:**
  ```json
  {
    "manualId": int
  }
  ```
- **Response:** 성공 or 실패

### 🔹 30. 매뉴얼 공유 해제
- **Endpoint:** `DELETE /api/portal/sharemanual/{manualId}`
- **Response:** 성공 or 실패

### 🔹 31. 공유 매뉴얼 검색 (이름 기준)
- **Endpoint:** `GET /api/portal/sharemanual?name={}`
- **Response:** 
  ```json
  {
	"manualId": int[],
	"manaulName": string[],
	"downloads": int[],
  }[]
  ```

### 🔹 32. 공유 매뉴얼 가져오기
- **Endpoint:** `POST /api/portal/sharemanual/load`
- **Request Body:**
  ```json
  {
    "manualId": int
  }
  ```
- **Response:** 성공 or 실패

### 🔹 33. 가져온 공유 매뉴얼 조회
- **Endpoint:** `GET /api/portal/sharemanual/all`
- **Response:** 
  ```json
  {
	"manualId": int[],
	"manaulName": string[],
	"downloads": int[],
  }[]
  ```

---
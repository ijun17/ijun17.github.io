---
layout: post
title: "[Node.js]Express 미들웨어"
order: 1
---

<https://expressjs.com/en/guide/using-middleware.html>를 요약하여 작성하였다 **(Express 4.X 기준이다)**.

# 미들웨어란

>Express 애플리케이션은 기본적으로 일련의 `미들웨어` 함수 호출입니다.

위 말처럼 Express는 미들웨어에서 시작해 미들웨어로 끝난다. 그만큼 Express에서 미들웨어는 중요한 개념이다. **미들웨어 함수**는 요청 오브젝트(req), 응답 오브젝트 (res), 그 다음의 미들웨어 함수(next)를 매개변수로 전달받는 함수이다. 인증, 요청 검증, 요청 처리, 오류 처리 등 다양한 기능을 미들웨어로 만들 수 있다. 


# 미들웨어의 종류

Express는 미들웨어들을 아래와 같이 나눌 수 있다.

- 애플리케이션 레벨 미들웨어
- 라우터 레벨 미들웨어
- 오류 처리 미들웨어
- 기본 제공 미들웨어
- 써드파티 미들웨어

## 애플리케이션 레벨 미들웨어

애플리케이션 인스턴스에 직접 연결되어, **전체 애플리케이션**의 요청 및 응답 처리에 적용된다.

```js
//express 인스턴스에 미들웨어를 등록한다.
const app = express();

app.use((req, res, next) => { ... });
app.use('/user/:id', (req, res, next) => { ... });
app.get('/user/:id', (req, res, next) => { ... });
app.post('/user/:id', (req, res, next) => { ... });
```

## 라우터 레벨 미들웨어

**특정 라우터**의 요청 및 응답 처리에 적용된다.

```js
//라우터에 미들웨어를 등록한다.
const app = express.Router();

app.use((req, res, next) => { ... });
app.use('/user/:id', (req, res, next) => { ... });
app.get('/user/:id', (req, res, next) => { ... });
```

## 오류 처리 미들웨어

**에러**가 발생했을 때 호출되는 특수한 형태의 미들웨어이다. 매개변수가 4개이면 오류 처리 미들웨어로 적용된다.

```js
app.use((err, req, res, next) => { ... })
```

## 기본 제공 미들웨어

Express에서 **기본적으로 제공하는** 미들웨어 함수이다. 4.X 버전에서는 기본 제공 미들웨어는 아래 3가지를 제공한다.

- `express.static`: 정적 파일을 제공하는 기능. 이 함수는 serve-static을 기반으로 한다.
- `express.json`: 요청 본문을 JSON으로 파싱. (4.16버전 이상에서 사용 가능)
- `express.urlencoded`: 요청 본문을 URL-encoded 형식으로 파싱. (4.16버전 이상에서 사용 가능)

```js
const options = {
    dotfiles: 'ignore', // dotfile을 제공하기 위한 옵션 “allow”, “deny”, “ignore”
    etag: false, // etag를 생성할지
    extensions: ['htm', 'html'], // 파일 확장자 폴백을 설정
    index: false, // 디렉토리 인덱스 파일을 전송할지
    lastModified: false, // 해당 파일이 마지막으로 수정된 날짜를 Last-Modified 헤더에 설정할지
    maxAge: '1d', // Cache-Control 헤더의 max-age 특성을 설정
    redirect: false, // 경로 이름이 디렉토리인 경우 후미부의 “/”로 경로를 재지정할지
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    }
}

app.use(express.static(path.join(__dirname, 'public'), options));
```


## 써드 파티 미들웨어

써드 파티 미들웨어는 express에 기본으로 포함되지 않은 미들웨어이다.

아래 미들웨어들은 예전 express에 포함되었지만 4.x 버전에는 별도의 모듈로 분리가 되었다. 사용하기 위해서는 별도로 설치를 해야한다. 

|미들웨어|이전 이름|기능|
|:---:|:---:|:---|
|[`body-parser`](https://www.npmjs.com/package/body-parser)| bodyParser,<br>json,<br>urlencoded|요청 본문을 JSON 또는 URL-encoded 형식으로 파싱|
|[`compression`](https://www.npmjs.com/package/compression)| compress|HTTP 응답을 압축하여 전송|
|[`connect-timeout`](https://www.npmjs.com/package/connect-timeout)| timeout| 요청의 타임아웃을 설정|
|[`cookie-parser`](https://www.npmjs.com/package/cookie-parser)| cookieParser| 쿠키를 파싱하여`req.cookies`에 저장|
|[`cookie-session`](https://www.npmjs.com/package/cookie-session)| cookieSession| 세션 정보를 쿠키에 저장|
|[`csurf`](https://www.npmjs.com/package/csurf)| csrf| CSRF(Cross-Site Request Forgery) 공격을 방지|
|[`errorhandler`](https://www.npmjs.com/package/errorhandler)| error-handler| 오류 발생 시 에러를 처리하고 응답|
|[`express-session`](https://www.npmjs.com/package/express-session)| session| 서버 측 세션을 관리|
|[`method-override`](https://www.npmjs.com/package/method-override)| method-override| HTTP 메서드(예: POST)를 다른 메서드로 변경|
|[`morgan`](https://www.npmjs.com/package/morgan)| logger| HTTP 요청 로그를 기록|
|[`response-time`](https://www.npmjs.com/package/response-time)| response-time| 요청 처리 시간 정보를 응답 헤더에 추가|
|[`serve-favicon`](https://www.npmjs.com/package/serve-favicon)| favicon| 애플리케이션에 파비콘을 제공|
|[`serve-index`](https://www.npmjs.com/package/serve-index)| directory| 디렉토리 목록을 제공하는 기능을 추가|
|[`serve-static`](https://www.npmjs.com/package/serve-static)| static| 정적 파일을 제공하는 기능을 추가|
|[`vhost`](https://www.npmjs.com/package/vhost)| vhost| 가상 호스트를 지원하여 여러 도메인을 처리|

---
layout: post
title: "[Node.js]MySQL 연결"
order: 1
---

Node.js에서 MySql연결하는 과정을 기록합니다.

참고자료
- <https://www.npmjs.com/package/mysql2>
- <https://sidorares.github.io/node-mysql2/docs>

# MySql 설치 및 실행

## 1.1 설치

<https://dev.mysql.com/downloads/installer/>

위 링크에 들어가서 두번째 파일을 다운로드 합니다. 설치할 때는 비밀번호 입력을 제외하고 나머지는 다 next 눌러도 상관없습니다. 설치가 완료되면 자동으로 MySql이 실행됩니다.

*이 글은 MySQL server를 기준으로 작성되었습니다.*

## 1.2 비밀번호 입력

일단 설치가 완료되면 MySQL 8.0 Command Line Client와 같은 이름의 프로그램이 생깁니다. 이 프로그램을 실행하여 MySQL을 제어할 수 있습니다. 프로그램을 실행시켜서 아까 만들었던 비밀번호를 입력합니다.

## 1.3 데이터베이스 조회

데이터베이스는 `SHOW DATABASES` 명령어로 조회합니다. 처음에는 information_schema, mysql, performance_schema, sys가 기본으로 생성되어 있습니다.

```sh
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

- information_schema: 데이터베이스 객체에 대한 메타데이터(테이블, 열, 인덱스, 권한 등) 저장
- mysql: 사용자 계정, 권한, 시스템 설정 등을 저장
- performance_schema: 성능 모니터링 및 튜닝을 위한 데이터(쿼리 실행 시간, 잠금, 대기 시간, I/O 통계 등)를 저장
- sys: performance_schema와 관련된 view, 저장 프로시저, 함수 등을 제공

## 1.4 데이터베이스 생성

데이터베이스는 `CREATE DATABASE` 명령어로 생성합니다.

```sh
CREATE DATABASE 데이터베이스_이름;
```

다시 SHOW DATABASES를 입력하면 새로 만든 데이터베이스가 보입니다.





# Node.js mysql2 설치 및 연결

npm에는 mysql과 mysql2가 있습니다. 보통 다음과 같은 이유로 mysql2를 더 추천합니다.

- mysql2는 mysql의 거의 모든 기능을 제공합니다.
- mysql2가 최적화가 더 되어있습니다
- mysql2는 Promise를 지원합니다.

## 2.1 mysql2 설치

```sh
npm install --save mysql2
# --save는 npm5부터 디폴트로 생략가능합니다.
```

## 2.2 MySQL에 연결

지금까지 잘 따라왔다면 아래 코드가 성공적으로 실행됩니다.

```js
const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost', // 
  user: 'your_username', // MySQL 사용자 이름(그냥 root 하면됨)
  password: 'your_password', // MySQL 비밀번호
  database: 'your_database', // 아까 만든 데이터베이스 이름
  port: 3306, // MySQL 포트(기본으로 3306)
};

(async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('MySQL에 성공적으로 연결되었습니다!');
    await connection.end();
  } catch (err) {
    console.error('MySQL 연결 실패:', err);
  }
})();
```

## 2.3 테이블 생성

이제 데이터베이스에 테이블들을 생성합니다.

```js
const mysql = require('mysql2/promise');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost', // 
    user: 'your_username', // MySQL 사용자 이름(그냥 root 하면됨)
    password: 'your_password', // MySQL 비밀번호
    database: 'your_database', // 아까 만든 데이터베이스 이름
    port: 3306, // MySQL 포트(기본으로 3306)
  });

  // 테이블 생성
  const [results, fields] = await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
  console.log(results, fields);

  // 테이블들 조회
  const [results2, fields2] = await connection.query(`SHOW TABLES`);
  console.log(results2, fields2);

  // 작업 끝나면 연결 끊기   
  connection.end();
})();
```

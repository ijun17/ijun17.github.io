---
layout: post
title: "[JS]입출력(node.js)"
order: 1
---

node.js에서는 기본적으로 비동기 입출력을 지원한다. 따라서 C/C++처럼 코드 중간에 입력을 받는 방식은 어렵고 모든 입력을 한번에 받은 뒤 처리해야 한다. 

# 입력

```js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	
	let lines = []
	for await (const line of rl) {
		lines.push(line)
	}
	rl.close(); //없어도 크게 상관 없음

	// 코드 구현
	
	process.exit(); //없어도 크게 상관 없음
})();
```

# 각 라인을 정수로 받아 올때

```js
function readInt(line){
	return line.split(' ').map(e=>Number(e))
}
// 1 2 3 4 이렇게 입력을 받았을 때
let [n1, n2, ... , nx] = readInt(line[0]);
```
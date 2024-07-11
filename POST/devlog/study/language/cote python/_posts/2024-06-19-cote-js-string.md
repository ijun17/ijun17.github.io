---
layout: post
title: "[JS]문자열과 정규 표현식"
order: 2
---


# 문자열 기초

```js
//문자열 탐색 indexOf(subStr)
"abcd".indexOf("bc") //1

//문자열 자르기 split(separator);
"a,b,c,d".split(",") //["a","b","c","d"]

//문자열 추출 slice(indexStart, indexEnd)
"abcd".slice(1,3) //"bc"

//문자열 합치기 join(separator)
["a","b","c","d"].join(",") //"a,b,c,d"

//문자열 대체 replace(pattern, replacement)
"abab".replace("ab", "aa") //"aaab"
"abab".replaceAll("ab", "aa") //"aaaa"
```

# 정규 표현식

정규 표현식이란 문자열의 패턴을 표현하는 형식 언어이다. 
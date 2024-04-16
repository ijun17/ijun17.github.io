---
layout: post
title: "[python]기본개념"
order: 30
---

```python
# 변수 선언 및 출력
num = 10
print(num)

# 파이썬은 지역변수가 존재한다
def fun1():
    num=20
print(num)

# 배열 및 순회
arr = ['a','b','c','d']
for i in range(0,4):
    print(arr[i])

for e in arr:
    print(e)

for i,e in enumerate(arr):
    print(i,e)

```
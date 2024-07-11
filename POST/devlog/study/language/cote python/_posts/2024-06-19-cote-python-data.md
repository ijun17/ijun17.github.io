---
layout: post
title: "[Python]변수"
order: 2
---

파이썬은 동적 타입 언어이다.

# 정수(int)

* 파이썬에서 정수의 크기는 무한하다

```py
a = 10
b = -5
print(type(a))  # 출력: <class 'int'>
```

# 부동소수점(float)

* float의 크기는 8Byte이다

```py
a = 3.14
b = -2.7
print(type(a))  # 출력: <class 'float'>
```

# 문자열(str)

```py
a = "Hello, World!"
b = 'Python is fun'
print(a)  # 출력: Hello, World!
print(b)  # 출력: Python is fun
print(type(a))  # 출력: <class 'str'>

# 문자열 반복
print("a"*3) # aaa

# 

# f-string
print(f'{a} and {b}') # Hello, World! and Python is fun
print(len("abc")) # 
```

# 불리언(bool)

```py
a = True
b = False
print(a)  # 출력: True
print(b)  # 출력: False
print(type(a))  # 출력: <class 'bool'>
```

# 리스트(list)

```py
a = [1, 2, 3, 4, 5]
b = ["apple", "banana", "cherry"]
print(a)  # 출력: [1, 2, 3, 4, 5]
print(b)  # 출력: ['apple', 'banana', 'cherry']
print(type(a))  # 출력: <class 'list'>
```

# 튜플(tuple)

```py
a = (1, 2, 3, 4, 5)
b = ("apple", "banana", "cherry")
print(a)  # 출력: (1, 2, 3, 4, 5)
print(b)  # 출력: ('apple', 'banana', 'cherry')
print(type(a))  # 출력: <class 'tuple'>
```

# 세트(set)

```py
a = {1, 2, 3, 4, 5}
b = {"apple", "banana", "cherry"}
print(a)  # 출력: {1, 2, 3, 4, 5}
print(b)  # 출력: {'apple', 'banana', 'cherry'}
print(type(a))  # 출력: <class 'set'>
```

# 딕셔너리(dict)

```py
a = {"name": "John", "age": 30, "city": "New York"}
b = {"brand": "Ford", "model": "Mustang", "year": 1964}
print(a)  # 출력: {'name': 'John', 'age': 30, 'city': 'New York'}
print(b)  # 출력: {'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
print(type(a))  # 출력: <class 'dict'>
```

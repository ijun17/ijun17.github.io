---
layout: post
title: "코틀린 스프링이란"
order: 30
---
# Kotlin Spring이란

* `Kotlin` :  JetBrains에서 개발한 정적 타입 언어로, 자바와 100% 상호 운용성을 가지며, 자바 가상 머신(JVM)에서 실행되는 언어이다.
* `Kotlin Spring` : 자바 스프링(Spring) 프레임워크를 기반으로 코틀린(Kotlin) 언어를 사용하여 웹 애플리케이션을 개발하는 것이다.
* `Java Spring` : 자바 기반의 오픈 소스 프레임워크로, 엔터프라이즈급 웹 애플리케이션을 개발하기 위한 풀 스택(전체 스택) 프레임워크이다.

# Kotlin 기본 문법

* 변수 : `var age: Int = 25`
* 상수 : `val age: Int = 25`
* 자료형 : Int, Long, Float, Double, Boolean, Char, String
* 세미콜론 필수가 아님

```java
//변수
val age: Int = 25

// 배열
val numbers: Array<Int> = arrayOf(3,2,1)
val numbers2: Array<Int> = Array(5) { i -> i * 2 }
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3

//조건문
if (age >= 18) {
    println("성인입니다.")
} else {
    println("미성년자입니다.")
}

//조건문2
when (age) {
    in 1..17 -> println("어린이입니다.")
    in 18..64 -> println("성인입니다.")
    else -> println("노인입니다.")
}

//for문
for (i in 1..10) {
    println(i)
}
//while문
var i = 1
while (i <= 10) {
    println(i)
    i++
}

//함수
fun add(a: Int, b: Int): Int {
    return a + b
}
val sum = add(3, 5)
println("합계: $sum")

//클래스
class Person(val name: String, val age: Int) {
    fun introduce() {
        println("이름: $name, 나이: $age")
    }
}
val person = Person("John", 25)
person.introduce
```
---
layout: post
title: "[c++]입출력"
order: 3
---


# 기본 입출력 cout/cin

기본 입력은 공백 단위로 입력을 받는다. 다시 말해 공백 문자를 입력받을 수 없다. 또한 cout에서 endl을 사용하는 것은 성능에 악영향을 끼친다고 한다. 그냥 '\n'을 쓰자.

```cpp
#include <iostream>
using namespace std;

int temp;
cin>>temp; //공백 단위로 입력
cout<<"hello world"<<temp;
```

# 한줄 입력 getline

```cpp
#include <iostream>
#include <string>
using namespace std;

string s;
getline(cin, s); //'\n' 전까지 입력 받는다

```

# 입력 횟수가 정해지지 않을때

알고리즘 문제에서 입력 횟수를 주지 않고 마지막에 EOF를 입력하는 문제도 있다.

```cpp
//EOF가 입력될때까지 입력한다
while(cin>>num){...}

//또는 아래와 같이
while(!cin.eof()){cin>>num;}
```


# 입출력 최적화(스트림)

c++에서 입출력 스트림은 기본적으로 c와 동기화가 되어있어 성능의 하락이 있다. `ios::sync_with_stdio`를 써서 동기화를 해제할 수 있다. 하지만 이렇게 한다면 printf와 cout의 출력 순서가 보장되지 않는다. 그리고 `cin.tie`으로 입력을 하기전 출력 스트림을 비우지 않게 하여 성능을 향상시킬 수 있다.

```cpp
ios::sync_with_stdio(0); //c++11 이전
ios_base::sync_with_stdio(0); // c++11 이후
cin.tie(0);
```

# 입출력 최적화(버퍼)

나는 보통 문제를 풀고 더 빠르게 푼 다른 사람의 코드를 보는데 아래와 같은 코드가 공통적으로 있었다. 잘 보니 이는 버퍼에 출력할 데이터를 담아두고 한번에 출력하는 것이었다. 이 코드는 cstdio를 사용하여 C언어 스타일로 작성된 코드이다. 

```cpp
//C 스타일
#include <cstdio>
#define MAX 1<<16

char wbuf[MAX];
int widx, result[8], N, M;
bool check[8]{};

inline void bflush() {
    fwrite(wbuf, 1, widx, stdout);
    widx = 0;
}

inline void write(int c) {
    if (widx + 2 * c >= MAX) bflush();

    for (int i = 0; i < c - 1; i++) wbuf[widx++] = result[i] + '0', wbuf[widx++] = ' ';
    wbuf[widx++] = result[c - 1] + '0', wbuf[widx++] = '\n';
}
```

아래는 cpp 스타일로 작성한 것이다.

```cpp
//C++ 스타일
#include <iostream>
#include <vector>
#include <array>

constexpr int MAX = 1 << 16;
std::vector<char> wbuf(MAX);
int widx;
std::array<int, 8> result;
int N, M;
std::array<bool, 8> check{};

inline void bflush() {
    std::cout.write(wbuf.data(), widx);
    widx = 0;
}

inline void write(int c) {
    if (widx + 2 * c >= MAX) bflush();

    for (int i = 0; i < c - 1; i++) {
        wbuf[widx++] = result[i] + '0';
        wbuf[widx++] = ' ';
    }
    wbuf[widx++] = result[c - 1] + '0';
    wbuf[widx++] = '\n';
}

```


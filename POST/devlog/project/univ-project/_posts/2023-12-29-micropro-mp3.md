---
layout: post
title: "mp3플레이어(마이크로프로세서)"
order: 2
---

깃허브: <https://github.com/ijun17/Mbed-MP3-Player>

이 프로젝트는 대학교 3학년 마이크로프로세서 수업의 최종 프로젝트이다. 사용자는 LCD 디스플레이로 어떤 노래가 있는지 확인할 수 있고, 노래를 재생, 일시정지, 중지를 할 수 있다. lcd 디스플레이는 텍스트를 출력할 수 있는 공간이 한정되어 있기 때문에 만약 노래 제목이 16자를 넘는다면 1초마다 왼쪽으로 시프트하여 전체 제목을 보여준다. 노래를 재생하면 부저에서 음악이 나오며 LCD 디스플레이에서 가사가 나온다.


# 객체 지향적 설계

이 프로젝트는 객체 지향적으로 설계해 유지보수가 쉽고, 각 객체 자신의 책임을 다하도록 하였다. Music 클래스, MP3Player 클래스가 있으며 메인 함수에서 아래처럼 실행된다.

```cpp
#include "mbed.h"

#include "Music.h"
#include "MusicSample.h"
#include "MP3Player.h"

int main() 
{
    Music music1(name1,pitchs1,lyrics1,beats1,length1);
    Music music2(name2,pitchs2,lyrics2,beats2,length2);
    Music musicT(nameT,pitchsT,lyricsT,beatsT,lengthT);

    MP3Player mp3(D5, D14, D15, D3, D4);
    mp3.addMusic(music1);
    mp3.addMusic(music2);
    mp3.addMusic(musicT);
    mp3.start();
}
```

# Music 클래스

Music 클래스는 다음의 정보를 가지고 있다.

* string name;      //노래 제목
* string* pitches;  //음계(배열)
* string* lyrics;   //가사(배열)
* int* beats;       //박자(배열)
* int length;       //배열 길이

그리고 아래의 기능을 담당한다.

* 음계를 주파수로 반환
* 부저로 음 출력
* 노래 시작, 중지, 일시정지

아래는 Music 클래스의 음계를 주파수로 변환하는 함수이다. 이 주파수를 부저로 출력하는 것이다.

```cpp
static const int PITCH[7];//{9,11,0,2,4,5,7}={A,B,C,D,E,F,G}
//pitchs[i]에서 옥타브 추출
int getOctave(int i){return pitches[i][pitches[i].length()-1]-'0';} 
//pitchs[i]에서 음계 추출
int getPitch(int i){return PITCH[pitches[i][0]-'A'] + (pitches[i][1]=='#');}
// 옥타브와 음계로 주파수 계산
float getFrequency(int i) {
    const float baseFreq = 32.70; //기준 주파수(1옥타브 도)
    return baseFreq * pow(2, getOctave(i)+getPitch(i)/12.0); // 주파수 반환
}
```

# 안정적인 폴링 방식

이 프로젝트는 저장된 노래를 재생하고 가사를 출력하는 MP3 player이다. 단순해 보이지만 피에조 부저로 음을 출력하고, 텍스트 LCD로 노래 가사를 출력하는 동시에 버튼으로 입력받아야 한다. 구현 방법에 따라 불안정한 시스템이 될 수도 있고, 안정적인 시스템이 될 수도 있다. 따라서 인터럽트가 아닌 폴링방식으로 구현을 하였다.

MP3Player는 무한 루프로 주기적으로 각 상태를 확인하고, 각 기능을 실행한다. 아래는 MP3Player의 start 함수이다.

```cpp
void start() {
    mp3_state = menu;
    selectMusicId = 0;
    selectedMusicName = musicList[selectMusicId].getName();
    lcdUpdate("[MP3] menu", "> "+selectedMusicName);
    //lcdUdate(첫번째 줄, 두번째 줄)

    wait(1);
    nameTimer.start();
    while (true) {
        //버튼 1 : 다음 노래, 일시 중지
        if(button1.read()){
            if(mp3_state==menu)nextMusic();
            else pauseMusic();
            restartNameTimer();
        }
        //버튼 2 : 재생, 중지
        if(button2.read()){
            if(mp3_state==menu)playMusic();
            else stopMusic();
            restartNameTimer();
        }
        //가사 출력
        if(mp3_state==playing){ 
            if(musicList[selectMusicId].update(buzzer)){
                if(lcdBuffer[1].length()+musicList[selectMusicId].getLyric().length() <=16)
                    lcdUpdate("[MP3] playing", lcdBuffer[1]+musicList[selectMusicId].getLyric());
                else lcdUpdate("[MP3] playing", "> "+musicList[selectMusicId].getLyric());
            }
            if(!musicList[selectMusicId].isPlaying()){
                stopMusic();
                restartNameTimer();
            }
        }
        //긴 제목 오른쪽 시프트
        if(mp3_state==menu && selectedMusicName.length()>14){
            if(int(nameTimer) >= selectedMusicName.length())restartNameTimer();
            lcdUpdate("[MP3] menu", "> "+selectedMusicName.substr(int(nameTimer),14));
        }
    }
}
```

# 긴 제목 시프트

본 프로젝트에서 사용된 LCD 디스플레이는 16*2로 화면의 크기가 한정되어 있어 긴 문자열을 출력하기 어렵다. 따라서 제목을 전부 출력할 수 없다면 1초마다 왼쪽으로 시프트하여 전체 제목을 볼 수 있도록 하였다.


```cpp
//긴 제목 오른쪽 시프트
if(mp3_state==menu && selectedMusicName.length()>14){
    if(int(nameTimer) >= selectedMusicName.length())restartNameTimer();
    lcdUpdate("[MP3] menu", "> "+selectedMusicName.substr(int(nameTimer),14));
    //lcdUdate(첫번째 줄, 두번째 줄)
}
```
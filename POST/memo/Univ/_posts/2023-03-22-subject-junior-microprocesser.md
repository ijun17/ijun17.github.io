---
layout: post
title: "[3학년1학기]마이크로프로세서(작성중)"
order: 32
---
*기본상식 : CISC와 RISC는 컴퓨터 아키텍처에서 사용되는 두 가지 다른 설계 철학이다.

||CISC(Complex Instruction Set Computing)|RISC(Reduced Instruction Set Computing)|
|:---:|:---:|:---:|
|명령어 개수|많음|적음|
|프로그램 크기|작음|큼|
|하드웨어 복잡도|높음|낮음|
|소프트웨어(컴파일러) 복잡도|낮음|높음|
|명령어 실행 시간|가변|고정|
|**전력 소모**|많음|적음|
|호환성|높음|낮음|
|용도|범용 컴퓨터|모바일 기기, 임베디드 시스템|

*기본상식 : MPU와 MCU는 모두 마이크로프로세서라는 공통점을 가지고 있지만, 목적과 기능에 따라 차이가 있다.

||MPU(Microprocessor Unit)|MCU(Microcontroller Unit)|
|:---:|:---:|:---:|
|목적|많고 복잡,해석오래걸림|작고 간단|
|기능|연산|연산,주변장치 제어|
|구조||적음|
|용도|느림|빠름|

# ARM Cortex-M3

ARM은 "Advanced RISC Machines"의 약자로, 저전력 마이크로프로세서 및 마이크로컨트롤러 기술을 개발하는 영국의 회사입니다. ARM 프로세서는 `RISC` 구조를 가지는 일련의 **32비트** 프로세서이다. 특징으로 **고성능 저전력**이며, 동작속도가 빠르고, 주변장치가 많으며, 모바일 기기에 많이 사용된다. 

ARM 패밀리
 1. ARM2 : ARMv2 아키텍쳐 사용(30000 트랜지스터로 구성)
 2. ARM3 : ARMv2 아키텍쳐 사용
 3. ARM4,ARM5 : 상품화되지 않음
 4. ARM6 : ARMv3 아키텍처 사용(당시 컴퓨터 시장은 IBM호환PC, Window(GUI 도입))
 5. ARM7(`ARM7TDMI`:현재의 ARM의 원형, 성공함) : ARMv4T아키텍쳐 사용(닌텐도나 아이팟에 사용)
 6. ARM9~11

 *ARM 회사는 마이크로프로세서를 직접만들지 않고 설계만해 제조회사(삼성 등)에 설계도를 IP형태로 제공하여 제작

 회사의 종류
 * IDN : 설계 생산 가능
 * **Fabless** : 설계 / ARM, 퀄컴, 앤비디아
 * Foundry : 제조 / TSMC

MIPS(Million Instructions Per Second) 
DMIPS(Dhrystone Million Instructions Per Second) : 성능을 체크하는 단위

Cortex 프로세서는 ARMv7 아키텍처를 사용한 프로세서에 사용된 새로운 패밀리 이름이다.(ARM11이후 나옴)

||Cortex-A|Cortex-R|Cortex-M|
|:---:|:---:|:---:|:---:|
|용도|Application|Real-Time|Micro Controller, FPGA|
|아키텍쳐|ARMv7-A|ARMv7-R|ARMv-M|
|명령어|ARM명령어,Thumb-2|ARM명령어,Thumb-2|Thumb-2 명령어만 사용|
|특징|**고성능**, 비싸다|오류정정기능(네트워크)|NVIC지원|

*FPGA(field programmable gate array) : 프로그래밍이 가능한 비메모리 반도체 일종, 회로 변경 가능하여 유연하다, 소량 생산용

|아키텍쳐 버전|명령어 세트|비고|
|:---:|:---:|:---:|
|~ARMv4|ARM|ARM은 32비트 명령어로 구성|
|ARMv4T~ARMv6|ARM, Thumb| Thumb는 16비트 명령어로 구성|
|ARMv7|ARM, Thumb2| Thumb2는 16비트, 32비트 명령어로 구성|

Thumb2 명령어는 C언어로 코딩하면 컴파일러가 기기에 맞게 알아서 명령어를 16비트 또는 32비트로 바꾼다.


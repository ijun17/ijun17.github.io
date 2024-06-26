---
layout: post
title: "[4학년1학기]모바일앱프로그래밍"
order: 20
---

이 강의에서는 안드로이드 스튜디오 고슴도치 버전으로 진행한다. 

스마트폰의 역사
1992년 IBM사의 사이먼 (최초)


21쪽 스마트폰 개발 환경
안드로이드 보면 자바로 


개발툴 - 옛날(이클립스), 지금(안드로이드 스튜디오)

22쪽 이책은 안드로이드 14.0를 기준으로 한다.

23쪽 qrstu 안드로이드 알파벳 순서도

SDK 무엇의 약자인가

26쪽 그림 1-3 린구스 커널

개발 환경에서 

안드로이드에서 개발 API가 들어있지 않기 때문에 다운로드가 필요하다

ADT이 무엇인가

개발환경에 응용프로그램이니가 자바로 한다.

ide 통합개발환경 외워

까나리 베타  스테이블 버전으로 

우리가 사용하는 환경이 헤치독 14.0

인텔 cpu인 경우 하드웨어 가속기 쓰면 됨

43쪽 10번 자동업데이트 끄자 > 왜냐하면 헤치독 계속 쓸라고

57쪽 요약 개인적으로 보자

58쪽 6번 별표 개인적으로 보자

**연습문제는 중요하지 않다**


63쪽 뉴프로젝트를 클릭해서 들어가면 옛날에 시험문제 프로젝트 선택에서 노 액티비티 했느냐를 시험으로 

랭기지를 사용하는 프로그래밍 랭기지로 자바 이거 옛날에 시험 나옴

별표 `메인 액티비티`(자바) `액티비티_메인`(xml) 이거 두개만 쓸거

67쪽 자동 생성되는 레이아웃이 `컨스트레인트 레이아웃`

하지만 우리는 리니어 레이아웃을 쓸것이다.

73쪽 AVD 명칭과 사용방법

프로젝트 가져오는거 이거 안해도됨()

72-4 이거 다음시간에

* 87쪽 3번: name은 프로젝트 및 응용 프로그램 이름이며 대문자로 시작하는게 좋다(컨벤션)
* 패키지 네임은 도메인 네임
* 한글 폴더명 조심
* 랭기지는 자바
* 미니멀 SDK: 실행가능한 최하 버전(우리는 API24까지 쓰자)

89쪽 우리는 리니어 레이아웃으로 변경해서 쓸것이다.

91쪽 액티비티 메인.xml은 화면을 만드는거 여기에 리니어 레이아웃을

모든 뷰와 뷰에서 상속된 것은 

아이디 형식: @+id/button1

95쪽 17번에 임폴트앞에 꺽새 **컨트롤 알트 오**를 누르면 불필요하게 임폴트된것을 제거한다

96쪽에 19번 **알트 엔터**를 누르면 자동으로 임폴트가 된다.

98쪽 예제 2-3 패키지이름은 지우면 안되고 자기거에 맞게 수정

99쪽 임폴트는 알트 엔터로 넣을 수 있다

* 9번 extends가 클래스의 상속을 받는것
* 11번 @overide는 함수 오버라이드된다는 표시해주는거 무시해도됨
* 13번 오버라이딩한 **온크리에이트 메소드**는 메인 함수와 같다
* 14번 super.은 상위 함수 부르는것
* 15번 setContentView는 xml 화면에 표시해주는것
* 버튼 원은 버튼 형식으로 캐스팅 했다. (Button) fineViewById()
* 24번 마지막에 세미콜론이 필요하다

101쪽 레이아웃 파일은 R 클래스는 **R.jar파일**에 존재한다. id string drawable

102쪽 버튼을 클릭했을때 예를 들어 **체크박스에 체크 원**

105쪽 프로젝트에서 사용되는 파일 용도
* 자바 폴더: 메인 액티비티.java 
* res 폴더: drawalbe 폴더 layout 폴더(액티비티_메인.xml) 
* value 폴더: string.xml

107쪽 프로젝트 트리에 


108쪽 9번 버튼 접근하려면 @+id/button1

컨트롤 알트 엘 - 코드 정리됨

자바는 대표적인 객체지향적 언어

c/c++언어는 구조지향


126쪽 클래스와 인스턴스

135쪽 추상클래스와 추상메소드 쓰는 목적은 공통으로 사용하는 기능을 추상 메소드로 등록해놓고 서브 클래스에서 구현하게 하기 위해서

139쪽 익명 내부 클래스는 onclick 등 주로 한번만 사용되고 버려지는 클래스이다. 

141쪽 제너릭스-공부

145쪽 연습문제 자바의 특징이 아닌것 - 자바에는 포인터가 있다(틀림)

147쪽 9번 객체 지향과 관련되지 않은거 - 클래스 정의할때 생성자 반드시 필요(x), 메소드 오버로딩은 클래스에서 메소드의 이름이 달라도 여러개 선언 가능(O), 정적필드는 파이널 키워드를 붙여야한다.(x), 정적 메소드는 클래스 변수를 선어하지 않고 사용가능(O), 자바는 클래스의 다중상속이 가능하지만 사용하지 않은게 좋음(), 추상클래스는 클래스 이름앞에 abstract 붙임(O), 추상메소드를 , 추상메소드도 필요하다면 내부 구현 가능(X), 인터페이스에는 일반 변수를 선언할 수 없지만 정적 변수는 선언할 수 있다(X), 내부 클래스는 클래스 안에 정의하는것(O)

4장 

150쪽 앱 실행화면을 실행하는 뷰

위젯 - 버튼, 체크박스 등 / 위젯을 담을 수 있는 위젯을 레이아웃

151쪽 버튼, 텍스트뷰 등을 위젯, 위젯을 담는 툴을 레이아웃

클래스 계층 - 최상위 오브젝트 > 뷰 > 뷰 그룹

154쪽 버튼, 버튼1 findViewByID

`wrapcontent`, `match-perent`

위젯 크기 조절 dp로 조절

160쪽 패딩 속성 마진 속성

166쪽 코드 설명 텍스트 뷰를 넣고 (알트 엔터) - import 자동으로 해주는것

168쪽 버튼을 클릭했을대 실행되는 자바 코드 - 

`170쪽 초 간단 계산기 앱 만들기`

179쪽 라디오 버튼과 라디오 그룹 - 모임 중에 하나만 선택 가능

180쪽 이미지 뷰를 만들때 이미지는 res/drawable 폴더에 있어야함. 

188쪽 요약 - 1번 위젯과 레이아웃 무슨 차이 / 클래스 계층 / `자바 코드에서 버튼 동작과정 3단계` / 라디오 버튼은 라디오 그룹 안에 여러개

190쪽 연습문제 - 안드로이드에서 위젯으로 불리지 않는것(레이아웃), 위젯에 아이디로 부르는거(fineViewByID), 위젯의 크기를 화면에 꽉차도록(match-parent), import 자동 추가(알트 엔터)






5장 레이아웃

194쪽 레이아웃은 뷰클래스로부터 상속 받는다

199쪽 그래비티와 레이아웃 그래비티의 차이

200쪽 직접 풀어보기 5-1번 

204쪽 

205쪽

209쪽 기타 레이아웃

225쪽 요약 주요속성

227쪽 레이아웃에서 여러 레이아웃을 겹쳐서 표현할 수 있는것을 프레임 레이아웃

여러 레이아웃을 가로 또는 세로로 배치하는 속성 orientation 

여러 레이아웃의 높이를 

xml 파일을 지웠을때 

그리드 레이아웃을 






6장








7장

270쪽 0-1메뉴(옵션메뉴, 컨텍스트 메뉴)

271쪽 xml로 옵션메뉴 그림 7-2 세가지를 설정(메뉴를 oncreatemenu, 어떤걸 선택하는가)

inplate 메뉴에 힘을


**277** 퀴즈

274 메뉴 폴더가 없으면 프로젝트 트리가서 앱의 res의 메뉴를 선택해서 만든다.

279 자바 코드로만 메뉴 만들기 가능

281쪽 컨텍스트 메뉴- 옵션메뉴하고 다르게 1234번 중에 2번이 더 들어감 resistContext

286 토스트 독특한 메소드 위치지정 - setGravity

302 요약-1번 안드로이드 앱 메뉴는 두개로 구분 2,3번 컨텍스트 메뉴에서 2번째 resistContext 추가로

303 형식

* 1번. 메뉴 xml 거리먼거-3번 레이아웃 리슨
* 2번. inplate 메뉴
* 3번. *
* 4번. resistContext
* 5번 setMultiChoiceItme





# 파일처리

308쪽 내장 메모리 저장위치 data/data/..

내장 메모리에서의 파일처리 스트리밍 열기-파일읽기-파일닫기

311쪽 일기장앱

316쪽 일기장 저장되는거 찾는법 deviceExplode

raw 파일

파일 처리 응용 sd카드 음악 영상 그림 파일 등 여러 응용 프로그램에서 사용할때

332 요약 1번 내장 메모리에서 파일 읽는 절차 **2번** 내장 데이터 저장 위치 data/data/패키지면

연습문제 2번 이전 버전에서는 ddms라고 불렸으며 ide 폴더와 파일에 접근하는 거 deviceExlore





# 그래픽과 이미지

336 화면에 도형을 그릴때 쓰는 클래스 **Canvas, Paint**

포인트는 어셈블리로 찍는다

339 클래스가 생성되거나 호출되면 생성되는 메서드 ondraw 여기서 invalidate하면 무효화

332 **invalidate하면 화면 무효화하고 ondraw를 실행** 빈칸 넣기

363 화면에 도형을 그릴때 사용하는 클래스 캔버스 페인트

364 ontouch ondraw

366 연습문제 화면을 손가랅으로 터치 했을때 / 기하학적 변화에 사용하지 않는거


기말 - select table 등 쿼리 나옴






# 기말 정리

## 1장 안드로이드
* `API(Application Programming Interface)`
* `ART(Android Run Time)`
* SQLite - 모바일 용 데이터베이스
* 안드로이드 구조
    1. **응용 프로그램**
    2. 응용 프로그램 프레임워크
    1. 라이브러리, 안드로이드 런타임
    1. **리눅스 커널**
* `AVD(Android Virtual Device)`
* 하드웨어 제어 및 커널 관련 - C,C++로 개발

## 2장 안드로이드 스튜디오
* `SDK(Software Development Kit)`
* Layout
    * ConstraintLayout
    * LinearLayout
* 위젯 속성
    * android:layout_height=
        * `"wrap_content"`
        * `"match_parent"`
* `MainActivity.java`
* `activity_main.xml`
* `ctrl+alt+o` 불필요하게 임포트된 문장 제거
* `alt+enter`필요한 패키지 임포트
* `ctrl+alt+l` 소스코드 정렬
* @Override
* (Button) findViewById(R.id.button1)
* onClick
* `R 클래스`


## 3장 자바
* 캐스트 연산자: (Button) View
* 메소드 오버로딩: 이름이 같아도 매개변수의 차이로 구분
* 상속 extends
* 추상클래스 abstract
* 익명 내부 클래스 new ClickListener { ... }
* 패키지
* 제네릭스 ArrayList< String > strList


## 4장 위젯
* View 클래스(위젯)
* Layout View를 담을 수 있는 위젯
* id 속성 "@+id/" 형식
* android:background="#000000" 색깔 16진수
* android:padding="30dp"
* android:layout_margin="20dp"
* android:visibility=
    * "invisible" 안보이는데 자리는 차지
    * "visible" 보임
    * "gone" 안보이고 자리도 차지않음
* android:enabled="false" 위젯이 동작하지 않음(버튼 클릭 안됨)
* android:rotation = "45"
* 위젯 종류 - Button, TextView, RadioGroup, RadioButton, ImageView
* 라디오 버튼은 라디오 그룹안에 존재한다.


## 5장 레이아웃
* Object > View > ViewGroup > LinearLayout
    * orientation =
        * "vertical" 수직
        * "hrizontal" 수평
    * gravity = 
        * "rightbottom"
    * layout_gravity =   자신의  위치를 부모의 어디쯤에 위치할까
        * "right"
        * "center"
        * "left"

## 6장 고급 위젯 다루기
* WebView
    * AndroidManifest.xml에 `android:usesCleartextTraffic="true"`

## 7장 메뉴와 대화상자
* 메뉴 종류 - 옵션 메뉴, 컨텍스트 메뉴
* 옵션 메뉴 코딩: XML 작성 > onCreateOptionMenu() > onOptionSelected()
* 컨텍스트 메뉴 코딩: XML 작성 > **registerForContextMenu()** > onCreateContextMenu() > onContextItemSelected() 
* `inflater`: XML 파일을 Java로 동작되게 
    * MenuInflater : onCreateOptionMenu()안에서 메뉴를 동작되게
* Toast.makeText(Context context, String message, int duration).show()
* `NoActionBar`


## 8장 파일 처리

* 내장 메모리 파일 위치: `/data/data/패키지명/files` 폴더
* 파일 처리 과정: 
    * openFileOutput() (FileOutputStream) > read() > close()
    * openFileInput() (FileInputStream) > write() > close()
* device explore

## 9장 그래픽과 이미지

* Canvas
    * drawPoint
    * rotate
    * scale
    * translate
    * skew
* Paint
    * setColor

## 10장 액티비티와 인텐트
* 4대 컴포넌트: 액티비티, 서비스,  브로드캐스트 리시버, 콘텐트 프로바이더
* 액티비티는 xml이 아니라 자바 파일임
* intent
    * 명시적 인텐트
    * 암시적 인텐트 ex) Intent.ACTION_SENDTO 문자
* 단방향 액티비티
    * startActivity
* 양방향 액티비티
    * startActivityForResult
    * setResult
* 생명주기
* 로그캣 `android.util.Log.d(tag, message)`


## 11장 어댑터뷰
* 어댑터뷰 - 리스트뷰, 익스펜더블뷰, 그리드뷰, 스피너, 갤러리 등
    * ArrayAdapter< T > 어댑터뷰에서 데이터를 채우기 위해
* 리스트뷰  
    * 리스트뷰에 나열할 내용을 미리 String 배열로 생성
    * 모양 - simple_list_item_1(기본), simple_list_item_single_choice(라디오 버튼), simple_list_item_multiple_choice(체크박스)
* 갤러리
* 스피너

## 12장 데이터베이스
* SQLite
* `DBMS(DataBase Management System)`
* `SQL(Structured Query Language)`
* SQLiteOpenHelper, SQLiteDatabase, Cursor
* create table, select, insert

## 13장 멀티미디어 구글 지도
* 오디오 MediaPlayer
    * start()
    * pause()
    * stop()
    * raw폴더에 저장
* 구글맵 구글 API 키 필요
* `CSV(comma-separated values)`

## 14장 서비스와 브로드캐스트리시버
* 서비스: 백그라운드
* 브로드캐스트리시버: 특정 메시지 받는거(예-배터리상태확인)
* 콘텐트프로바이더: 앱 내부 데이터 외부 제공
    * `URI(Uniform Resource Identifier)` - 이걸로 암시적 인텐트에 사용
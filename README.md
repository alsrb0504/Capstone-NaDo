# 단국대 커피 배달 서비스- `NaDo`
### 2022-2학기 단국대학교 캡스톤디자인2 - 1조 - `Nado` 프로젝트입니다.

</br>

<img src="https://user-images.githubusercontent.com/115008048/194301925-354e7c75-e67b-4995-bc12-d25e86ee19a0.png" width="300" height="300"/>

</br>

## Contents
### [1. Project Info](#project-info)

### [2. Team](#team)

### [3. Technology Stack](#technology-stack) 

### [4. Design](#design)

### [5. Demonstration](#demonstration)

### [6. Result](#result) 

### [7. WorkFlow](#workflow)

### [8. Timetable](#timetable)
<hr/>

<br/>

## __Project Info__
### 1. 프로젝트 도입 배경
 현대 사회에서 커피는 삶의 일부가 되었으며 이는 대학교에서도 마찬가지이다. 단국대의 경우 학생들의 선호 카페(스타벅스, 이디야 등)는 주로 학교 입구쪽에 위치하지만 학생들이 주로 활동하는 강의실, 동아리실, 기숙사는 입구와 먼 곳에 위치한 경우가 많다. 또한 학교 자체의 높은 경사와 배달 전문 업체들의 높은 배달 수수료로 인해 교내 학생들은 비싼 배달료를 지불하면서 커피를 마시거나 포기하는 경우도 종종 생긴다.
<br/><br/>
 우리는 이러한 불편함을 개선하고자 **강의를 수강하러 학교에 오르는 학생들에게 자신이 원하는 커피를 대신 픽업 및 배달하여 저렴한 가격으로 원하는 커피를 주문할 수 있는 커피 배달 서비스 `Nado! (나도!)`를 구현**하기로 했다.
<br/>
<br/>

### 2. 서비스 플로우
![프로세스](https://user-images.githubusercontent.com/65377787/204988820-7eb3cebf-220d-4972-9849-4828abb7f399.png)
#### 2-1.주문 과정
1. 주문자는 `Nado`를 통해 원하는 카페에서 메뉴를 고르고 배달 위치와 장소를 선택합니다.
2. 주문 내용을 다 작성한 후, PG사를 통해 `최종 금액(주문 금액 + 배달료)를 결제`합니다.
3. 피커(peeker)는 학교에 오르기 전, `Nado`에서 자신의 목적지와 일치하는 주문을 선택하고 배달 주문을 수락합니다.
4. 피커가 주문 내용에 적힌 카페에서 해당 메뉴를 구매한 후, 주문 장소까지 배달합니다.
5. 주문자와 피커가 만나 배달 물품(=커피)을 수령하고 최종 배달 완료 확인을 합니다. (이 과정에서 피커에게는 배달료가 지급됩니다.)

(커피를 주문하는 주문자(order)와 커피를 배달해주는 피커(peeker)가 존재한다고 가정합니다.) <br/>


## __2. 단국대학교 캡스톤디자인2 프로젝트__

#### [1번] 단국대학교 커피배달 서비스 'NaDo'
- 학교의 지리적 특성상 매번 커피를 구매할 때마다 밑에 내려갔다 오는것은 쉬운 일이 아닙니다.
- 교내의 커피숍이 지리하고 있지만 학생들이 그다지 선호하지 않죠.
- 그래서 '배달의 민족', '쿠팡이츠'와 같은 전문 배달 업체들이 있는거죠
  - 하지만 단점도 존재합니다
    - 기존에 한 잔의 커피만을 배달하기에는 최저금액에 걸려 불가한 경우가 있죠.
    - 배달 수수료 또한 절대 저렴한 가격대에 형성되어 있지 않습니다.
    - 배달물을 수령받기까지의 대기시간도 공강 시간대의 학생들에게는 충분하지 않습니다.


- 그래서 저희가 생각한 서비스는 학생 배달 서비스 플랫폼입니다
  - 학교로 올라오는 학생은 학교에 있는 학생의 커피를 배달해줍니다.
  - 커피를 가지고 올라와 주는 학생을 우리는 '피커(Picker)'로 정의했습니다.
  - 학교에 올라와야되는 '피커'는 어짜피 올라와야 되는 학교에 중간 리워드를 얻을 수 있는 기회가 되겠죠.
  - 학교 밑에까지 내려가기엔 여력이 안돼는 소비자들 또한 합리적인 수수료 지불을 통해서 원하는 가게의 커피를 맛볼 수 있는 기회가 되는 것 입니다.

## __Team__
|Name|Department|Contact|Role|
|:---:|:---:|:---:|:---:|
|태민규|Major of Software|alsrb8442@naver.com|Front_End|
|한윤호|Major of Software|hanyounho@gmail.com|Front_End|
|김민준|Major of Software|alswnssl0528@naver.com|Back_End|
|이성재|Major of Software|32173057@gmail.com|Design|

## __Technology Stack__
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white">

## __Design__
https://www.figma.com/file/9Kz1G5sZ9QJny0eph4y56j/%EC%BA%A1%EC%8A%A4%ED%86%A4-Nado-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0%3A1

<img src="https://user-images.githubusercontent.com/115008048/194719914-c44727e1-6858-42db-b250-49833995aeaf.PNG" width="800" height="400"/>


## __Demonstration__
<img src="https://user-images.githubusercontent.com/115008048/204175129-ce248e2d-11b1-4682-9bed-435e307b2785.png" width="300" height="300"/>

<a href="https://www.youtube.com/watch?v=K7Z8fX1YOMI">시연영상</a>

## __Result__
#### 결과보고서
https://github.com/alsrb0504/Capstone-NaDo/blob/main/docs/%EC%BA%A1%EC%8A%A4%ED%86%A4%20%EB%94%94%EC%9E%90%EC%9D%B8%201%EC%A1%B0_Nado_%EC%B5%9C%EC%A2%85%EB%B3%B4%EA%B3%A0%EC%84%9C.hwp

## __WorkFlow__
<img src="https://user-images.githubusercontent.com/115008048/204175623-af4c93eb-3e1a-4898-8203-d2c5169dfaca.PNG" width="1000" height=auto/>

https://github.com/alsrb0504/Capstone-NaDo/blob/main/docs/NaDo%20WBS.xlsx

## __Timetable__
주차별 발표 ppt

<img src="https://user-images.githubusercontent.com/115008048/204180289-8d4ff1fb-878d-4345-9d39-ceb759b39540.PNG" width="400" />
https://github.com/alsrb0504/Capstone-NaDo/tree/main/docs


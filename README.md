# 단국대 커피 배달 서비스 - `NaDo`
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
 현대 사회에서 커피는 삶의 일부가 되었으며 이는 대학교에서도 마찬가지입니다. 단국대의 경우 학생들의 선호 카페(스타벅스, 이디야 등)는 주로 학교 입구쪽에 위치하지만 학생들이 주로 활동하는 강의실, 동아리실, 기숙사는 입구와 먼 곳에 위치해 있습니다. 또한 학교 자체의 높은 경사와 배달 전문 업체들의 높은 배달 수수료로 인해 교내 학생들은 비싼 배달료를 지불하면서 커피를 마시거나 포기하는 경우도 종종 있습니다.
<br/><br/>
 저희는 이러한 불편함을 개선하고자 **강의를 수강하러 학교에 오르는 학생들에게 자신이 원하는 커피를 대신 픽업 및 배달하여 저렴한 가격으로 원하는 커피를 주문할 수 있는 커피 배달 서비스 `Nado! (나도!)`를 구현**하기로 했습니다.
<br/>
<br/>

### 2. 프로젝트 소개
![info](https://user-images.githubusercontent.com/65377787/204992255-ee9d7a63-3c67-4e3b-ba59-1407c62fb0f7.png)
<br/>
<br/>



### 3. 서비스 플로우
![프로세스](https://user-images.githubusercontent.com/65377787/204988820-7eb3cebf-220d-4972-9849-4828abb7f399.png)
#### 3-1. 주문 과정
1. 주문자는 `Nado`를 통해 원하는 카페에서 메뉴를 고르고 배달 위치와 장소를 선택합니다.
2. 주문 내용을 다 작성한 후, PG사를 통해 `최종 금액(주문 금액 + 배달료)를 결제`합니다.
3. 피커(picker)는 학교에 오르기 전, `Nado`에서 자신의 목적지와 일치하는 주문을 선택하고 배달 주문을 수락합니다.
4. 피커가 주문 내용에 적힌 카페에서 해당 메뉴를 구매한 후, 주문 장소까지 배달합니다.
5. 주문자와 피커가 만나 배달 물품(=커피)을 수령하고 최종 배달 완료 확인을 합니다. (이 과정에서 피커에게는 배달료가 지급됩니다.)

#### 3-2. 고려한 사항
1. 피커는 주문자가 결제한 총 금액에서 배달료(1,200 ~ 1,600원)의 금액을 건 당 수령할 수 있습니다. 이를 통해 학생들은 학교를 오를 때마다 수익을 얻을 수 있습니다.
2. 실제 PG 대행사를 등록하기 위해서는 사업자 등록증과 높은 수수료(건당 3~4%)를 지불해야 합니다. 그래서 저희는 이 부분에 대해서는 카드 등록을 할 수 있는 팝업을 구현하여 실제 카드 정보를 입력받는 것까지만 구현하고 추후 서비스가 실제로 사용된다면 쉽게 교체할 수 있도록 했습니다.
<br/>
<br/>



## __Team__
|Name|Department|Contact|Role|
|:---:|:---:|:---:|:---:|
|태민규|Major of Software|alsrb8442@naver.com|조장, 프론트엔드|
|한윤호|Major of Software|hanyounho@gmail.com|프론트엔드|
|김민준|Major of Software|alswnssl0528@naver.com|백엔드, API 설계|
|이성재|Major of Software|32173057@gmail.com|디자인, 문서 작성|
<br/>
<br/>

## __Technology Stack__
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> ![SASS-cc6699](https://user-images.githubusercontent.com/65377787/204995860-8c5cbc61-ccaa-4c0d-9d06-bbc395463322.svg)
 <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

<br/>
<br/>

## __Design__
#### 1. 전체 와이어프레임
![와이어프레임_0927](https://user-images.githubusercontent.com/65377787/204996622-1b86cd58-2b32-4bb5-8bf3-dfe634ebe4fa.png)

<br/>

#### 2. 피그마 파일
https://www.figma.com/file/9Kz1G5sZ9QJny0eph4y56j/%EC%BA%A1%EC%8A%A4%ED%86%A4-Nado-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0%3A1
<img src="https://user-images.githubusercontent.com/115008048/194719914-c44727e1-6858-42db-b250-49833995aeaf.PNG" width="800" height="400"/>
<br/>
<br/>


## __Demonstration__
#### 1. <a href="https://www.youtube.com/watch?v=K7Z8fX1YOMI">시연영상 - 유튜브 링크</a>

<br/>

#### 2. 시연영상 QR 주소
<img src="https://user-images.githubusercontent.com/115008048/204175129-ce248e2d-11b1-4682-9bed-435e307b2785.png" width="300" height="300"/>


<br/>
<br/>

## __Result__
#### 결과보고서
https://github.com/alsrb0504/Capstone-NaDo/blob/main/docs/%EC%BA%A1%EC%8A%A4%ED%86%A4%20%EB%94%94%EC%9E%90%EC%9D%B8%201%EC%A1%B0_Nado_%EC%B5%9C%EC%A2%85%EB%B3%B4%EA%B3%A0%EC%84%9C.hwp
<br/>
<br/>

## __WorkFlow__
<img src="https://user-images.githubusercontent.com/115008048/204175623-af4c93eb-3e1a-4898-8203-d2c5169dfaca.PNG" width="1000" height=auto/>

https://github.com/alsrb0504/Capstone-NaDo/blob/main/docs/NaDo%20WBS.xlsx
<br/>
<br/>

## __Timetable__
주차별 발표 ppt

<img src="https://user-images.githubusercontent.com/115008048/204180289-8d4ff1fb-878d-4345-9d39-ceb759b39540.PNG" width="400" />
https://github.com/alsrb0504/Capstone-NaDo/tree/main/docs


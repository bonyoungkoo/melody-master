# 🎵 Melody Master
[음악퀴즈 바로가기](https://dugout.kro.kr/melody-master)
<div>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/react youTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
</div>

## 소개

유튜브에서 재생되는 음악을 듣고 곡 제목을 맞히는 퀴즈 게임입니다.<br/>
랜덤으로 재생되는 음악의 일부만 듣고, 제한 시간 내에 정답을 입력해보세요!<br/>

> 반응형 디자인을 적용하여 모바일, 태블릿, 데스크탑 등 다양한 환경에서 플레이할 수 있습니다.

## 게임 방식

- 유튜브에서 랜덤으로 선택된 음악의 일부 구간이 재생됩니다.
- 제한 시간 내에 객관식 보기 중에서 정답을 선택해야 합니다.
- 정답을 맞출수록 난이도가 상승하며, 문제는 점점 어려워집니다.
- 난이도가 높아질수록 재생되는 음악의 길이가 짧아집니다.
- 시간이 초과되면 게임이 종료됩니다.
- 점수는 실시간으로 반영되며, 최종 점수를 확인할 수 있습니다.

> 게임 시작 화면에서 음악 장르를 선택할 수 있습니다.

## 기술 스택

🖥️ Client
- React (v18): 상태 변화가 많은 게임에서 동적인 UI 상태 변화를 효율적으로 관리하기 위해 사용하였습니다.
  
- TypeScript (v5): 타입을 지정함으로써 오류를 사전에 방지하고, 자동 완성 및 타입 검사 기능을 활용하기 위해 사용하였습니다.

- Recoil (v0.7): 전역 상태 관리를 간단하게 처리할 수 있어 사용하였습니다.

- Material UI (v6): 이미 디자인된 다양한 컴포넌트를 이용하여 UI를 빠르게 구성하고, 디자인의 일관성을 유지하기 위해 사용하였습니다.

- react-youtube: YouTube 영상 플레이어를 간편하게 삽입하고 제어할 수 있는 라이브러리로, 노래 재생 기능 구현에 최적화되어 있어 사용하였습니다.

- Vite (v6): 빠른 빌드를 위해 사용하였습니다.

🧩 Server
- Spring Boot (v3): API 서버를 구축하기 위해 사용하였습니다.

💾 Database
- MariaDB (v10): 관계형 데이터베이스로 사용하였습니다.

🔄 ORM
- JPA (Java Persistence API): 객체와 데이터베이스 간 매핑을 간편하게 처리할 수 있어 사용하였습니다.

🚀 Deployment
- Nginx (v1.18): 프론트엔드에서 빌드된 정적 파일을 보여주고, 백엔드 서버(Spring Boot)와의 연결도 함께 처리하기 위해 사용하였습니다. 하나의 서버에서 프론트와 백엔드를 함께 운영할 수 있도록 사용하였습니다.


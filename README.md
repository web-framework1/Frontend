# 약모아

> **약모아는 폐의약품의 올바른 배출 방법을 안내하고, 내 주변 수거함 위치를 찾아주는 친환경 캠페인 서비스입니다.**

"올바른 폐기, 우리의 환경을 지킵니다."

---

## 프로젝트 소개

- **프로젝트명**: 약모아 (YakMoa)
- **개발 환경**: VS Code, Git/GitHub, React (Vite), Flask
- **대상 사용자**: 유통기한이 지났거나 복용하지 않는 약을 올바르게 버리고 싶은 모든 시민
- **핵심 가치**:
  - **환경 보호:** 무분별한 약물 폐기로 인한 토양 및 수질 오염 방지
  - **정보 접근성:** 복잡한 폐기 절차와 수거함 위치를 쉽고 빠르게 안내
  - **참여 유도:** 퀴즈와 안심 봉투 제공을 통해 자발적인 분리배출 실천 유도

---

## 설치 및 실행 방법

이 프로젝트는 **Frontend(React)**와 **Backend(Flask)** 서버를 각각 실행해야 합니다.

### 1. 사전 준비 (Prerequisites)
* [Node.js](https://nodejs.org/)
* [Python](https://www.python.org/)
* **Kakao Maps API Key**
* **Google Gemini API Key**

### 2. Backend 실행
```bash
# 1. 가상환경 생성 (최초 1회)
python -m venv venv

# 2. 가상환경 실행
# Windows:
.\venv\Scripts\activate
# Mac/Linux: 
# source venv/bin/activate

# 3. 필수 라이브러리 설치
pip install -r requirements.txt

# 4. 서버 실행
python run.py
```

### 3. Frontend 실행
```bash
# 1. 프론트엔드 폴더로 이동
cd medicine-campaign-frontend

# 2. 의존성 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

## 주요 기능

### 1. 수거함 위치 찾기
* **카카오맵 API**를 활용하여 내 주변 약국, 보건소, 주민센터 등 폐의약품 수거함 위치를 지도에 표시합니다.
* **내 위치 기반 검색** 및 키워드(지역명) 검색을 지원하며, 길찾기 서비스와 연동됩니다.

### 2. AI 약품 판별
* **Google Gemini AI**를 활용하여 약품 사진을 업로드하거나 제품명을 입력하면, AI가 해당 약품이 의약품인지 건강기능식품인지 판별하고 올바른 폐기 방법을 안내합니다.

### 3. 안심 봉투 출력
* 가정에서 폐의약품을 모아 배출할 수 있는 전용 회수 봉투 도안을 무료로 제공합니다.
* 프린터와 연결하여 즉시 출력할 수 있는 기능을 제공합니다.

### 4. 환경 퀴즈
* 폐의약품 처리에 대한 상식을 퀴즈 형태로 재미있게 학습할 수 있습니다.
* 점수에 따른 랭킹 시스템을 통해 사용자의 참여 동기를 부여합니다.

### 5. 정보 공유
* **공지사항/이벤트:** 환경 보호 캠페인 소식과 수거함 위치 업데이트 정보를 제공합니다.
* **Q&A:** 폐기 방법에 대한 궁금증을 해결할 수 있는 자주 묻는 질문 모음입니다.
---

## 기술 스택 (Tech Stack)

##### 1. Language: JavaScript (ES6+)
##### 2. Framework/Library: React (Vite), Flask
##### 3. Routing: React Router DOM v6
##### 4. Map: React Kakao Maps SDK
##### 5. Icons: Lucide React
##### 6. HTTP Client: Axios 

---

## 디렉토리 구조 (Directory Structure)

```
medicine-campaign/
├── medicine-campaign-backend/
│   ├── venv/
│   ├── .env
│   ├── run.py
│   └── requirements.txt
│
└── medicine-campaign-frontend/
    ├── index.html
    ├── public/
    │   ├── data/ 
    └── src/
        ├── assets/
        │   ├── slide-img/
        │   └── sounds/
        ├── components/
        │   ├── board/  
        │   │   ├── BoardPreview.jsx
        │   │   └── QnaPreview.jsx
        │   ├── common/       
        │   │   ├── bar/
        │   │   │   ├── Logo.jsx
        │   │   │   ├── NavHeaderMap.jsx
        │   │   │   └── navigation-bar.jsx
        │   │   ├── button/
        │   │   │   ├── BasicButton.jsx
        │   │   │   ├── Button.jsx
        │   │   │   └── custom-button.jsx
        │   │   ├── card/
        │   │   │   └── Card.jsx
        │   │   ├── checkbox/
        │   │   │   └── Checkbox.jsx
        │   │   ├── footer/
        │   │   │   └── Footer.jsx
        │   │   ├── input/
        │   │   │   ├── Input.jsx
        │   │   │   ├── search-input.jsx
        │   │   │   └── TextInput.jsx
        │   │   ├── middle/
        │   │   │   └── Middle.jsx
        │   │   ├── ShareSNS/
        │   │   │   └── ShareSNS.jsx
        │   │   └── slider/
        │   │       └── banner-slider.jsx
        │   ├── map/
        │   │   └── KakaoMap.jsx
        │   ├── quiz/
        │   │   ├── QuizCard.jsx
        │   │   └── RankingSidebar.jsx
        │   ├── SearchAI/
        │   │   ├── ImgCard.jsx
        │   │   ├── LayoutBox.jsx
        │   │   ├── ResultCard.jsx
        │   │   ├── TextCard.jsx
        │   │   └── TopTitle.jsx
        │   └── NavBar.jsx
        ├── mock/
        │   ├── faqData.js
        │   ├── postsData.js
        │   └── quizData.js
        ├── pages/                  
        │   ├── AboutPage.jsx
        │   ├── BoardDetailPage.jsx
        │   ├── BoardPage.jsx
        │   ├── FaqDetailPage.jsx
        │   ├── FaqPage.jsx
        │   ├── MainPage.jsx
        │   ├── MapPage.jsx
        │   ├── PrinterPage.jsx
        │   ├── QuizPage.jsx
        │   └── SearchAiPage.jsx
        ├── utils/                  
        │   ├── constants/
        │   │   └── routes.js
        │   └── functions/
        │       └── utils.js
        ├── App.jsx
        ├── main.jsx  
        └── global.css
```

## Contributors
* **Team**: 한성대학교 IT공과대학 컴퓨터공학부 웹프래임워크1 5팀
* **Developer**: 강승진*(2171386), 박준서(2191214), 이시형 (2071248), 최세익(2191036)

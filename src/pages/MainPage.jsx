// src/pages/MainPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // 👈 게시판 카드에 필요해서 추가
import Card from "../components/common/card/Card.jsx";
import BasicButton from "../components/common/button/BasicButton.jsx";
// import TextInput from "../components/common/input/TextInput.jsx"; // 👈 오류가 나니 일단 주석 처리

// 👈 오류를 피하기 위해 간단한 TextInput을 여기에 임시로 만듭니다.
const SimpleTextInput = ({ placeholder, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
      className || ""
    }`}
  />
);

// 디자인 시안의 메인 페이지입니다.
function MainPage() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 2. 메인 배너 (Hero Section) */}
      <section className="relative flex h-[400px] w-full items-center justify-center bg-gray-300">
        <div className="z-10 text-center">
          <h1 className="text-5xl font-extrabold text-black">
            올바른 폐기, 우리를 지킵니다.
          </h1>
        </div>
      </section>

      {/* 3. 주요 안내 섹션 */}
      <section className="w-full max-w-6xl p-8">
        <div className="flex justify-between gap-8">
          {/* 왼쪽 안내 */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              올바른 폐의약품 처리, 우리의 환경을 지킵니다
            </h2>
            <p className="mt-4 text-gray-600">
              주소를 검색해 근처 약국 보건소 수거함 위치와 길찾기를 제공합니다.
              작은 행동이 큰 변화를 만듭니다.
            </p>
            <div className="mt-4 flex gap-4">
              <span className="h-10 w-32">
                <BasicButton variant="black">지도 검색</BasicButton>
              </span>
              <span className="h-10 w-32">
                <BasicButton variant="white">자료 검색</BasicButton>
              </span>
            </div>
          </div>
          {/* 오른쪽 빠른 안내 */}
          <div className="flex-1 rounded-lg bg-gray-100 p-6">
            <h3 className="text-xl font-semibold">빠른 안내</h3>
            <p className="mt-2 text-gray-600">
              주요 수거함을 알아보고 빠르게 버리세요. 퀴즈에 참여하여 환경상식을
              확인해보세요.
            </p>
            <div className="mt-4 flex gap-4">
              <span className="h-10 w-32">
                <BasicButton variant="black">지도 바로가기</BasicButton>
              </span>
              <span className="h-10 w-32">
                <BasicButton variant="white">퀴즈 풀기</BasicButton>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 기능 카드 섹션 (총 6개) */}
      <section className="grid w-full max-w-6xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* 카드 1: 지도 검색 및 길찾기 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">지도 검색 및 길찾기</h3>
          <p className="mt-2">
            주소 입력으로 내 주변 약국, 보건소를 확인하고 길찾기까지 한번에 이용
            가능합니다.
          </p>
        </Card>

        {/* 카드 2: 환경 영향 시각화 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">환경 영향 시각화</h3>
          <p className="mt-2">
            폐의약품이 환경에 미치는 영향을 그래프와 차트로 쉽게 확인해보세요.
          </p>
        </Card>

        {/* 카드 3: 제품명 검색 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">제품명 검색</h3>
          <p className="mt-2">
            폐기하려는 의약품을 검색하고 올바른 폐기 방법을 확인하세요.
          </p>
          {/* 👈 SimpleTextInput을 사용합니다. */}
          <div className="mt-4 flex gap-2">
            <SimpleTextInput
              placeholder="제품명 (예: 타이레놀)"
              className="flex-grow"
            />
            <BasicButton variant="black">검색</BasicButton>
          </div>
        </Card>

        {/* --- 새로 추가되는 카드들 --- */}

        {/* 새 카드 4: 게시판 / 이벤트 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">게시판 / 이벤트</h3>
          <p className="mt-2">수거 행사, 공지, 교육 자료 등을 확인하세요.</p>
          <ul className="mt-4 text-sm text-blue-700">
            <li>
              <Link to="/board/notice/1" className="hover:underline">
                [10/10] 전국 수거 캠페인 시작
              </Link>
            </li>
            <li>
              <Link to="/board/notice/2" className="hover:underline">
                [09/25] 교육 자료 업로드
              </Link>
            </li>
          </ul>
        </Card>

        {/* 새 카드 5: 퀴즈 / 미니게임 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">퀴즈 / 미니게임</h3>
          <p className="mt-2">참여형 퀴즈로 환경 지식을 쌓아보세요.</p>
          <p className="mt-4 font-semibold">
            Q. 사용한 약을 변기에 버려도 될까요?
          </p>
          <div className="mt-2 flex gap-4">
            <span className="h-8 w-16">
              <BasicButton variant="white">O</BasicButton>
            </span>
            <span className="h-8 w-16">
              <BasicButton variant="white">X</BasicButton>
            </span>
          </div>
        </Card>

        {/* 새 카드 6: 참여 방법 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">참여 방법</h3>
          <ol className="mt-2 list-decimal pl-5">
            <li>주소로 주변 수거함 찾기</li>
            <li>약품 분류 확인</li>
            <li>가까운 수거함에 배출</li>
          </ol>
        </Card>
      </section>
    </div>
  );
}

export default MainPage;

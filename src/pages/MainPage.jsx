// src/pages/MainPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Link와 useNavigate import
import Card from "../components/common/card/Card.jsx";
import BasicButton from "../components/common/button/BasicButton.jsx";
// import TextInput from "../components/common/input/TextInput.jsx"; // (이 파일이 오류 없이 작동한다면 이것을 사용)

// (TextInput이 오류날 경우를 대비한 임시 인풋 컴포넌트)
const SimpleTextInput = ({ placeholder, className, ...props }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
      className || ""
    }`}
    {...props}
  />
);

function MainPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // /map 페이지로 이동하는 함수
  const goToMapPage = () => {
    navigate("/map");
  };

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
                <BasicButton variant="black" onClick={goToMapPage}>
                  지도 검색
                </BasicButton>
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
                <BasicButton variant="black" onClick={goToMapPage}>
                  지도 바로가기
                </BasicButton>
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
        {/* 카드 1: [수정] 카드 자체를 클릭해도 지도로 이동하도록 Link로 감싸기 */}
        <Link to="/map">
          <Card className="h-60 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold">지도 검색 및 길찾기</h3>
            <p className="mt-2">
              주소 입력으로 내 주변 약국, 보건소를 확인하고 길찾기까지 한번에
              이용 가능합니다.
            </p>
          </Card>
        </Link>

        {/* 카드 2: 환경 영향 시각화 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">환경 영향 시각화</h3>
          <p className="mt-2">
            회수량에 따라 물양-하천 보호 효과를 그래프와 색상으로 직관화합니다.
          </p>
          <div className="mt-4 flex justify-around gap-2">
            <div className="flex flex-col items-center">
              <div className="h-16 w-12 rounded-lg bg-green-600 opacity-70"></div>
              <p className="mt-1 text-sm">물 보호</p>
              <p className="text-xs text-gray-500">70%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-lg bg-green-600 opacity-55"></div>
              <p className="mt-1 text-sm">하천 보호</p>
              <p className="text-xs text-gray-500">55%</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-12 rounded-lg bg-green-600 opacity-85"></div>
              <p className="mt-1 text-sm">토양 보호</p>
              <p className="text-xs text-gray-500">85%</p>
            </div>
          </div>
        </Card>

        {/* 카드 3: 제품명 검색 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">제품명 검색</h3>
          <p className="mt-2">
            제품명을 입력하면 폐약품 여부를 안내합니다. 헷갈리는 제품은
            아이콘-색상으로 강조됩니다.
          </p>
          <div className="mt-4 flex gap-2">
            <SimpleTextInput
              placeholder="제품명 (예: 타이레놀)"
              className="flex-grow"
            />
            <BasicButton variant="black">검색</BasicButton>
          </div>
        </Card>

        {/* 새 카드 4: 게시판 / 이벤트 */}
        <Card className="h-60">
          <h3 className="text-xl font-bold">게시판 / 이벤트</h3>
          <p className="mt-2">수거 행사, 공지, 교육 자료 등을 확인하세요.</p>
          <ul className="mt-4 text-sm text-blue-700">
            <li>
              <Link to="/board" className="hover:underline">
                [10/10] 전국 수거 캠페인 시작
              </Link>
            </li>
            <li>
              <Link to="/board" className="hover:underline">
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

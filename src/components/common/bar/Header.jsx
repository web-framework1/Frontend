import React from "react";
import { Link } from "react-router-dom";
import BasicButton from "../button/BasicButton"; // 경로 수정

function Header() {
  const handleFindNearby = () => {
    // "내 주변 수거함 찾기" 버튼 클릭 시 로직
    console.log("Find Nearby Clicked!");
    // 예: navigate("/map");
  };

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">
      {/* 1. 로고 */}
      <Link to="/" className="text-2xl font-bold text-black">
        약콕 지도
      </Link>

      {/* 2. 네비게이션 메뉴 */}
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/map"
              className="text-lg font-semibold text-gray-700 hover:text-black"
            >
              지도 검색
            </Link>
          </li>
          <li>
            <Link
              to="/impact"
              className="text-lg font-semibold text-gray-700 hover:text-black"
            >
              환경 영향
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="text-lg font-semibold text-gray-700 hover:text-black"
            >
              제품 검색
            </Link>
          </li>
          <li>
            <Link
              to="/board"
              className="text-lg font-semibold text-gray-700 hover:text-black"
            >
              게시판
            </Link>
          </li>
          <li>
            <Link
              to="/quiz"
              className="text-lg font-semibold text-gray-700 hover:text-black"
            >
              퀴즈
            </Link>
          </li>
        </ul>
      </nav>

      {/* 3. 수거함 찾기 버튼 */}
      <div className="h-10 w-40">
        <BasicButton variant="black" onClick={handleFindNearby}>
          내 주변 수거함 찾기
        </BasicButton>
      </div>
    </header>
  );
}

export default Header;

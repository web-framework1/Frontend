// src/pages/MapPage.jsx
import React, { useState } from "react";
import KakaoMap from "../components/common/map/KakaoMap.jsx";
import BasicButton from "../components/common/button/BasicButton.jsx";
// import TextInput from '../components/common/input/TextInput.jsx'; // (이 파일이 있다면 사용)

// (TextInput이 없다면 임시로 사용)
const SimpleTextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
  />
);

const MapPage = () => {
  // --- 1. 상태 관리 추가 ---
  // 입력창에 사용자가 입력하는 값
  const [regionInput, setRegionInput] = useState("강남구");
  // '검색하기' 버튼을 눌렀을 때 확정된 검색어
  const [searchKeyword, setSearchKeyword] = useState("");
  // KakaoMap 컴포넌트가 찾아낸 검색 결과 목록
  const [results, setResults] = useState([]);

  // --- 2. '검색하기' 버튼 클릭 시 실행될 함수 ---
  const handleSearch = () => {
    // 1. 검색어 확정
    // (예시로 "약국"이라는 키워드를 붙여줍니다. "강남구 약국"으로 검색)
    setSearchKeyword(regionInput + " 약국");

    // 2. 검색 시 기존 결과 목록 초기화 (선택 사항)
    setResults([]);
  };

  return (
    <div className="flex w-full" style={{ height: "calc(100vh - 100px)" }}>
      {" "}
      {/* 헤더 높이(약 100px) 제외 */}
      {/* 1. 왼쪽 사이드바 */}
      <div className="w-1/4 flex-shrink-0 overflow-y-auto bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">수거함 위치 검색</h2>

        <div className="mt-4">
          <label
            htmlFor="region-search"
            className="text-sm font-medium text-gray-700"
          >
            지역
          </label>
          {/* --- 3. 입력창에 value와 onChange 연결 --- */}
          <SimpleTextInput
            id="region-search"
            placeholder="예: 강남구"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
          />
        </div>

        {/* (필터 기능은 우선 생략) */}

        <div className="mt-6">
          {/* --- 4. '검색하기' 버튼에 onClick 이벤트 연결 --- */}
          <BasicButton
            variant="black"
            className="w-full"
            onClick={handleSearch}
          >
            검색하기
          </BasicButton>
        </div>

        <hr className="my-6" />

        {/* --- 5. 검색 결과 목록 --- */}
        <div className="space-y-4">
          {results.length > 0 ? (
            // results 상태를 기반으로 목록을 동적으로 생성
            results.map((place) => (
              <div key={place.id} className="rounded-lg border p-4">
                <h3 className="font-semibold">{place.place_name}</h3>
                <p className="text-sm text-gray-600">
                  {place.road_address_name || place.address_name}
                </p>
                <p className="text-xs text-gray-500">{place.phone}</p>
                <a
                  href={place.place_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block py-1 px-3 text-sm text-blue-600 hover:underline"
                >
                  상세보기
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
      {/* 2. 오른쪽 지도 영역 */}
      <div className="w-3/4 flex-grow">
        {/* --- 6. KakaoMap에 props 전달 --- */}
        <KakaoMap searchKeyword={searchKeyword} setResults={setResults} />
      </div>
    </div>
  );
};

export default MapPage;

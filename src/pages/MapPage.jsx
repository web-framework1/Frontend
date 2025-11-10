import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavHeaderMap from "@components/common/bar/NavHeaderMap";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/Footer";
import KakaoMap from "@components/map/KakaoMap";

// 지도 페이지
function MapPage() {
  const location = useLocation();

  const locationQuery = location.state?.locationQuery || "";

  const [query, setQuery] = useState(locationQuery);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log("검색어:", query);
    setResults([
      {
        id: 1,
        name: "행복약국",
        address: "서울 강남구 역삼동 123",
        hours: "09:00-18:00",
      },
      {
        id: 2,
        name: "강남보건소",
        address: "서울 강남구 논현동 456",
        hours: "09:00-17:00",
      },
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <NavHeaderMap />
      </header>

      <main className="flex-grow flex">
        <aside className="w-96 border-r border-gray-200 bg-white p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">수거함 위치 검색</h2>

          <div className="flex flex-col gap-3">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSearch={handleSearch}
              placeholder="예) 강남구 역삼동"
            />

            <div className="flex gap-2">
              <select className="flex-1 border border-gray-300 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-blue-500">
                <option>전체</option>
                <option>약국</option>
                <option>보건소</option>
              </select>
              <select className="flex-1 border border-gray-300 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-blue-500">
                <option>운영시간 전체</option>
                <option>운영중</option>
              </select>
              <CustomButton color="gray" onClick={() => alert("내 위치")}>
                내 위치
              </CustomButton>
            </div>
            <CustomButton color="gradient" onClick={handleSearch}>
              검색
            </CustomButton>
            <CustomButton color="gray" onClick={handleCurrentLocationSearch}>
              내 위치
            </CustomButton>
          </div>

          <div className="flex-grow overflow-y-auto mt-6 space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="font-bold text-lg text-green-700">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-700">{item.address}</p>
                <p className="text-xs text-gray-500 mt-1">{item.hours}</p>
                <div className="mt-3">
                  <CustomButton
                    color="blue"
                    onClick={() => alert(`${item.name} 길찾기`)}
                  >
                    길찾기
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex-grow bg-gray-200">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            지도 표시 영역
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

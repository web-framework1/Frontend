import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import NavHeaderMap from "@components/common/bar/NavHeaderMap";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/Footer";
import KakaoMap from "@components/map/KakaoMap";

function MapPage() {
  const location = useLocation();
  const locationQuery = location.state?.locationQuery || "";

  const [query, setQuery] = useState(locationQuery);
  const [results, setResults] = useState([]);

  const [searchTrigger, setSearchTrigger] = useState({
    keyword: locationQuery ? locationQuery + " 약국" : "",
    timestamp: Date.now(),
  });

  const handleSearch = () => {
    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setSearchTrigger({
      keyword: query.trim() + " 약국",
      timestamp: Date.now(),
    });
  };

  const handleCurrentLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          alert(
            `현재 위치(위도: ${lat.toFixed(4)}, 경도: ${lng.toFixed(
              4
            )}) 주변 약국을 검색합니다.`
          );
          setQuery("현재 위치");
          setSearchTrigger({
            keyword: "내 위치 약국",
            timestamp: Date.now(),
          });
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert(
            "위치 정보를 가져오는 데 실패했습니다. 브라우저의 위치 권한을 확인해주세요."
          );
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보(Geolocation)를 지원하지 않습니다.");
    }
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
            </div>
            <CustomButton color="gradient" onClick={handleSearch}>
              검색
            </CustomButton>
            <CustomButton color="gray" onClick={handleCurrentLocationSearch}>
              내 위치
            </CustomButton>
          </div>

          <p className="text-sm font-semibold text-gray-600 mt-6 mb-3">
            {searchTrigger.keyword
              ? `"${searchTrigger.keyword}" 검색 결과: ${results.length}개`
              : "지역을 검색해주세요."}
          </p>

          <div className="flex-grow overflow-y-auto mt-2 space-y-4 pr-1">
            {results.map((item, index) => (
              <div
                key={item.id || index}
                className="border rounded-lg p-4 hover:bg-green-50 cursor-pointer transition duration-150 shadow-sm"
              >
                <h3 className="font-bold text-lg text-green-700">
                  {item.place_name}
                </h3>
                <p className="text-sm text-gray-700">
                  {item.road_address_name || item.address_name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.phone || "전화번호 정보 없음"}
                </p>
                <div className="mt-3">
                  <CustomButton
                    color="blue"
                    onClick={() => {
                      window.open(
                        `https://map.kakao.com/link/to/${item.place_name},${item.y},${item.x}`,
                        "_blank"
                      );
                    }}
                  >
                    길찾기
                  </CustomButton>
                </div>
              </div>
            ))}
            {results.length === 0 && searchTrigger.keyword && (
              <p className="text-sm text-center text-gray-500 pt-10">
                검색 결과가 없습니다.
              </p>
            )}
          </div>
        </aside>

        <section className="flex-grow bg-gray-200">
          <KakaoMap searchTrigger={searchTrigger} setResults={setResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

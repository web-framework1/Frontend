import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";
import KakaoMap from "@components/map/KakaoMap";
import { CircleHelp, Map as MapIcon } from "lucide-react";

function MapPage() {
  const location = useLocation();
  const locationQuery = location.state?.locationQuery || "";

  const [query, setQuery] = useState(locationQuery);
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [isLoading, setIsLoading] = useState(false);

  const [searchTrigger, setSearchTrigger] = useState({
    keyword: locationQuery ? locationQuery + " 약국" : "",
    filter: "전체",
    timestamp: Date.now(),
  });

  const handleSearch = () => {
    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setIsLoading(true);

    let searchKeyword = query.trim();

    if (filter === "약국") {
      searchKeyword += " 약국";
    } else if (filter === "보건소") {
      searchKeyword += " 보건소";
    } else if (filter === "수거함") {
      searchKeyword = query.trim();
    } else {
      searchKeyword += " 약국";
    }

    setSearchTrigger({
      keyword: searchKeyword,
      filter: filter,
      timestamp: Date.now(),
    });
  };

  const handleCurrentLocationSearch = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          alert(
            `현재 위치(위도: ${lat.toFixed(4)}, 경도: ${lng.toFixed(
              4
            )}) 주변을 검색합니다.`
          );

          let locationKeyword = "내 위치";
          if (filter === "약국") locationKeyword += " 약국";
          else if (filter === "보건소") locationKeyword += " 보건소";

          setQuery("현재 위치");
          setSearchTrigger({
            keyword: locationKeyword,
            filter: filter,
            timestamp: Date.now(),
          });
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert(
            "위치 정보를 가져오는 데 실패했습니다. 브라우저 권한을 확인해주세요."
          );
          setIsLoading(false);
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <NavigationBar />
      </header>

      <main className="flex-grow flex w-full max-w-7xl mx-auto px-6 py-0 min-h-0">
        <div className="flex w-full h-full border-x border-gray-200 bg-white shadow-sm">
          {/* 왼쪽 사이드바 */}
          <aside className="w-96 border-r border-gray-200 flex flex-col z-10">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-green-600" />
                  수거함 위치 검색
                </h2>
                <button
                  className="text-gray-400 hover:text-green-600 transition-colors"
                  onClick={() =>
                    alert(
                      "주소를 입력하거나 '내 위치' 버튼을 눌러 주변 수거함을 찾아보세요."
                    )
                  }
                  title="도움말"
                >
                  <CircleHelp className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <SearchInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onSearch={handleSearch}
                  placeholder="예) 강남구 역삼동"
                />

                <div className="flex gap-2">
                  <select
                    className="flex-1 border border-gray-300 rounded-lg h-9 px-2 text-sm focus:outline-none focus:border-green-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="전체">전체</option>
                    <option value="약국">약국</option>
                    <option value="보건소">보건소</option>
                    <option value="수거함">수거함(공공)</option>
                  </select>
                  <select className="flex-1 border border-gray-300 rounded-lg h-9 px-2 text-sm focus:outline-none focus:border-green-500">
                    <option>운영시간 전체</option>
                    <option>운영중</option>
                  </select>
                  <CustomButton
                    color="gray"
                    onClick={handleCurrentLocationSearch}
                  >
                    내 위치
                  </CustomButton>
                </div>

                <CustomButton
                  color="gradient"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "검색 중..." : "가까운 수거함 찾기"}
                </CustomButton>
              </div>
            </div>

            {/* 결과 목록 영역 */}
            <div className="flex-grow overflow-y-auto p-0 bg-white">
              <p className="text-xs font-semibold text-gray-500 px-5 py-3 bg-gray-50 border-b border-gray-100">
                {searchTrigger.keyword
                  ? `"${searchTrigger.keyword}" 검색 결과: ${
                      isLoading ? "..." : results.length + "개"
                    }`
                  : "지역을 검색해주세요."}
              </p>

              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                  <p>검색 중입니다...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {results.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-5 hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <h3 className="font-bold text-base text-green-700 mb-1">
                        {item.place_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.road_address_name || item.address_name}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        📞 {item.phone || "전화번호 정보 없음"}
                      </p>
                      <div className="mt-3 flex justify-end">
                        <CustomButton
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation();
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
                </div>
              ) : (
                searchTrigger.keyword && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                    <p>검색 결과가 없습니다.</p>
                  </div>
                )
              )}
            </div>
          </aside>

          {/* 오른쪽 지도 영역 */}
          <section className="flex-grow bg-gray-100 relative">
            <KakaoMap
              searchTrigger={searchTrigger}
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

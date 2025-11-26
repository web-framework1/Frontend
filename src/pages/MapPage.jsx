import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// 실제 컴포넌트 Import
import NavHeaderMap from "@components/common/bar/NavHeaderMap"; // 분리된 헤더
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/Footer";
import KakaoMap from "@components/map/KakaoMap"; // 경로 확인

function MapPage() {
  const location = useLocation();
  // 메인 페이지 등에서 넘어온 검색어 처리
  const locationQuery = location.state?.locationQuery || "";

  // 입력창 상태
  const [query, setQuery] = useState(locationQuery);

  // 검색 결과 리스트 상태
  const [results, setResults] = useState([]);

  // 필터 상태 ('전체', '약국', '보건소', '수거함')
  const [filter, setFilter] = useState("전체");

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 검색 트리거 (KakaoMap에 전달하여 검색 실행)
  const [searchTrigger, setSearchTrigger] = useState({
    keyword: locationQuery ? locationQuery + " 약국" : "",
    filter: "전체",
    timestamp: Date.now(),
  });

  // 검색 핸들러
  const handleSearch = () => {
    if (!query.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setIsLoading(true); // 로딩 시작

    let searchKeyword = query.trim();

    // 필터에 따른 검색어 조합
    if (filter === "약국") {
      searchKeyword += " 약국";
    } else if (filter === "보건소") {
      searchKeyword += " 보건소";
    } else if (filter === "수거함") {
      // 수거함 필터일 때는 지역명만 유지 (KakaoMap 내부에서 필터링)
      searchKeyword = query.trim();
    } else {
      // 전체일 때는 약국 키워드 기본 추가
      searchKeyword += " 약국";
    }

    // 트리거 업데이트 -> KakaoMap useEffect 실행
    setSearchTrigger({
      keyword: searchKeyword,
      filter: filter, // 필터 정보도 함께 전달
      timestamp: Date.now(),
    });
  };

  // 내 위치 검색 핸들러
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
          // 내 위치 검색 시에도 필터 적용
          if (filter === "약국") locationKeyword += " 약국";
          else if (filter === "보건소") locationKeyword += " 보건소";
          // 수거함이나 전체일 때는 "내 위치"만 보냄 (KakaoMap에서 처리)

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
              <select
                className="flex-1 border border-gray-300 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="약국">약국</option>
                <option value="보건소">보건소</option>
                <option value="수거함">수거함(공공)</option>
              </select>
              <select className="flex-1 border border-gray-300 rounded-lg h-10 px-3 text-sm focus:outline-none focus:border-blue-500">
                <option>운영시간 전체</option>
                <option>운영중</option>
              </select>
            </div>

            <CustomButton color="gray" onClick={handleCurrentLocationSearch}>
              내 위치
            </CustomButton>

            <CustomButton
              color="gradient"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? "검색 중..." : "가까운 수거함 찾기"}
            </CustomButton>
          </div>

          <p className="text-sm font-semibold text-gray-600 mt-6 mb-3">
            {searchTrigger.keyword
              ? `"${searchTrigger.keyword}" 검색 결과: ${
                  isLoading ? "..." : results.length + "개"
                }`
              : "지역을 검색해주세요."}
          </p>

          <div className="flex-grow overflow-y-auto mt-2 space-y-4 pr-1">
            {isLoading ? (
              <div className="text-sm text-center text-gray-500 pt-10">
                검색 중입니다...
              </div>
            ) : results.length > 0 ? (
              results.map((item, index) => (
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
                        // 길찾기 링크
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
              ))
            ) : (
              searchTrigger.keyword && (
                <p className="text-sm text-center text-gray-500 pt-10">
                  검색 결과가 없습니다.
                </p>
              )
            )}
          </div>
        </aside>

        <section className="flex-grow bg-gray-200">
          <KakaoMap
            searchTrigger={searchTrigger}
            setResults={setResults}
            setIsLoading={setIsLoading}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

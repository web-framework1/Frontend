import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@components/common/bar/logo";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";

// 1. useKakaoLoader 훅을 import 목록에서 제거합니다.
import { Map, MapMarker } from "react-kakao-maps-sdk";

// --- MapPageHeader (변경 없음) ---
const NavigationItem = ({ text, url }) => {
  return (
    <Link
      to={url}
      className="
      font-semibold text-gray-700 hover:text-green-700 
      px-3 py-auto rounded-lg hover:bg-green-200 transition-colors
      "
    >
      {text}
    </Link>
  );
};
const MapPageHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between px-6 py-3">
      <Logo />
      <div className="flex items-center gap-5">
        <nav>
          <ul className="flex gap-5 list-none items-center">
            <li>
              <NavigationItem text="지도" url="/map" />
            </li>
            <li>
              <NavigationItem text="안심 봉투" url="/safe-bag" />
            </li>
            <li>
              <NavigationItem text="AI약품검색" url="/ai-search" />
            </li>
            <li>
              <NavigationItem text="퀴즈" url="/quiz" />
            </li>
            <li>
              <NavigationItem text="게시판" url="/board" />
            </li>
          </ul>
        </nav>
        <CustomButton
          type="button"
          color="gradient"
          onClick={() => {
            navigate("/map");
          }}
        >
          내 주변 수거함 찾기
        </CustomButton>
      </div>
    </div>
  );
};

// --- MapPage 본체 ---
function MapPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [markers, setMarkers] = useState([]);

  // 2. useKakaoLoader 훅을 제거합니다. (loading, error 상태도 제거)

  const handleSearch = () => {
    console.log("검색어:", query);
    const fakeResults = [
      {
        id: 1,
        name: "행복약국",
        address: "서울 강남구 역삼동 123",
        hours: "09:00-18:00",
        lat: 37.500565,
        lng: 127.036371,
      },
      {
        id: 2,
        name: "강남보건소",
        address: "서울 강남구 논현동 456",
        hours: "09:00-17:00",
        lat: 37.51025,
        lng: 127.030954,
      },
    ];
    setResults(fakeResults);
    setMarkers(fakeResults);
    if (fakeResults.length > 0) {
      setMapCenter({
        lat: fakeResults[0].lat,
        lng: fakeResults[0].lng,
      });
    }
  };

  return (
    // 3. 레이아웃 고정을 위해 h-screen을 적용합니다.
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <MapPageHeader />
      </header>

      {/* 4. min-h-0을 추가하여 flex-grow가 올바르게 계산되도록 합니다. */}
      <main className="flex-grow flex min-h-0">
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
              가까운 수거함 찾기
            </CustomButton>
          </div>
          {/* 5. 사이드바가 스크롤되도록 overflow-y-auto를 추가합니다. */}
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

        {/* 6. 지도를 감싸는 <section>에 relative를 추가합니다. */}
        <section className="flex-grow relative">
          <Map
            center={mapCenter}
            // 7. Map 스타일에 absolute를 적용하여 <section>을 꽉 채웁니다.
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            level={4}
          >
            {markers.map((marker) => (
              <MapMarker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
              >
                <div style={{ padding: "5px", color: "#000" }}>
                  {marker.name}
                </div>
              </MapMarker>
            ))}
          </Map>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

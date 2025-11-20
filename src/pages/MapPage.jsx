import React from "react";
// 1. useEffect 훅을 import합니다.
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// --- (오류 해결을 위한 임시 컴포넌트 - 실제 프로젝트에서는 삭제) ---
const Logo = () => (
  <Link to="/" className="text-2xl font-bold text-green-700">
    약모아
  </Link>
);
const SearchInput = ({ value, onChange, onSearch, placeholder }) => (
  <div className="flex">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-grow border border-gray-300 rounded-l-lg h-10 px-3 text-sm focus:outline-none focus:border-blue-500"
    />
    <button
      onClick={onSearch}
      className="bg-blue-500 text-white h-10 px-4 rounded-r-lg"
    >
      검색
    </button>
  </div>
);
const CustomButton = ({ children, color, onClick, type = "button" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold text-white";
  const colorStyles = {
    gradient: "bg-gradient-to-r from-green-500 to-blue-500",
    gray: "bg-gray-500",
    blue: "bg-blue-500",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${colorStyles[color] || "bg-gray-500"}`}
    >
      {children}
    </button>
  );
};
const Footer = () => (
  <footer className="p-6 text-center text-gray-500 bg-gray-100">
    © 2025 약모아. All rights reserved.
  </footer>
);
// --- (임시 컴포넌트 끝) ---

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
              <NavigationItem text="안심 봉투" url="/printer" />
            </li>
            <li>
              <NavigationItem text="AI약품검색" url="/searchAi" />
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

// --- (지도 페이지) ---

function MapPage() {
  const location = useLocation();
  const locationQuery = location.state?.locationQuery || "";

  const [query, setQuery] = useState(locationQuery);
  // 2. results는 빈 배열로 시작합니다.
  const [results, setResults] = useState([]);
  const [mapState, setMapState] = useState({
    // 3. 지도의 중심을 서울시청으로 기본 설정합니다.
    center: {
      lat: 37.566826,
      lng: 126.9786567,
    },
    level: 3,
  });

  // 4. 카카오맵 '키워드 검색' API를 호출하는 함수
  const searchPlaces = (searchQuery) => {
    if (!searchQuery.trim()) return; // 빈 검색어는 무시
    if (!window.kakao || !window.kakao.maps.services) {
      alert(
        "카카오맵 서비스가 로드되지 않았습니다. index.html을 확인해주세요."
      );
      return;
    }

    // 장소 검색 객체를 생성합니다
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 목록을 state에 저장합니다
        const newResults = data.map((item) => ({
          id: item.id,
          name: item.place_name,
          address: item.road_address_name || item.address_name,
          hours: "운영시간 정보 없음", // API에서 운영시간은 제공하지 않습니다
          lat: parseFloat(item.y),
          lng: parseFloat(item.x),
        }));
        setResults(newResults);

        // 5. 검색 결과가 있으면 첫 번째 결과로 지도를 이동시킵니다
        if (newResults.length > 0) {
          setMapState({
            center: { lat: newResults[0].lat, lng: newResults[0].lng },
            level: 3,
          });
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
        setResults([]);
      } else {
        alert("검색 중 오류가 발생했습니다.");
        setResults([]);
      }
    });
  };

  // 6. 검색 버튼 클릭 시 호출될 핸들러
  const handleSearch = () => {
    searchPlaces(query);
  };

  // 7. '내 위치' 버튼 클릭 시 호출될 핸들러
  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // 1. 내 위치로 지도를 이동시킵니다
          setMapState({ center: { lat, lng }, level: 3 });

          // 2. 내 위치 주변의 '약국'을 검색합니다
          if (!window.kakao || !window.kakao.maps.services) return;
          const ps = new window.kakao.maps.services.Places();
          const searchOptions = {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 2000, // 2km 반경
            sort: window.kakao.maps.services.SortBy.DISTANCE, // 거리순 정렬
          };

          ps.keywordSearch(
            "약국",
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const newResults = data.map((item) => ({
                  id: item.id,
                  name: item.place_name,
                  address: item.road_address_name || item.address_name,
                  hours: "운영시간 정보 없음",
                  lat: parseFloat(item.y),
                  lng: parseFloat(item.x),
                }));
                setResults(newResults);
                setQuery("내 위치 주변 약국"); // 검색창 텍스트 업데이트
              } else {
                alert("내 위치 주변에서 약국을 찾지 못했습니다.");
              }
            },
            searchOptions
          );
        },
        () => {
          // Linter 경고를 피하기 위해 _err로 변경
          alert("위치 정보를 가져오는 데 실패했습니다.");
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  // 8. 페이지가 처음 로드될 때, 메인 페이지에서 넘어온 검색어가 있으면 바로 검색합니다
  useEffect(() => {
    if (locationQuery) {
      searchPlaces(locationQuery);
    }
  }, [locationQuery]); // locationQuery가 변경될 때만 실행

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <MapPageHeader />
      </header>

      <main className="flex-grow flex">
        <aside className="w-96 border-r border-gray-200 bg-white p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4">수거함 위치 검색</h2>

          <div className="flex flex-col gap-3">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSearch={handleSearch}
              placeholder="예) 강남구 역삼동, 행복약국"
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
              {/* 9. '내 위치' 버튼에 handleMyLocation 함수를 연결합니다 */}
              <CustomButton color="gray" onClick={handleMyLocation}>
                내 위치
              </CustomButton>
            </div>

            <CustomButton color="gradient" onClick={handleSearch}>
              가까운 수거함 찾기
            </CustomButton>
          </div>

          <div className="flex-grow overflow-y-auto mt-6 space-y-4">
            {/* 10. results가 비어있을 때 안내 메시지를 표시합니다 */}
            {results.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                검색 결과가 없습니다.
                <br />
                장소, 주소 등을 검색해보세요.
              </p>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                  // 11. (선택사항) 리스트 항목 클릭 시 해당 위치로 지도 이동
                  onClick={() =>
                    setMapState({
                      center: { lat: item.lat, lng: item.lng },
                      level: 3,
                    })
                  }
                >
                  <h3 className="font-bold text-lg text-green-700 cursor-pointer">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-700">{item.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.hours}</p>
                  <div className="mt-3">
                    {/* 12. '길찾기' 버튼이 카카오맵 길찾기 새 창을 열도록 수정합니다 */}
                    <CustomButton
                      color="blue"
                      onClick={() =>
                        window.open(
                          `https://map.kakao.com/link/to/${item.name},${item.lat},${item.lng}`,
                          "_blank"
                        )
                      }
                    >
                      길찾기
                    </CustomButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        <section className="flex-grow">
          <Map
            center={mapState.center}
            level={mapState.level}
            style={{ width: "100%", height: "100%" }}
            animate={{ duration: 500 }}
          >
            {results.map((item) => (
              <MapMarker
                key={item.id}
                position={{ lat: item.lat, lng: item.lng }}
                title={item.name}
              />
            ))}
          </Map>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MapPage;

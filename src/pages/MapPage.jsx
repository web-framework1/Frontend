import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { CircleHelp } from "lucide-react";

function MapPage() {
  const location = useLocation();
  const locationQuery = location.state?.locationQuery || "";

  const [query, setQuery] = useState(locationQuery);
  const [results, setResults] = useState([]);

  // 초기 위치 (한성대학교)
  const [mapCenter, setMapCenter] = useState({
    lat: 37.582402,
    lng: 127.010229,
  });
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState([]);

  const searchPlaces = (searchQuery) => {
    if (!searchQuery.trim()) return;

    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert("카카오맵 서비스가 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newResults = data.map((item) => ({
          id: item.id,
          name: item.place_name,
          address: item.road_address_name || item.address_name,
          hours: "운영시간 정보 없음",
          lat: parseFloat(item.y),
          lng: parseFloat(item.x),
          url: item.place_url,
        }));
        setResults(newResults);
        setMarkers(newResults);

        if (newResults.length > 0) {
          setMapCenter({ lat: newResults[0].lat, lng: newResults[0].lng });
          setLevel(3);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
        setResults([]);
        setMarkers([]);
      } else {
        alert("검색 중 오류가 발생했습니다.");
        setResults([]);
        setMarkers([]);
      }
    });
  };

  const handleSearch = () => {
    searchPlaces(query);
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setMapCenter({ lat, lng });
          setLevel(3);

          if (!window.kakao || !window.kakao.maps.services) return;
          const ps = new window.kakao.maps.services.Places();
          const searchOptions = {
            location: new window.kakao.maps.LatLng(lat, lng),
            radius: 2000,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
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
                  url: item.place_url,
                }));
                setResults(newResults);
                setMarkers(newResults);
                setQuery("내 위치 주변 약국");
              }
            },
            searchOptions
          );
        },
        () => alert("위치 정보를 가져오는 데 실패했습니다.")
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    if (locationQuery) {
      searchPlaces(locationQuery);
    }
  }, [locationQuery]);

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* --- 헤더 영역 --- */}
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <NavigationBar />
      </header>

      {/* --- 메인 컨텐츠 영역 --- */}
      <main className="flex-grow flex w-full max-w-7xl mx-auto px-6 py-0 min-h-0">
        <div className="flex w-full h-full border-x border-gray-200 bg-white shadow-sm">
          {/* --- 왼쪽 사이드바 (검색 및 결과 목록) --- */}
          <aside className="w-96 border-r border-gray-200 flex flex-col z-10">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
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
                  placeholder="예) 한성대학교, 삼선동 약국"
                />
                <div className="flex gap-2">
                  <select className="flex-1 border border-gray-300 rounded-lg h-9 px-2 text-sm focus:outline-none focus:border-green-500">
                    <option>전체</option>
                    <option>약국</option>
                    <option>보건소</option>
                  </select>
                  <select className="flex-1 border border-gray-300 rounded-lg h-9 px-2 text-sm focus:outline-none focus:border-green-500">
                    <option>운영시간 전체</option>
                    <option>운영중</option>
                  </select>
                  <CustomButton color="gray" onClick={handleMyLocation}>
                    내 위치
                  </CustomButton>
                </div>
                <CustomButton color="gradient" onClick={handleSearch}>
                  가까운 수거함 찾기
                </CustomButton>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-0 bg-white">
              {results.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                  <p>검색 결과가 없습니다.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 hover:bg-green-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setMapCenter({ lat: item.lat, lng: item.lng });
                        setLevel(3);
                      }}
                    >
                      <h3 className="font-bold text-base text-green-700 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.address}</p>
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        🕒 {item.hours}
                      </p>
                      <div className="mt-3 flex justify-end">
                        <CustomButton
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://map.kakao.com/link/to/${item.name},${item.lat},${item.lng}`,
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
              )}
            </div>
          </aside>

          {/* --- 오른쪽 지도 영역 --- */}
          <section className="flex-grow bg-gray-100 relative">
            <Map
              center={mapCenter}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              level={level}
              onZoomChanged={(map) => setLevel(map.getLevel())}
            >
              {markers.map((marker) => (
                <MapMarker
                  key={marker.id}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={marker.name}
                >
                  <div style={{ padding: "5px", color: "#000" }}>
                    {marker.name}
                  </div>
                </MapMarker>
              ))}
            </Map>
          </section>
        </div>
      </main>

      {/* --- 푸터 영역 --- */}
      <Footer />
    </div>
  );
}

export default MapPage;

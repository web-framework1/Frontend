// src/components/common/map/KakaoMap.jsx
import React, { useEffect, useRef, useState } from "react";

// 부모로부터 searchKeyword와 setResults 함수를 props로 받음
const KakaoMap = ({ searchKeyword, setResults }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null); // 지도 인스턴스
  const [markers, setMarkers] = useState([]); // 마커 배열

  // --- 1. 지도 초기 로드 (맨 처음 한 번만 실행) ---
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심: 서울 시청
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance); // 생성된 지도 인스턴스를 state에 저장
      });
    }
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  // --- 2. searchKeyword가 변경될 때마다 검색 실행 ---
  useEffect(() => {
    // 지도 인스턴스나 검색어가 없으면 실행 중단
    if (!map || !searchKeyword) {
      return;
    }

    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // --- 검색 성공 시 ---

        // 1. 부모 컴포넌트(MapPage)의 results 상태 업데이트
        setResults(data);

        // 2. 기존 마커들 제거
        markers.forEach((marker) => marker.setMap(null));

        const newMarkers = [];
        const bounds = new window.kakao.maps.LatLngBounds(); // 지도 범위를 재설정할 객체

        data.forEach((place) => {
          // 3. 새 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          newMarkers.push(marker);

          // 4. 지도 범위에 현재 마커 위치 추가
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        // 5. 새 마커 목록을 state에 저장 (나중에 지우기 위해)
        setMarkers(newMarkers);

        // 6. 모든 마커가 보이도록 지도 범위 조정
        map.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        // --- 검색 결과가 없을 경우 ---
        alert("검색 결과가 없습니다.");
        setResults([]);
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
      } else {
        // --- 검색 중 오류 발생 시 ---
        alert("검색 중 오류가 발생했습니다.");
        setResults([]);
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
      }
    });
  }, [searchKeyword, map, setResults]); // searchKeyword나 map이 바뀔 때마다 실행

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;

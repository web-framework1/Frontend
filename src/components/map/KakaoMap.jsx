import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ searchKeyword, setResults }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance);
      });
    }
  }, []);

  useEffect(() => {
    if (!map || !searchKeyword) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setResults(data);

        markers.forEach((marker) => marker.setMap(null));

        const newMarkers = [];
        const bounds = new window.kakao.maps.LatLngBounds();

        data.forEach((place) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          newMarkers.push(marker);

          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        setMarkers(newMarkers);

        map.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 없습니다.");
        setResults([]);
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
      } else {
        alert("검색 중 오류가 발생했습니다.");
        setResults([]);
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
      }
    });
  }, [searchKeyword, map, setResults]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;

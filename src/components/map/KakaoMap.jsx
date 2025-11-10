import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ searchTrigger, setResults }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentInfowindow, setCurrentInfowindow] = useState(null);

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
    const { keyword } = searchTrigger;

    if (!map || !keyword) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
      setResults([]);
      return;
    }

    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    setResults([]);
    if (currentInfowindow) {
      currentInfowindow.close();
      setCurrentInfowindow(null);
    }

    const ps = new window.kakao.maps.services.Places();

    if (keyword.startsWith("내 위치")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const searchTerm = keyword.replace("내 위치", "").trim();

            ps.keywordSearch(
              searchTerm,
              (data, status) => {
                handleSearchResult(data, status, map);
              },
              {
                location: new window.kakao.maps.LatLng(lat, lng),
                radius: 5000,
                sort: window.kakao.maps.services.SortBy.DISTANCE,
              }
            );
          },
          () => {
            alert("위치 정보를 가져오는 데 실패했습니다.");
          }
        );
      }
    } else {
      const searchOptions = {
        location: map.getCenter(),
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.ACCURACY,
      };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          handleSearchResult(data, status, map);
        },
        searchOptions
      );
    }
  }, [searchTrigger, map, setResults]);

  const handleSearchResult = (data, status, mapInstance) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setResults(data);

      const newMarkers = [];
      const bounds = new window.kakao.maps.LatLngBounds();

      data.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: markerPosition,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;width:150px;text-overflow:ellipsis;">${place.place_name}</div>`,
          removable: true,
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          if (currentInfowindow) {
            currentInfowindow.close();
          }
          infowindow.open(mapInstance, marker);
          setCurrentInfowindow(infowindow);
          mapInstance.panTo(markerPosition);
        });

        newMarkers.push(marker);

        bounds.extend(markerPosition);
      });

      setMarkers(newMarkers);

      if (data.length > 0) {
        mapInstance.setBounds(bounds);
      }
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setResults([]);
    } else {
      alert("검색 중 오류가 발생했습니다.");
      setResults([]);
    }
  };

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;

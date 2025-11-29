import React, { useEffect, useRef, useState } from "react";
import pillMarkerImg from "@assets/pill.png";

const KakaoMap = ({ searchTrigger, setResults, setIsLoading }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentInfowindow, setCurrentInfowindow] = useState(null);

  // 대용량 수거함 데이터를 저장할 상태
  const [pharmacyData, setPharmacyData] = useState([]);

  // 1. JSON 데이터 로드 (구조: { fields: [], records: [] })
  useEffect(() => {
    console.log(" 수거함 데이터 로딩 시작...");

    fetch("/data/pharmacies.json") // public/data/pharmacies.json 경로
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 응답이 JSON인지 확인 (HTML 404 에러 방지용)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") === -1) {
          return response.text().then((text) => {
            throw new Error(
              `JSON이 아닌 응답입니다. (HTML 등): ${text.substring(0, 50)}...`
            );
          });
        }
        return response.json();
      })
      .then((jsonData) => {
        // jsonData.records 배열을 사용
        // 만약 records가 없다면 jsonData 자체가 배열인지 확인하여 처리
        const records =
          jsonData.records || (Array.isArray(jsonData) ? jsonData : []);

        if (records.length === 0) {
          console.warn(
            " 데이터가 비어있거나 records 키를 찾을 수 없습니다.",
            jsonData
          );
        }

        // 데이터 변환
        const formattedData = records.map((item, index) => ({
          id: `db_${index}`,
          place_name: item["설치장소명"],
          road_address_name:
            item["소재지도로명주소"] || item["소재지지번주소"] || "",
          phone: item["관리기관전화번호"] || "",
          y: item["위도"],
          x: item["경도"],
          type: "수거함", // 구분용 타입
          is_db_data: true,
        }));

        console.log(` 수거함 데이터 ${formattedData.length}개 로드 완료`);
        setPharmacyData(formattedData);
      })
      .catch((error) => {
        console.error(" 수거함 데이터 로드 실패:", error);
        // 데이터 로드 실패해도 앱이 죽지 않도록 빈 배열 설정
        setPharmacyData([]);
      });
  }, []);

  // 2. 지도 초기화
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5,
        };
        const mapInstance = new window.kakao.maps.Map(
          mapContainer.current,
          options
        );
        setMap(mapInstance);
      });
    }
  }, []);

  // 3. 검색 실행 로직
  useEffect(() => {
    const { keyword, filter } = searchTrigger;

    if (!map || !keyword) {
      if (keyword === "") {
        clearMap();
        setResults([]);
      }
      if (setIsLoading) setIsLoading(false);
      return;
    }

    clearMap(); // 마커 및 인포윈도우 초기화

    // 검색어 파싱 (예: "마포구 약국" -> "마포구")
    const searchTerms = keyword.split(" ");
    // "내 위치"로 시작하면 전체 데이터 대상, 아니면 첫 단어(지역명)로 필터링
    const regionTerm = searchTerms[0] === "내" ? "전체" : searchTerms[0];

    // 수거함 데이터 필터링
    const filteredMockData = pharmacyData.filter((item) => {
      const addr = item.road_address_name || "";
      const name = item.place_name || "";

      // 지역명이 주소나 이름에 포함되어 있는지 확인 (간단한 검색)
      const isRegionMatch =
        regionTerm === "전체" ||
        addr.includes(regionTerm) ||
        name.includes(regionTerm);

      // 필터 조건 ("수거함" 또는 "전체"일 때만 포함)
      if (filter === "수거함") return isRegionMatch;
      if (filter === "전체") return isRegionMatch;

      return false;
    });

    // "수거함" 필터일 경우: 카카오 API 호출 없이 JSON 데이터만 표시
    if (filter === "수거함") {
      handleSearchResult(
        filteredMockData,
        window.kakao.maps.services.Status.OK,
        map
      );
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    // 내 위치 검색
    if (keyword.startsWith("내 위치")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            let searchTerm = keyword.replace("내 위치", "").trim();
            if (!searchTerm) searchTerm = "약국";

            ps.keywordSearch(
              searchTerm,
              (data, status) => {
                // JSON 데이터 + 카카오 데이터 합치기
                const combinedData = [...filteredMockData, ...data];
                handleSearchResult(combinedData, status, map);
              },
              { location: new window.kakao.maps.LatLng(lat, lng), radius: 5000 }
            );
          },
          () => {
            alert("위치 정보 오류");
            if (setIsLoading) setIsLoading(false);
          }
        );
      }
    } else {
      // 일반 검색
      const searchOptions = {
        location: map.getCenter(),
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.ACCURACY,
      };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          let finalData = filteredMockData;

          // 카카오 검색 성공 시 데이터 병합
          if (status === window.kakao.maps.services.Status.OK) {
            finalData = [...filteredMockData, ...data];
          }

          // 데이터가 하나라도 있으면 결과 표시
          if (finalData.length > 0) {
            handleSearchResult(
              finalData,
              window.kakao.maps.services.Status.OK,
              map
            );
          } else {
            handleSearchResult(
              [],
              window.kakao.maps.services.Status.ZERO_RESULT,
              map
            );
          }
        },
        searchOptions
      );
    }
  }, [searchTrigger, map, setResults, setIsLoading, pharmacyData]);

  // 마커 및 결과 초기화 함수
  const clearMap = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
    if (currentInfowindow) {
      currentInfowindow.close();
      setCurrentInfowindow(null);
    }
  };

  // 4. 결과 처리 및 마커 표시
  const handleSearchResult = (data, status, mapInstance) => {
    if (setIsLoading) setIsLoading(false);

    if (status === window.kakao.maps.services.Status.OK || data.length > 0) {
      setResults(data);

      const newMarkers = [];
      const bounds = new window.kakao.maps.LatLngBounds();

      data.forEach((place) => {
        // 좌표가 유효한지 확인
        if (!place.y || !place.x) return;

        const lat = parseFloat(place.y);
        const lng = parseFloat(place.x);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);

        let imageSrc;
        let imageSize;

        // 수거함 데이터(type='수거함')는 pill.png 사용
        if (place.type === "수거함") {
          imageSrc = pillMarkerImg;
          imageSize = new window.kakao.maps.Size(35, 35); // 알약 이미지 크기
        } else {
          // 일반 약국 데이터는 카카오 기본 마커
          imageSrc =
            "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
          imageSize = new window.kakao.maps.Size(24, 35);
        }

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        const marker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: markerPosition,
          image: markerImage,
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

      // 데이터가 있으면 지도 범위 재설정
      if (newMarkers.length > 0) {
        mapInstance.setBounds(bounds);
      }
    } else {
      setResults([]);
    }
  };

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;

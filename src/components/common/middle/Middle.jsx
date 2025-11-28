import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import { cn } from "@utils/functions/utils";

export default function Middle({ className }) {
  const [q1, setQ] = useState("");
  const navigate = useNavigate();

  // 검색 핸들러: 입력된 검색어를 가지고 지도 페이지로 이동
  const handleSearch = () => {
    navigate("/map", { state: { locationQuery: q1 } });
  };

  const tags = ["#상상대로", "#성북구", "#보건소", "#주민센터", "#약국"];

  return (
    <section
      className={cn(
        "bg-linear-to-b from-green-50 to-blue-50 p-8 rounded-xl shadow-md flex flex-col justify-center h-full",
        className
      )}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          올바른 폐의약품 처리, 우리의 환경을 지킵니다 🌿
        </h1>
        <p className="text-gray-600">
          주소를 입력하면 근처 약국·보건소 수거함 위치와 길찾기를 제공합니다.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <SearchInput
          value={q1}
          onChange={(e) => setQ(e.target.value)}
          onSearch={handleSearch}
          placeholder="예) 서울 성북구 삼선교로16길 116, 한성대학교"
        />
        <CustomButton onClick={handleSearch}>찾기</CustomButton>{" "}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500 font-medium">추천 검색어:</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() =>
                navigate("/map", {
                  state: { locationQuery: tag.replace("#", "") },
                })
              }
              className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm text-green-600 hover:bg-green-50 transition-colors shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-2 text-sm text-gray-500">
          <button
            onClick={() => navigate("/searchAi")}
            className="hover:underline hover:text-green-700"
          >
            제품 검색 &rarr;
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="hover:underline hover:text-green-700"
          >
            환경 퀴즈 &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

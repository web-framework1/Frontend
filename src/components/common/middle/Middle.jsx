import React from "react";
import SearchInput from "@components/common/input/search-input";
import CustomButton from "@components/common/button/custom-button";
import { useState } from "react";

export default function Middle() {
  const [q1, setQ] = useState("");

  return (
    <section className="bg-linear-to-b from-green-50 to-blue-50 p-8 rounded-xl shadow-md mt-7">
      <h1 className="text-2xl font-bold text-green-700 mb-3">
        올바른 폐의약품 처리, 우리의 환경을 지킵니다 🌿
      </h1>
      <p className="text-gray-600 mb-4">
        주소를 입력하면 근처 약국·보건소 수거함 위치와 길찾기를 제공합니다.
      </p>
      <div className="flex gap-2">
        <SearchInput
          value={q1}
          onChange={(e) => setQ(e.target.value)}
          onSearch={() => alert(q1)}
          placeholder="예) 서울 강남구 테헤란로 10"
        />
        <CustomButton onClick={() => alert(q1)}>찾기</CustomButton>
      </div>
      <div className="flex items-center gap-3 mt-4 text-gray-600">
        <span>또는:</span>
        <a href="#" className="underline">
          제품 검색
        </a>
        <a href="#" className="underline">
          퀴즈
        </a>
      </div>
    </section>
  );
}

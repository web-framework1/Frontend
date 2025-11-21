import React from "react";

export default function TopTitle() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
        🔍 AI 기반 스마트 분석
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-3">
        약품 이미지를 업로드하세요
      </h2>
      <p className="text-gray-600 text-lg">
        AI가 자동으로 약품과 건강기능식품을 구분해드립니다
      </p>
    </div>
  );
}

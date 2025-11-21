import React from "react";

export default function TextCard({
  productName,
  setProductName,
  fetchData,
  file,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 mb-2">
        <p className="font-bold text-gray-800">텍스트로 검색</p>
        <p className="text-sm text-gray-500">
          제품명이나 성분명을 직접 입력하세요
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <p className="text-sm text-blue-800">
            💡 <strong>팁:</strong> 약 포장지에 적힌 제품명이나 주성분을
            입력해보세요
          </p>
        </div>
      </div>
      {/* 텍스트 입력 창*/}
      <input
        value={productName}
        type="text"
        onChange={(e) => {
          setProductName(e.target.value);
        }}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="(예: 타이레놀, 까스활명수)"
      />
      {/* 텍스트 검색 버튼 */}
      <button
        onClick={() => fetchData("text")}
        disabled={!productName || !!file} // 텍스트만 있을 때 활성화
        className={`px-5 py-3 rounded-xl font-extrabold text-white whitespace-nowrap transition-all
                  ${
                    productName && !file
                      ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
      >
        텍스트 검색하기
      </button>
    </div>
  );
}

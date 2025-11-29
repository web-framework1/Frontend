import React from "react";

export default function RankingSidebar({ rankers }) {
  return (
    <div className="w-1/3 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-md hidden md:block">
      {/* 제목 */}
      <h3 className="text-lg font-bold text-center mb-4">
        <span className="border-b-2 border-green-500 pb-1">실시간 랭킹</span>
      </h3>

      {/* 랭킹 목록 */}
      <ul className="space-y-2 text-gray-800">
        {rankers.map((ranker) => (
          <li
            key={ranker.rank}
            className={`text-md ${
              ranker.rank === 1 ? "font-bold text-lg" : "font-medium"
            }`}
          >
            {ranker.rank}. {ranker.name}
            {/* 1등에게만 점수 강조 */}
            {ranker.rank === 1 && (
              <span className="text-green-600 ml-2">({ranker.score}점)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

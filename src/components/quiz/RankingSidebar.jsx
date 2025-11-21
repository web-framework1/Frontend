// src/components/quiz/RankingSidebar.jsx

import React from "react";

// 랭킹 목업 데이터 (실제 백엔드 연동 시 이 부분을 props나 fetch 로직으로 대체해야 합니다.)
const mockRankings = [
  { rank: 1, name: "유재석", score: 1200 },
  { rank: 2, name: "강호동", score: 1150 },
  { rank: 3, name: "이효리", score: 1080 },
  { rank: 4, name: "신동엽", score: 990 },
  { rank: 5, name: "김숙", score: 950 },
];

export default function RankingSidebar() {
  return (
    // 두 번째 이미지의 랭킹 프레임 스타일을 적용합니다.
    <div className="w-1/3 max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-md hidden md:block">
      {/* 제목 */}
      <h3 className="text-lg font-bold text-center mb-4">
        <span className="border-b-2 border-green-500 pb-1">실시간 랭킹</span>
      </h3>

      {/* 랭킹 목록 */}
      <ul className="space-y-2 text-gray-800">
        {mockRankings.map((ranker) => (
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

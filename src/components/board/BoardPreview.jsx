import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

// 게시글 아이템 (내부 컴포넌트)
const BoardItem = ({ tag, tagColor, title, description, date }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="mt-1">
      <FileText className="w-5 h-5 text-gray-400" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        {tag && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}
          >
            {tag}
          </span>
        )}
        <h4 className="font-semibold text-gray-800 truncate text-sm">
          {title}
        </h4>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 truncate pr-2">{description}</p>
        <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
      </div>
    </div>
  </div>
);

const boardItems = [
  {
    tag: "필독",
    tagColor: "bg-red-100 text-red-700",
    title: "폐의약품 배출 시 주의사항 안내",
    description: "의약품은 반드시 지정된 수거함에 버려주세요.",
    date: "2024.10.20",
  },
  {
    tag: "공지",
    tagColor: "bg-yellow-100 text-yellow-800",
    title: "10월 전국 수거 캠페인 이벤트 당첨자 발표",
    description: "참여해주셔서 감사합니다.",
    date: "2024.10.15",
  },
];

export default function BoardPreview({ isMain }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-1">
        {boardItems.map((item, index) => (
          <BoardItem
            key={index}
            tag={item.tag}
            tagColor={item.tagColor}
            title={item.title}
            description={item.description}
            date={item.date}
          />
        ))}
      </div>

      {/* 더보기 버튼 (하단 유지) */}
      {isMain && (
        <div className="mt-4 text-right">
          <span className="text-xs text-orange-500 font-bold cursor-pointer hover:mr-1 transition-all">
            더보기 +
          </span>
        </div>
      )}
    </div>
  );
}

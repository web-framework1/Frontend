import React from "react";
import { MessageCircleQuestion } from "lucide-react";

const QaItem = ({ question, answer }) => (
  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-blue-50 transition-colors">
    <div className="flex gap-2 mb-1">
      <span className="font-bold text-blue-600 text-sm">Q.</span>
      <span className="font-semibold text-gray-800 text-sm line-clamp-1">
        {question}
      </span>
    </div>
    <div className="flex gap-2">
      <span className="font-bold text-gray-400 text-sm">A.</span>
      <span className="text-xs text-gray-600 line-clamp-2">{answer}</span>
    </div>
  </div>
);

const qaItems = [
  {
    question: "시럽은 어떻게 버리나요?",
    answer: "시럽은 한 병에 모아서 새지 않게 밀봉한 후 배출해주세요.",
  },
  {
    question: "유통기한 지난 약은요?",
    answer: "약국이나 보건소에 있는 폐의약품 수거함에 배출해야 합니다.",
  },
];

export default function QnaPreview() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-800">자주 묻는 질문</h3>
        </div>
        <span className="text-xs text-gray-500 font-medium">더보기 +</span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {qaItems.map((item, index) => (
          <QaItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}

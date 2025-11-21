import React from "react";
import { Link } from "react-router-dom";

// 아이콘 컴포넌트들
const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-400"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

// 게시판 목록 버튼
const ListButton = ({ to = "/board" }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
  >
    <ListIcon />
    목록
  </Link>
);

// 게시글 아이템
const BoardItem = ({ tag, tagColor, title, description, link = "#" }) => (
  <Link
    to={link}
    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-2 mb-1">
      {tag && (
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}
        >
          {tag}
        </span>
      )}
      <h4 className="font-semibold text-gray-800 truncate">{title}</h4>
    </div>
    <p className="text-sm text-gray-600 truncate">{description}</p>
  </Link>
);

// Q&A 아이템
const QaItem = ({ question, answer, link = "#" }) => (
  <Link
    to={link}
    className="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
  >
    <div className="mb-1">
      <span className="font-bold text-blue-600">Q: </span>
      <span className="font-semibold text-gray-800">{question}</span>
    </div>
    <div>
      <span className="font-bold text-gray-600">A: </span>
      <span className="text-sm text-gray-600">{answer}</span>
    </div>
  </Link>
);

// Mock Data
const boardItems = [
  {
    tag: "필독",
    tagColor: "bg-red-100 text-red-700",
    title: "폐의약품 배출 시 주의사항 안내",
    description: "의약품은 반드시 지정된 수거함에 버려주세요.",
  },
  {
    tag: "공지",
    tagColor: "bg-yellow-100 text-yellow-800",
    title: "10월 전국 수거 캠페인 이벤트 당첨자 발표",
    description: "참여해주셔서 감사합니다. 당첨자 명단은...",
  },
  {
    tag: null,
    tagColor: "",
    title: "이런 것도 폐의약품으로 버려야 하나요?",
    description: "집에 있는 영양제도 수거 대상인가요?",
  },
  {
    tag: null,
    tagColor: "",
    title: "가까운 약국 위치 공유합니다.",
    description: "OO구 OO동에 있는 약국에서도 수거하네요!",
  },
];

const qaItems = [
  {
    question: "시럽은 어떻게 버리나요?",
    answer: "시럽은 한 병에 모아서 새지 않게 밀봉한 후 배출해주세요.",
  },
  {
    question: "연고도 수거 대상인가요?",
    answer: "네, 연고도 튜브 재료 배출해주시면 됩니다.",
  },
];

// ----- BoardPreview 컴포넌트 -----
// ✅ props로 { isMain }을 받아옵니다. (기본값 false)
function BoardPreview({ isMain = false }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6">게시판</h2>

      {/* 1. 전체 게시판 섹션 */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            🌱 전체 게시판
          </h3>
          <ListButton to="/board" />
        </div>

        {/* ✅ [핵심] 메인 페이지가 아닐 때(!isMain)만 검색창을 보여줍니다 */}
        {!isMain && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="게시글 제목 검색..."
              className="w-full h-10 px-4 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <div className="absolute top-0 left-0 flex items-center h-full pl-3">
              <SearchIcon />
            </div>
          </div>
        )}

        {/* 게시글 목록 */}
        <div className="space-y-3">
          {boardItems.map((item, index) => (
            <BoardItem
              key={index}
              tag={item.tag}
              tagColor={item.tagColor}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* 2. 자주 묻는 질문 (Q&A) 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            ❓ 자주 묻는 질문 (Q&A)
          </h3>
          <ListButton to="/faq" />
        </div>

        {/* Q&A 목록 */}
        <div className="space-y-3">
          {qaItems.map((item, index) => (
            <QaItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default BoardPreview;

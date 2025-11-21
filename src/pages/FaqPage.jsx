import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import { allQaItems } from "../mock/faqData.js";

/* --- [아이콘 컴포넌트] --- */
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-400"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

const QaItem = ({ question, answer, link = "#" }) => (
  <Link
    to={link}
    className="block w-full p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all mb-3"
  >
    <div className="mb-1">
      <span className="font-bold text-blue-600 mr-2">Q.</span>
      <span className="font-bold text-gray-800">{question}</span>
    </div>
    <div className="flex items-start">
      <span className="font-bold text-gray-500 mr-2 mt-0.5">A.</span>
      <span className="text-sm text-gray-600 line-clamp-1">{answer}</span>
    </div>
  </Link>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`
            w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center transition-colors
            ${
              currentPage === number
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
            }
          `}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

function FaqPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(inputValue.toLowerCase());
      setCurrentPage(1);
    }
  };

  const filteredQaItems = useMemo(() => {
    if (!searchTerm) {
      return allQaItems;
    }
    return allQaItems.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm) ||
        item.answer.toLowerCase().includes(searchTerm)
    );
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQaItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQaItems.length / itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <NavigationBar />
      </header>

      <main className="flex-grow container max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          {/* 헤더 영역: 제목 */}
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">❓</span>
              <span>자주 묻는 질문 (Q&A)</span>
            </h2>
          </div>

          {/* 검색창 */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="질문이나 답변 내용 검색..."
              className="w-full h-12 px-4 pl-11 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-shadow shadow-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute top-0 left-0 flex items-center h-full pl-3.5">
              <SearchIcon />
            </div>
          </div>

          {/* Q&A 리스트 출력 영역 */}
          <div className="space-y-3">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <QaItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  link={`/faq/${item.id}`}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 border-dashed">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FaqPage;

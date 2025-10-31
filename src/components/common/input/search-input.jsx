import React from "react";

const SearchInput = ({
  value,
  onChange,
  onSearch, // (value) => void
  placeholder = "검색어를 입력하세요",
  disabled = false,
}) => {
  // Enter 눌렀을 때
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim() !== "") {
      onSearch(value);
    }
  };

  // 돋보기 버튼 눌렀을 때, 값이 존재해야 검색 함수 실행
  const handleClick = () => {
    if (value.trim() !== "") {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="
          font-sans block w-full rounded-lg border outline-none transition
          bg-white text-gray-900 placeholder:text-gray-400
          focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400
          border-gray-300
          pr-10 h-10 text-base px-3.5
        "
      />

      {/* 검색 아이콘 (고정) */}
      <button
        type="button"
        aria-label="검색"
        onClick={handleClick}
        className="
          absolute inset-y-0 right-0 grid place-items-center pr-2
          text-gray-400 hover:text-gray-600 focus:outline-none
          focus:ring-2 focus:ring-blue-500/40 rounded-md
        "
        disabled={disabled}
      >
        <svg //돋보기 그리는 코드
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;

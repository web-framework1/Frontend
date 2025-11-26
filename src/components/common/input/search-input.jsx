import React from "react";

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
  disabled = false,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) {
            onSearch();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="
          font-sans block w-full rounded-lg border outline-none transition
          bg-white text-gray-900 placeholder:text-gray-400
          focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400
          border-gray-300
          h-10 text-base px-3.5 
        "
      />
    </div>
  );
};

export default SearchInput;

// src/components/Button.jsx
import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  // 버튼 스타일을 Tailwind 클래스로 정의
  const baseStyle =
    "px-4 py-2 rounded-lg font-semibold shadow focus:outline-none transition-colors duration-200";

  // variant에 따른 스타일 분기
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  // 비활성화 스타일
  const disabledStyle =
    "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${disabledStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

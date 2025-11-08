import React from "react";

/**
 * 기본 카드 래퍼(Wrapper) 컴포넌트
 *
 * @param {object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 카드 내부에 표시될 내용
 * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스
 */
function Card({ children, className = "" }) {
  const baseStyle = "h-full rounded-xl bg-white p-6 shadow-md";

  return <div className={`${baseStyle} ${className}`}>{children}</div>;
}

export default Card;

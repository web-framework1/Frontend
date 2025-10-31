import React from "react";

// 버튼 컴포넌트
// props (텍스트, 이벤트함수, 타입, 백컬러)

//테일윈드의 단점인듯 재사용시 ui변경 좀 어렵네
const COLORS = {
  green: "bg-green-700 hover:bg-green-800",
  blue: "bg-blue-700 hover:bg-blue-800",
  red: "bg-red-700 hover:bg-red-800",
  gray: "bg-gray-600 hover:bg-gray-700",
  gradient:
    "bg-gradient-to-l from-green-600 to-blue-600 \
    hover:bg-gradient-to-r",
};

const CustomButton = ({
  children,
  onClick,
  type = "button",
  color = "green",
}) => {
  const colorClass = COLORS[color] || COLORS.green;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
      inline-flex items-center justify-center 
      gap-2 whitespace-nowrap text-sm transition-all 
      disabled:pointer-events-none disabled:opacity-50 
      [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 
      shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring 
      focus-visible:ring-ring/50 focus-visible:ring-[3px] 
      aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
      aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 ${colorClass} 
      text-white font-bold rounded-lg`}
    >
      {children}
    </button>
  );
};

export default CustomButton;

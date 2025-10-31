// src/components/LayoutBox.jsx
import React from "react";

const LayoutBox = ({ children }) => {
  return (
    // 6개의 자식 요소를 3열 그리드로 배치
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};

export default LayoutBox;

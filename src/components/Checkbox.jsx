import React from "react";

/**
 * @param {string} label - 체크박스 옆에 표시될 텍스트 (페이지에서 전달받음)
 * @param {boolean} checked - 체크박스의 현재 체크 상태 (페이지에서 전달받음)
 * @param {function} onChange - 체크박스 상태가 변경될 때 호출될 함수 (페이지에서 전달받음)
 */
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {/* 1. 체크박스 버튼 (작동하는 부분) */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />

      {/* 2. 옆에 들어가는 텍스트 (페이지에서 호출할 때 받은 값을 표시) */}
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;

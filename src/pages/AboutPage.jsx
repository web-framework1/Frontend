// src/pages/HomePage.jsx (테스트 예시)
import React, { useState } from "react";
import Checkbox from "../components/Checkbox.jsx"; // 체크박스 컴포넌트 가져오기

const HomePage = () => {
  // 체크박스의 상태를 관리하기 위한 state
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 상태가 변경될 때 실행될 함수
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="p-10">
      <h1 className="mb-4 text-2xl font-bold">체크박스 테스트</h1>

      {/* ✅ 여기에 팀원의 요구사항이 반영되었습니다!
        '호출'할 때 "개인정보 수집에 동의합니다"라는 텍스트 값을 `label` prop으로 주면,
        Checkbox 컴포넌트가 이 값을 받아서 내용(텍스트)을 입력(표시)해 줍니다.
      */}
      <Checkbox
        label="개인정보 수집에 동의합니다"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      {/* 테스트용: 현재 상태를 보여주는 텍스트 */}
      <p className="mt-4">
        체크박스 상태: {isChecked ? "동의함" : "동의 안 함"}
      </p>
    </div>
  );
};

export default HomePage;

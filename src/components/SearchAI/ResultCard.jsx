import React from "react";
import robotPng from "@assets/robot.png";

export default function ResultCard({ isLoading, result }) {
  return (
    <section className="flex flex-col items-center bg-white rounded-2xl p-5 shadow-lg border border-black/5 mb-5 text-center">
      {isLoading ? (
        <div>로딩중</div>
      ) : result ? (
        <div className="bg-gray-50 m-10">{result}</div>
      ) : (
        <>
          <img src={robotPng} alt={"a"} className="max-w-[200px]" />
          <p className="text-lg font-extrabold text-gray-800">
            약, 건강기능식품 구별이 어려우시면 물어보세요~
          </p>
        </>
      )}
    </section>
  );
}

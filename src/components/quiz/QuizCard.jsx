import React from "react";

export default function QuizCard({
  currentQuiz,
  quizTotal,
  currentQuizIndex,
  selectedOption,
  setSelectedOption,
  showAnswer,
  handleNextQuestion,
  handleHint,
  isLastQuestion,
}) {
  const handleOptionSelect = (optionIndex) => {
    if (!showAnswer) {
      setSelectedOption(optionIndex);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* 제목 및 랭킹 */}
      <div className="flex justify-between items-center mb-4 p-2 bg-green-100/50 rounded-t-lg border-b border-gray-200">
        <h2 className="text-lg font-bold">폐의약품 퀴즈</h2>
        <span className="text-md text-gray-600 font-semibold">
          문제: {currentQuizIndex + 1} / {quizTotal}
        </span>
      </div>

      {/* 질문 */}
      <p className="text-lg font-medium mb-6 min-h-[4rem]">
        {currentQuiz.question}
      </p>

      {/* 보기 목록 */}
      <div className="space-y-4 mb-8">
        {currentQuiz.options.map((option, index) => {
          const optionIndex = index + 1;
          let optionClass = "p-3 border rounded-lg transition duration-150";

          if (showAnswer) {
            // 🚨 정답이거나 오답일 경우 스타일 적용 (답변 확인 후)
            if (optionIndex === currentQuiz.answer) {
              // 정답 녹색
              optionClass +=
                " bg-green-200 border-green-600 font-bold shadow-md";
            } else if (optionIndex === selectedOption) {
              // 오답 빨간색
              optionClass += " bg-red-200 border-red-600 shadow-md";
            } else {
              // 선택되지 않은 보기
              optionClass += " bg-gray-100/50";
            }
            optionClass += " cursor-default"; // 답 확인 후 커서 비활성화
          } else {
            if (optionIndex === selectedOption) {
              // 선택된 보기 표시 (파란색)
              optionClass +=
                " bg-blue-100 border-blue-500 font-medium shadow-sm";
            }
            optionClass += " cursor-pointer hover:bg-gray-50";
          }

          return (
            <div
              key={index}
              className={optionClass}
              onClick={() => handleOptionSelect(optionIndex)}
            >
              {option}
            </div>
          );
        })}
      </div>

      {/* 답변 결과 표시 */}
      {showAnswer && (
        <div
          className={`p-4 mb-4 rounded-lg font-semibold ${
            selectedOption === currentQuiz.answer
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {selectedOption === currentQuiz.answer
            ? "✅ 정답입니다! (10점 획득)"
            : `❌ 오답입니다. 정답은 ${currentQuiz.answer}번입니다.`}
          <p className="mt-2 text-sm font-normal">
            해설: {currentQuiz.explanation}
          </p>
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-between gap-4">
        <button
          onClick={handleNextQuestion}
          className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
        >
          {showAnswer
            ? isLastQuestion
              ? "결과 보기"
              : "다음 문제"
            : "답변 확인"}
        </button>
        <button
          onClick={handleHint}
          // 힌트 버튼
          className="flex-1 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
        >
          힌트
        </button>
      </div>
    </div>
  );
}

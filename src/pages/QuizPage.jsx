import React, { useState } from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import QuizCard from "@components/quiz/QuizCard";
import RankingSidebar from "@components/quiz/RankingSidebar";
import { quizMockData } from "@/mock/quizData";

export default function QuizPage() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuiz = quizMockData[currentQuizIndex];
  const isLastQuestion = currentQuizIndex === quizMockData.length - 1;

  const handleNextQuestion = () => {
    if (selectedOption === null && !showAnswer) {
      alert("답변을 선택해 주세요!");
      return;
    }

    if (!showAnswer) {
      setShowAnswer(true);
      if (selectedOption === currentQuiz.answer) {
        setScore((prevScore) => prevScore + 10);
      }
    } else {
      if (isLastQuestion) {
        alert(`퀴즈가 종료되었습니다! 당신의 점수는 ${score}점 입니다.`);
      } else {
        setCurrentQuizIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      }
    }
  };

  const handleHint = () => {
    alert(`힌트: ${currentQuiz.explanation}`);
  };

  if (!currentQuiz) {
    return <p>퀴즈가 종료되었습니다.</p>;
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <NavigationBar />
      </header>

      {/* 퀴즈 본문 영역 */}
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-xl font-bold mb-4">현재 점수: {score}점</div>
        <div className="flex justify-center items-start gap-4">
          {/* 1. 퀴즈 카드 UI (로직을 props로 전달) */}
          <QuizCard
            currentQuiz={currentQuiz}
            quizTotal={quizMockData.length}
            currentQuizIndex={currentQuizIndex}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            showAnswer={showAnswer}
            handleNextQuestion={handleNextQuestion}
            handleHint={handleHint}
            isLastQuestion={isLastQuestion}
            score={score}
          />
          {/* 2. 랭킹 사이드바 UI */}
          <RankingSidebar /> {/* 이 컴포넌트는 별도로 구현 필요 */}
        </div>
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}

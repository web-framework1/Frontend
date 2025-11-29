import React, { useState, useEffect } from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import QuizCard from "@components/quiz/QuizCard";
import RankingSidebar from "@components/quiz/RankingSidebar";
import { quizMockData } from "@/mock/quizData";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask 서버 주소

export default function QuizPage() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [renkers, setRenkers] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentQuiz = quizList[currentQuizIndex];
  const isLastQuestion =
    quizList.length > 0 && currentQuizIndex === quizList.length - 1;

  // 서버로 부터 목업데이터 받아옴
  const fetchRankings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/ranking`);
      // 서버에서 받은 데이터를 랭킹 상태에 저장
      setRenkers(response.data);
      console.log("랭킹 데이터 수신 완료:", response.data);
    } catch (error) {
      console.error("랭킹 데이터 로드 오류:", error);
      // 오류 발생 시 초기 목업 데이터로 설정
      setRenkers([
        { rank: 1, name: "유재석", score: 500 },
        { rank: 2, name: "강호동", score: 400 },
        { rank: 3, name: "이효리", score: 300 },
        { rank: 4, name: "신동엽", score: 200 },
        { rank: 5, name: "김숙", score: 100 },
      ]);
    } // 컴포넌트 마운트 시 랭킹을 먼저 불러옴
  };

  // 데이터 업데이트
  const updateRankings = async (userName) => {
    try {
      const response = await axios.post(`${API_URL}/api/ranking/submit`, {
        name: userName,
        score: score,
      });

      // 서버에서 업데이트된 랭킹 리스트를 받아와 상태 업데이트
      setRenkers(response.data.updated_rankings);
      alert(`✅ 랭킹 등록 완료! 새로운 랭킹 리스트가 업데이트되었습니다.`);
    } catch (error) {
      console.error("❌ 랭킹 제출 및 업데이트 오류:", error);
      alert("랭킹 처리 중 오류가 발생했습니다. 서버를 확인해주세요.");
    }
  };

  // 랭킹 데이터 로드
  useEffect(() => {
    // 전체 데이터를 랜덤하게 섞어서(shuffle) 5개만 뽑기
    const shuffled = [...quizMockData].sort(() => 0.5 - Math.random());
    const selectedQuizzes = shuffled.slice(0, 5);

    setQuizList(selectedQuizzes);
    setLoading(false);

    fetchRankings(); // 랭킹 데이터 가져오기 (기존 로직 유지)
  }, []);
  const handleNextQuestion = () => {
    if (selectedOption === null && !showAnswer) {
      alert("답변을 선택해 주세요!");
      return;
    }

    if (!showAnswer) {
      setShowAnswer(true);
      if (selectedOption === currentQuiz.answer) {
        setScore((prevScore) => prevScore + 100);
      }
    } else {
      if (isLastQuestion) {
        let rankingMessage = `🎉 퀴즈 종료! 당신의 점수는 ${score}점 입니다.`;
        let userName = "무명의 고수";

        //5등보다 점수가 높으면 이름 입력창 띄우기
        if (renkers[4].score < score) {
          // 닉네임 입력창 띄우기
          rankingMessage +=
            "\n\n🏆 축하합니다! 랭킹 등록 기회가 주어졌습니다. 이름을 입력해주세요:";

          // 닉네임 입력창 띄우기 (prompt 사용)
          const input = prompt(rankingMessage);

          // 디버깅용 로그
          //console.log(input);
          if (input && input.trim() !== "") {
            userName = input.trim();
          } else {
            alert("이름 입력이 취소되어 '무명의 고수'로 기록됩니다.");
          }

          // 서버로 데이터 전송
          // 유저 이름과 점수를 서버로 전송하고, 업데이트된 값 받아오기 (POST)
          updateRankings(userName);
        } else {
          alert(rankingMessage + "\n아쉽지만 5위권 밖입니다.");
        }

        // 유저 이름과 점수를 서버로 전송, 업데이트된 값 받아오기
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
    <div className="flex flex-col min-h-screen bg-green-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        <NavigationBar />
      </header>

      {/* 퀴즈 본문 영역 */}
      <main className="container flex-grow mx-auto p-4 md:p-8">
        <div className="text-xl font-bold mb-4">현재 점수: {score}점</div>
        <div className="flex justify-center items-start gap-4">
          {/* 1. 퀴즈 카드 UI (로직을 props로 전달) */}
          <QuizCard
            currentQuiz={currentQuiz}
            quizTotal={quizList.length}
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
          <RankingSidebar rankers={renkers} />{" "}
        </div>
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
}

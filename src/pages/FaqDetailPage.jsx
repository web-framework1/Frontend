import React from "react";
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";

import { allQaItems } from "../mock/faqData.js";

function FaqDetailPage() {
  const { id } = useParams();

  const item = allQaItems.find((data) => data.id === parseInt(id));

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <NavigationBar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-lg">존재하지 않는 질문입니다.</p>
          <Link
            to="/faq"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <NavigationBar />
      </header>

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-16">
        {/* 카드 박스 디자인 (스크린샷과 동일하게) */}
        <div className="bg-white rounded-lg shadow-lg p-10 border border-gray-100">
          {/* 질문 (Q.) */}
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-blue-600 mr-2 text-3xl">Q.</span>
            {item.question}
          </h1>

          {/* 구분선 */}
          <hr className="border-gray-300 my-8" />

          {/* 답변 (A.) */}
          <div className="flex items-start">
            <span className="font-bold text-gray-800 text-2xl mr-3 mt-[-4px]">
              A.
            </span>
            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {item.answer}
            </div>
          </div>

          {/* 구분선 */}
          <hr className="border-gray-300 my-8" />

          {/* 목록으로 돌아가기 링크 */}
          {/* [핵심] to="/faq" 로 설정하여 Q&A 목록으로 이동 */}
          <Link
            to="/faq"
            className="inline-flex items-center text-green-500 hover:text-green-600 font-bold transition-colors"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FaqDetailPage;

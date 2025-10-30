import React from "react";
import { Link } from "react-router-dom";

// 라우팅 테스트를 위한 새 페이지 컴포넌트입니다.
function AboutPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="rounded bg-white p-10 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-zinc-900">About Page</h1>
        <p className="my-4 text-red-400">이 페이지는 라우팅 테스트용입니다.</p>

        {/* Home (Todo 앱)으로 돌아가는 링크 */}
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;

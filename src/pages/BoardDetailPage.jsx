import React from "react";
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";

import { allPosts } from "../mock/postsData.js";

function BoardDetailPage() {
  const { id } = useParams();

  const post = allPosts.find((data) => data.id === parseInt(id));

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <NavigationBar />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-lg">존재하지 않는 게시글입니다.</p>
          <Link
            to="/board"
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

      <main className="flex-grow container max-w-3xl mx-auto px-4 py-10">
        {/* [삭제됨] 상단의 '← 목록으로' 버튼 삭제 */}

        {/* 상세 내용 박스 */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* 헤더 영역 (태그, 제목, 날짜) */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  post.tagColor || "bg-gray-100 text-gray-600"
                }`}
              >
                {post.tag || "공지"}
              </span>
              <span className="text-gray-400 text-sm">
                {post.date || "날짜 정보 없음"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </div>

          {/* 본문 영역 */}
          <div className="p-8 min-h-[200px]">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
              {post.content || post.description || "내용이 없습니다."}
            </div>
          </div>

          {/* [추가됨] 하단 목록으로 돌아가기 링크 (Q&A 스타일) */}
          <div className="px-8 pb-8">
            <hr className="border-gray-100 mb-8" />
            <Link
              to="/board"
              className="inline-flex items-center text-green-500 hover:text-green-600 font-bold transition-colors"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BoardDetailPage;

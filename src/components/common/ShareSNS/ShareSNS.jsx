import React from "react";
import { Share2, MessageCircle, Send, Twitter } from "lucide-react";

// SNS 공유 컴포넌트
export default function ShareSNS({ children }) {
  // SNS 공유 함수들
  const shareToKakao = () => {
    window.open(`https://www.kakaocorp.com/page/`, "_blank");
  };

  const shareToTwitter = () => {
    const text = "AI 약품 판별 서비스로 약품을 분석해보세요!";
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToThreads = () => {
    const text = "AI 약품 판별 서비스로 약품을 분석해보세요!";
    const url = window.location.href;
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(
        text + " " + url
      )}`,
      "_blank"
    );
  };

  const shareToInstagram = () => {
    window.open(`https://www.instagram.com`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-7 flex gap-6">
      {children}
      <aside className="w-64 flex-shrink-0 hidden lg:block">
        <div className="sticky top-30">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-black/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Share2 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800">공유하기</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              친구들에게 이 서비스를 알려주세요!
            </p>

            <div className="space-y-3">
              {/* 카카오톡 */}
              <button
                onClick={shareToKakao}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-colors"
              >
                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-yellow-900">카카오톡</span>
              </button>

              {/* Twitter (X) */}
              <button
                onClick={shareToTwitter}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-black hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-white">Twitter (X)</span>
              </button>

              {/* Threads */}
              <button
                onClick={shareToThreads}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-bold text-white">Threads</span>
              </button>

              {/* Instagram */}
              <button
                onClick={shareToInstagram}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-bold text-white">Instagram</span>
              </button>

              {/* 링크 복사 */}
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </div>
                <span className="font-bold text-gray-800">링크 복사</span>
              </button>
            </div>

            {/* 추가 정보 */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                이 서비스가 유용하셨다면 친구들과 공유해주세요! 더 많은 사람들이
                약품을 안전하게 구별할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

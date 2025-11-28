import React from "react";
import { Loader2, Pill } from "lucide-react";
import robotPng from "@assets/robot.png";

export default function ResultCard({ isLoading, result }) {
  // 간단 파싱 (없어도 동작하도록 optional 처리)
  const isDrug = result?.includes("의약품 O");

  let productName = "";
  let disposal = "";

  if (result) {
    const nameMatch = result.match(/제품명\s*:\s*(.+?)(폐기 방법|$)/);
    const disposalMatch = result.match(/폐기 방법\s*[:：]\s*(.+)$/);

    if (nameMatch) productName = nameMatch[1].trim();
    if (disposalMatch) disposal = disposalMatch[1].trim();
  }

  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-6 text-center">
      {/* 상단 라벨 */}
      <div className="w-full flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          AI 기반 스마트 분석
        </span>
      </div>

      {isLoading ? (
        // ===== 로딩 상태 =====
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-200" />
            <Loader2 className="absolute inset-0 m-auto h-9 w-9 animate-spin text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-slate-800">
            약품 정보를 분석하고 있어요…
          </p>
          <p className="text-xs text-slate-500">
            라벨과 텍스트를 인식해 의약품과 건강기능식품을 구분하는 중입니다.
          </p>
        </div>
      ) : result ? (
        // ===== 결과 상태 =====
        <div className="w-full text-left">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <Pill
                className={`w-6 h-6 ${
                  isDrug ? "text-rose-500" : "text-indigo-500"
                }`}
              />
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  isDrug
                    ? "bg-rose-50 text-rose-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {isDrug
                  ? "의약품으로 분류되었어요"
                  : "건강기능식품/의약외품으로 분류되었어요"}
              </span>
            </div>

            {productName && (
              <div className="mb-2">
                <p className="text-[11px] font-semibold text-slate-500">
                  제품명
                </p>
                <p className="text-base font-bold text-slate-900">
                  {productName}
                </p>
              </div>
            )}

            {disposal && (
              <div className="mt-3">
                <p className="text-[11px] font-semibold text-slate-500">
                  폐기 방법
                </p>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {disposal}
                </p>
              </div>
            )}

            {/* 원문 전체 결과 */}
            <div className="mt-4 rounded-xl bg-slate-900/90 px-4 py-3 text-xs text-slate-50 leading-relaxed">
              <p className="mb-1 font-semibold text-slate-300">AI 전체 설명</p>
              <p>{result}</p>
            </div>
          </div>
        </div>
      ) : (
        // ===== 초기 상태 =====
        <div className="flex flex-col items-center gap-4 py-6">
          <img src={robotPng} alt="AI 도우미" className="max-w-[160px] " />
          <p className="text-lg font-extrabold text-gray-800">
            약, 건강기능식품 구별이 어려우시면 물어보세요~
          </p>
          <p className="text-sm text-gray-500">
            약 봉투나 제품명을 입력하면 AI가 의약품 여부와 폐기 방법까지
            알려드립니다.
          </p>
        </div>
      )}
    </section>
  );
}

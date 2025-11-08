import React, { useMemo, useState, useRef } from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import Checkbox from "@components/common/checkbox/Checkbox";

import envelopeImg from "@assets/envelope.jpg";
import { useReactToPrint } from "react-to-print"; //프린터 라이브러리

export default function PrinterPage({ imgSrc = envelopeImg, featNum = 3 }) {
  // 주의사항
  const items = useMemo(
    () => [
      "안심봉투를 이용하면 우체통을 통해 폐의약품을 반납할 수 있습니다.",
      "가루약과 포장된 약은 포장지를 개봉하지 않고 그대로 배출하세요.",
      "건습약은 포장된 채로, 시럽과 앰플은 용기 그대로 마개를 닫고 배출해주세요.",
      "봉투를 밀봉하여 배출해 주세요.",
      "음식물은 우체통에 버릴 수 없습니다. 가까운 약국이나 주민센터의 폐의약품 수거함에 배출하세요.",
    ],
    []
  );
  const [checks, setChecks] = useState(Array(items.length).fill(false));
  const allChecked = checks.every(Boolean);

  //체크박스 토글
  const handleToggle = (idx) => {
    setChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const printRef = useRef();
  // oncClick 이벤트 함수(버튼클릭시 프린터)
  const handlelPrint = useReactToPrint({
    documentTitle: "안심봉투",
    contentRef: printRef,
    pageStyle: `
       @page { size: A4 landscape; margin: 0; }
       @media print {
        /* 봉투 출력 사이즈 설정 */
        #a4-wrapper img {
        width: 75%;
        height: 75%;
        object-fit: contain !important;
        object-position: center !important;
        page-break-inside: avoid;
      }
      `,
  });

  return (
    <div className="min-h-screen bg-green-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        {/* 네비게이션바 */}
        <NavigationBar />
      </header>

      {/* 본문 */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
            {featNum}
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            페이약품 안심봉투 출력
          </h2>
        </div>

        {/* 미리보기 카드 */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* 상단 설명 */}
          <div className="px-6 pt-5 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  안심봉투 미리보기
                </p>
                <p className="text-xs text-gray-500">
                  A4 출력 · 접기 가이드 포함
                </p>
              </div>
              <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600">
                PDF 1장
              </span>
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className="px-6 pb-6">
            <div className="relative rounded-xl border border-dashed border-emerald-200 bg-emerald-50/40 p-4">
              <div
                id="a4-wrapper"
                className="relative mx-auto flex items-center justify-center rounded-lg bg-white/80"
                ref={printRef}
              >
                <img src={imgSrc} alt="안심봉투" />
              </div>
              <p className="mt-2 text-center text-[11px] text-gray-500">
                실제 프린트 여백은 인쇄 시 여백 0~5mm 기준으로 설정됩니다.
              </p>
            </div>
          </div>

          {/* 체크리스트 */}
          <div className="border-t border-gray-100 px-6 py-5">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              출력 전 주의사항 5가지 확인
            </p>
            <ul className="space-y-2">
              {items.map((label, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:bg-gray-50">
                    <Checkbox
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      checked={checks[i]}
                      onChange={() => handleToggle(i)}
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* 하단 버튼 */}
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                <span
                  className={allChecked ? "text-emerald-600 font-medium" : ""}
                >
                  {allChecked
                    ? "모든 동의가 완료되었습니다."
                    : "모두 동의 시 버튼이 활성화됩니다."}
                </span>
              </p>
              <button
                type="button"
                onClick={handlelPrint}
                disabled={!allChecked}
                aria-disabled={!allChecked}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm
                transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  allChecked
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-emerald-600 text-white"
                }`}
              >
                출력하기
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

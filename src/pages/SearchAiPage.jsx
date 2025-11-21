import React from "react";
import { useState, useEffect } from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import axios from "axios";
import TopTitle from "@components/SearchAI/TopTitle";
import ResultCard from "@/components/SearchAI/ResultCard";
import TextCard from "@/components/SearchAI/textCard";
import ImgCard from "@components/SearchAI/ImgCard";

export default function SearchAiPage() {
  const [file, setFile] = useState(null); // 업로드 파일 state로 관리
  const [productName, setProductName] = useState(""); // 검색할 제품명
  const [result, setResult] = useState(null); // ai 약 분석 결과 문장
  const [isLoading, setIsLoading] = useState(false); // 로딩중인가

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  async function fetchData(mode) {
    setIsLoading(true); // 로딩시작

    if (mode === "image" && !file) return;
    if (mode === "text" && !productName) return;

    const selectedFile = file;
    const selectedProductName = productName;

    // UI 먼저 초기화
    setFile(null);
    setProductName("");

    const formData = new FormData();
    if (mode === "image") formData.append("file", selectedFile);
    if (mode === "text") formData.append("productName", selectedProductName);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/searchAi",
        formData
      );
      const { message } = res.data;
      setResult(message);
    } catch (err) {
      console.error("요청 실패: ", err);
      alert("요청 실패");
    } finally {
      setIsLoading(false); // 로딩종료
    }
  }

  return (
    <div className=" min-h-screen flex flex-col bg-green-50">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        {/* 네비게이션바 */}
        <NavigationBar />
      </header>
      <main className="grow mx-auto px-7 py-7">
        {/* 상단 제목 텍스트 */}
        <TopTitle />

        {/* 메인 컨텐츠 영역 */}
        <section className="min-w-[1000px] max-w-[1300px] bg-white rounded-2xl p-5 shadow-lg border border-black/5">
          {/* 결과 영역 */}
          <ResultCard isLoading={isLoading} result={result} />

          {/* 입력 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* 이미지 업로드 */}
            <ImgCard
              fetchData={fetchData}
              file={file}
              productName={productName}
              setFile={setFile}
            />

            {/* 텍스트 검색 */}
            <TextCard
              productName={productName}
              setProductName={setProductName}
              fetchData={fetchData}
              file={file}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

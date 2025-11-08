import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import Footer from "@components/common/footer/footer";
import BasicButton from "@components/common/button/BasicButton";
import axios from "axios";

export default function SearchAiPage() {
  const [file, setFile] = useState(); // 업로드 파일 state로 관리
  const [result, setResult] = useState(null); // ai 약 분석 결과 문장

  // 파일 드롭시 호출
  const onDrop = useCallback((accepted) => {
    if (!accepted?.length) return;
    const f = accepted[0];

    // 이전 미리보기 해제
    setFile((prev) => {
      if (prev?.preview) URL.revokeObjectURL(prev.preview);
      return Object.assign(f, { preview: URL.createObjectURL(f) });
    });
  }, []);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  //useDropzone 구조분해할당
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop, // 파일 드롭시 호출되는 콜백함수
      accept: { "image/*": [] }, // 이미지 파일만 허용
      multiple: false, // 한 개만(다수 방지)
      maxFiles: 1, // 추가 보강(파일 한개만)
    });

  async function fetchData() {
    const formDate = new FormData();
    formDate.append("file", file);

    try {
      // 검색 API 호출 (POST)
      const res = await axios.post(
        "http://localhost:5000/api/searchAi",
        formDate,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      const { message } = res.data;
      setResult(message);
    } catch (err) {
      console.error("요청 실패: ", err);
      // 실패 처리: 필요시 에러 상태 처리 및 UI 표시 추가 가능
    }
  }

  return (
    <div className=" min-h-screen flex flex-col bg-green-50">
      <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
        {/* 네비게이션바 */}
        <NavigationBar />
      </header>
      <main className="grow min-w-270 mx-auto px-7 py-7">
        <div
          {...getRootProps()}
          className={`border-1 ... ${isDragAccept ? "border-green-500" : ""} ${
            isDragReject ? "border-red-500" : ""
          }`}
        >
          <input {...getInputProps()} />
          이미지를 드래그하거나 클릭하세요
        </div>

        <div className="mt-4">
          {file && (
            <>
              <div className="rounded">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-100 h-100 m-10 "
                />
              </div>
              <BasicButton onClick={fetchData}>전송</BasicButton>
            </>
          )}
        </div>

        <div className="bg-gray-50 m-10">{result}</div>
      </main>
      <Footer />
    </div>
  );
}

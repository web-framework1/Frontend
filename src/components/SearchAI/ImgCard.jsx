import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { XCircle, Upload } from "lucide-react";

export default function ImgCard({ fetchData, file, productName, setFile }) {
  const onDrop = useCallback(
    (accepted) => {
      if (!accepted?.length) return;
      const f = accepted[0];

      // 이전 미리보기 해제
      setFile((prev) => {
        if (prev?.preview) URL.revokeObjectURL(prev.preview);
        return Object.assign(f, { preview: URL.createObjectURL(f) });
      });
    },
    [setFile]
  );

  //useDropzone 구조분해할당
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop, // 파일 드롭시 호출되는 콜백함수
      accept: { "image/*": [] }, // 이미지 파일만 허용
      multiple: false, // 한 개만(다수 방지)
      maxFiles: 1, // 추가 보강(파일 한개만)
    });

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={`
              border-2 border-dashed border-green-200 rounded-2xl p-5 
              bg-gradient-to-b from-teal-50 to-white transition-all duration-300
              ... 
              ${isDragAccept ? "border-green-600" : ""} 
              ${isDragReject ? "border-red-500" : ""}`}
      >
        <div className="mt-4 flex flex-col items-center justify-center">
          {file ? (
            <div className="relative">
              <button
                onClick={() => {
                  setFile();
                }}
                className="absolute top-0 right-0
                    bg-red-100 backdrop-blur-sm hover:bg-red-200 p-2 rounded-full 
                    shadow-lg transition-all hover:scale-110"
              >
                <XCircle className="w-5 h-5 text-red-800" />
              </button>
              <img
                src={file.preview}
                alt={file.name}
                className=" object-contain m-2"
              />
            </div>
          ) : (
            <>
              <input {...getInputProps()} />
              <div
                className={`p-6 mb-5 rounded-full transition-all duration-300 ${
                  isDragAccept
                    ? "bg-green-500 scale-110"
                    : "bg-gradient-to-br from-green-100 to-emerald-100"
                }`}
              >
                <Upload
                  className={`w-12 h-12 ${
                    isDragAccept ? "text-white" : "text-green-600"
                  }`}
                />
              </div>
              <div className="font-extrabold text-gray-800 mb-1">
                🖼️📄이미지를 드래그&드롭 하세요
              </div>
            </>
          )}
        </div>
      </div>
      {/* 이미지 검색 버튼 */}
      <button
        onClick={() => fetchData("image")}
        disabled={!file || !!productName} // 이미지만 있을 때 활성화
        className={`px-5 py-3 rounded-xl font-extrabold text-white whitespace-nowrap transition-all
                  ${
                    file && !productName
                      ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
      >
        이미지 검색하기
      </button>
    </div>
  );
}

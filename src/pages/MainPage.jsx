import React from "react";
import { useState } from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import SearchInput from "@components/common/input/search-input";
import Card from "@components/common/card/Card";
import BannerSlider from "@components/common/slider/banner-slider";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";
import Middle from "@components/common/middle/Middle";

function MainPage() {
  const [productQuery, setProductQuery] = useState("");

  return (
    <>
      <div className=" min-h-screen flex flex-col bg-green-50">
        <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
          <NavigationBar />
        </header>

        <main className="max-w-6xl mx-auto px-7 py-7">
          <BannerSlider />

          <section className="grid grid-cols-3 gap-6 mt-7">
            <div className="col-span-2">
              <Middle />
            </div>
            <Card title="참여방법 (빠른 안내)">
              <p className="mb-4">
                수거함 위치를 잘 모르겠다면 가까운 수거함을 찾아보고, 폐기할
                제품의 환경 영향을 검색하세요.
              </p>
              <div className="flex gap-2">
                <CustomButton color="gradient" onClick={() => {}}>
                  지도 바로가기
                </CustomButton>
                <CustomButton color="gray" onClick={() => {}}>
                  제품검색
                </CustomButton>
              </div>
            </Card>
          </section>

          <section className="grid grid-cols-2 gap-6 mt-7">
            <Card title="지도 탐색 및 길찾기">
              <p>
                주소 입력으로 가까운 약국/보건소 수거함 위치를 확인하고,
                길찾기로 이동할 수 있습니다.
              </p>
            </Card>

            <Card title="환경 영향 시각화">
              <p>
                수거된 폐의약품이 환경에 미치는 긍정적 영향을 그래프와 데이터로
                확인해보세요.
              </p>
              <div className="flex justify-around mt-4 text-center">
                <div>
                  <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center font-bold text-green-700">
                    70%
                  </div>
                  <span className="text-sm">수질 개선</span>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center font-bold text-green-700">
                    59%
                  </div>
                  <span className="text-sm">토양 보호</span>
                </div>
              </div>
            </Card>

            <Card title="제품명 검색">
              <p className="mb-4">
                제품명을 입력하면 폐의약품 정보를 안내합니다. 헷갈리는 제품은
                'AI약품검색'으로 검색하세요.
              </p>
              <SearchInput
                value={productQuery}
                onChange={(e) => setProductQuery(e.gantarget.value)}
                onSearch={(val) => alert(`제품 검색: ${val}`)}
                placeholder="예) 타이레놀"
              />
            </Card>

            <Card title="게시판 / 이벤트">
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <a href="#" className="hover:underline text-blue-600">
                    [10.15] 한국 휴가 캠페인 시작
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-blue-600">
                    [09.25] 교육 자료 업로드
                  </a>
                </li>
              </ul>
            </Card>

            <Card title="퀴즈 / 미니게임">
              <p>Q. 사용한 약을 변기에 버려도 될까요?</p>
              <div className="flex justify-around items-center mt-4">
                <CustomButton color="blue" onClick={() => alert("O")}>
                  O
                </CustomButton>
                <span className="font-bold text-gray-400">vs</span>
                <CustomButton color="red" onClick={() => alert("X")}>
                  X
                </CustomButton>
              </div>
            </Card>

            <Card title="참여방법">
              <p className="mb-4">
                1. 주소로 주변 수거함 찾기 - 2. 약품 분류 확인 - 3. 가까운
                수거함에 배출
              </p>
            </Card>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default MainPage;

import React from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import { Card } from "@components/common/card/card";
import BannerSlider from "@components/common/slider/banner-slider";
import Footer from "../components/common/footer/footer";
import { useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" min-h-screen flex flex-col bg-green-50">
        <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
          {/* 네비게이션바 */}
          <NavigationBar />
        </header>
        <main className="grow min-w-270 mx-auto px-7 py-7">
          {/* 베너 슬라이더 */}
          <BannerSlider />
          {/* 카드 영역 */}
          <section className="grid grid-cols-2 gap-5 mb-5">
            {/* 수거함 지도 */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.about);
              }}
            >
              수거함 지도
            </Card>

            {/* AI 약검색 */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.about);
              }}
            >
              AI 약검색
            </Card>

            {/* 안심 봉투 */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.printer);
              }}
            >
              안심 봉투
            </Card>

            {/* 퀴즈 */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.about);
              }}
            >
              퀴즈
            </Card>

            {/* 게시판 */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.about);
              }}
            >
              게시판
            </Card>

            {/* 캠페인? */}
            <Card
              className="min-h-50 shadow-lg hover:bg-gray-100 border-black/5 bg-white"
              onClick={() => {
                navigate(routes.about);
              }}
            >
              캠페인?
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;

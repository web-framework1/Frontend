import React from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import { useNavigate } from "react-router-dom";
import routes from "@utils/constants/routes";
import Card from "@components/common/card/Card";
import BannerSlider from "@components/common/slider/banner-slider";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";
import Middle from "@components/common/middle/Middle";
import ShareSNS from "@components/common/ShareSNS/ShareSNS";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import QnaPreview from "@components/board/QnaPreview";
import BoardPreview from "@components/board/BoardPreview";

import {
  ScanSearch,
  Printer,
  Mail,
  ChevronRight,
  Sparkles,
  Gamepad2,
  Puzzle,
  FileText,
  MessageCircleQuestion,
  BarChart3,
  Leaf,
} from "lucide-react";

function MainPage() {
  const navigate = useNavigate();

  const defaultCenter = { lat: 37.566826, lng: 126.9786567 };

  return (
    <>
      <div className=" min-h-screen flex flex-col bg-green-50">
        <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
          <NavigationBar />
        </header>

        {/* SNS공유 사이드 바: props로 children */}
        <ShareSNS>
          <main className="max-w-6xl mx-auto px-7 py-7">
            <BannerSlider />

            <section className="grid grid-cols-3 gap-6 mt-7 items-stretch">
              <div className="col-span-2 h-full">
                <Middle className="h-full" />
              </div>
              <Card
                title="참여방법 (빠른 안내)"
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <p className="mb-4 text-sm text-gray-600">
                    수거함 위치를 잘 모르겠다면 가까운 수거함을 찾아보고, 폐기할
                    제품의 환경 영향을 검색하세요.
                  </p>

                  {/* 문구와 버튼 사이 미니맵 영역 */}
                  <div className="w-full h-40 mb-4 rounded-lg overflow-hidden border border-gray-200 relative z-0">
                    <Map
                      center={defaultCenter}
                      style={{ width: "100%", height: "100%" }}
                      level={7}
                      draggable={false}
                      zoomable={false}
                    >
                      <MapMarker position={defaultCenter} />
                    </Map>
                    <div className="absolute inset-0 bg-transparent"></div>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <CustomButton
                    color="gradient"
                    onClick={() => {
                      navigate(routes.map);
                    }}
                  >
                    지도 바로가기
                  </CustomButton>
                  <CustomButton
                    color="gray"
                    onClick={() => {
                      navigate(routes.searchAi);
                    }}
                  >
                    제품검색
                  </CustomButton>
                </div>
              </Card>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
              {/* AI 약검색 */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    <span>AI 약품 검색</span>
                  </div>
                }
                className="cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all group relative overflow-hidden"
                onClick={() => {
                  navigate(routes.searchAi);
                }}
              >
                <div className="relative z-10">
                  <p className="mb-6 text-gray-600 break-keep">
                    사진을 찍거나 이름을 입력하면 AI가 어떤 약인지 척척
                    알려드립니다.
                    <br />
                    <span className="text-xs text-gray-400 mt-2 inline-block">
                      #이미지검색 #모양검색 #식별정보
                    </span>
                  </p>
                  <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                    검색하러 가기 <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                  <ScanSearch size={120} className="text-indigo-600" />
                </div>
              </Card>

              {/* 안심 봉투 */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span>폐의약품 안심 봉투</span>
                  </div>
                }
                className="cursor-pointer hover:border-emerald-200 hover:shadow-md transition-all group relative overflow-hidden"
                onClick={() => {
                  navigate(routes.printer);
                }}
              >
                <div className="relative z-10">
                  <p className="mb-6 text-gray-600 break-keep">
                    집에서 편하게 전용 봉투를 출력하세요. 우체통에 넣으면
                    수거해갑니다.
                    <br />
                    <span className="text-xs text-gray-400 mt-2 inline-block">
                      #A4출력 #무료도안 #우체통배출
                    </span>
                  </p>
                  <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                    도안 내려받기 <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                  <Printer size={110} className="text-emerald-600" />
                </div>
              </Card>

              {/* 퀴즈 */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-purple-500" />
                    <span>퀴즈 / 미니게임</span>
                  </div>
                }
                className="cursor-pointer hover:border-purple-200 hover:shadow-md transition-all group relative overflow-hidden"
                onClick={() => {
                  navigate(routes.quiz);
                }}
              >
                <div className="relative z-10">
                  <p className="mb-4 text-gray-700 font-medium">
                    Q. 사용한 약을 변기에 버려도 될까요?
                  </p>
                  <div className="flex justify-around items-center mt-4 bg-purple-50/50 p-3 rounded-lg">
                    <CustomButton
                      color="blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(
                          "틀렸습니다!\n\n폐의약품을 변기나 하수구에 버리면 수질과 토양이 심각하게 오염되어 생태계를 파괴합니다.\n\n반드시 전용 수거함에 배출해주세요!"
                        );
                      }}
                    >
                      O
                    </CustomButton>
                    <span className="font-bold text-purple-300">VS</span>
                    <CustomButton
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(
                          "정답입니다!\n\n환경 오염을 막기 위해 폐의약품은 반드시 약국, 보건소, 주민센터 등의 전용 수거함에 분리 배출해야 합니다.\n\n잘 알고 계시네요!"
                        );
                      }}
                    >
                      X
                    </CustomButton>
                  </div>
                </div>
                <div className="absolute -right-2 -bottom-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                  <Puzzle size={130} className="text-purple-600" />
                </div>
              </Card>

              {/* 게시판 */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <span>게시판 / 이벤트</span>
                  </div>
                }
                className="h-auto cursor-pointer hover:border-orange-200 hover:shadow-md transition-all group relative overflow-hidden"
                onClick={() => navigate(routes.board || "/board")}
              >
                <div className="relative z-10">
                  <BoardPreview isMain={true} />
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-500">
                  <FileText size={130} className="text-orange-500" />
                </div>
              </Card>

              {/* 환경 영향 시각화 */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>환경 영향 시각화</span>
                  </div>
                }
                className="hover:border-blue-200 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-gray-600 mb-4 text-sm">
                    올바른 폐기가 가져오는 긍정적 변화
                  </p>
                  <div className="flex justify-around text-center">
                    <div>
                      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg ring-4 ring-blue-50/50 mb-1 mx-auto">
                        70%
                      </div>
                      <span className="text-xs text-gray-500">수질 개선</span>
                    </div>
                    <div>
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center font-bold text-green-600 text-lg ring-4 ring-green-50/50 mb-1 mx-auto">
                        59%
                      </div>
                      <span className="text-xs text-gray-500">토양 보호</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-2 opacity-5 group-hover:opacity-10 transition-all duration-500">
                  <Leaf size={120} className="text-green-600" />
                </div>
              </Card>

              {/* Q&A */}
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <MessageCircleQuestion className="w-5 h-5 text-slate-600" />
                    <span>Q&A</span>
                  </div>
                }
                className="h-auto cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group relative overflow-hidden"
                onClick={() => navigate(routes.faq || "/faq")}
              >
                <div className="relative z-10">
                  <QnaPreview />
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-105 transition-all duration-500">
                  <MessageCircleQuestion
                    size={120}
                    className="text-slate-600"
                  />
                </div>
              </Card>
            </section>
          </main>
        </ShareSNS>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;

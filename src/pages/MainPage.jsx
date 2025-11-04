import React from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import SearchInput from "@components/common/input/search-input";
import { useState } from "react";
import { Card } from "@components/common/card/card";
import BannerSlider from "@components/common/slider/banner-slider";
import CustomButton from "@components/common/button/custom-button";
import Footer from "@components/common/footer/footer";
import Checkbox from "@components/common/checkbox/Checkbox";
import Middle from "@components/common/middle/Middle";

function MainPage() {
  const [q1, setQ] = useState("");

  return (
    <>
      <div className=" min-h-screen justify-center bg-green-50">
        <header className="sticky top-0 z-30 backdrop-blur-sm bg-white/90 border-b border-black/5">
          {/* 네비게이션바 */}
          <NavigationBar />
        </header>
        <main className="max-w-6xl mx-auto px-7 py-7">
          {/* 베너 슬라이더 */}
          <BannerSlider />
          <Middle />
          <br></br>
          {/* 카드 영역 */}
          <section className="grid grid-cols-2 gap-5 mb-5">
            <Card className="min-h-32 shadow-lg border-black/5 bg-white">
              hello
              <SearchInput
                value={q1}
                onChange={(e) => setQ(e.target.value)}
                onSearch={(val) => alert(val)}
              />
            </Card>
            <Card className="min-h-32 shadow-lg border-black/5">
              hello
              <CustomButton text="hello" color="red">
                안녕
              </CustomButton>
              <CustomButton text="world" color="blue" />
              <br />
              hello
            </Card>
          </section>

          <Checkbox label="주의사항" />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;

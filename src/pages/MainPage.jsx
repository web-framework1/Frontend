import React from "react";
import { NavigationBar } from "@components/common/bar/navigation-bar";
import SearchInput from "@components/common/input/search-input";
import { useState } from "react";
import { Card } from "@components/common/card/card";
import BannerSlider from "@components/common/slider/banner-slider";
import CustomButton from "@components/common/button/custom-button";

function MainPage() {
  const [q, setQ] = useState("");

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
          {/* 카드 영역 */}
          <section
            className="
          grid grid-cols-2
          gap-5 mb-5"
          >
            <Card className="min-h-32 shadow-lg border-black/5 bg-white">
              hello
              <SearchInput
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onSearch={(val) => alert(val)}
              />
            </Card>
            <Card className="min-h-32 shadow-lg border-black/5">
              hello
              <CustomButton text="hello" color="red" />
              <CustomButton text="world" color="blue" />
              <br />
              hello
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}

export default MainPage;

// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// 공통 컴포넌트
import Header from "./components/common/bar/Header.jsx";
import Footer from "./components/common/footer/Footer.jsx";

// 페이지 컴포넌트
import MainPage from "./pages/MainPage.jsx";
import MapPage from "./pages/MapPage.jsx";
// import BoardPage from './pages/BoardPage.jsx'; // (게시판 페이지가 있다면 import)

function App() {
  // NavBar에 전달할 메뉴 목록
  const mainNavItems = [
    { title: "지도", path: "/map" },
    { title: "약품검색", path: "/search" },
    { title: "게시판", path: "/board" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoText="폐의약품 지도" navItems={mainNavItems} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />

          {/* <Route path="/board" element={<BoardPage />} /> */}
          {/* <Route path="/search" element={...} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

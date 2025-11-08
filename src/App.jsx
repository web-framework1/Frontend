// src/App.jsx
import React from "react"; // useState는 지금 안 쓰지만 일단 둡니다.
import { Routes, Route } from "react-router-dom";

// --- 올바른 경로에서 컴포넌트 Import ---
import Header from "./components/common/bar/Header.jsx";
import Footer from "./components/common/footer/Footer.jsx";
import MainPage from "./pages/MainPage.jsx";
// import AboutPage from './pages/AboutPage.jsx';
// import BoardPage from './pages/BoardPage.jsx';

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

          {/* <Route path="/board" element={<BoardPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App; // 👈 이 줄이 빠져있었습니다.

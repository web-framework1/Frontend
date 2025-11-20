import routes from "./utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import React from "react";
import MainPage from "@pages/MainPage";
import MapPage from "@pages/MapPage";
//import SearchAiPage from "@pages/SearchAiPage";
//import PrinterPage from "@pages/PrinterPage";
import Quiz from "@pages/QuizPage";
import BoardPage from "@pages/BoardPage";
import FaqPage from "@pages/FaqPage";
import BoardDetailPage from "./pages/BoardDetailPage"; // 일반 게시글 상세 (새로 만듦)
import FaqDetailPage from "./pages/FaqDetailPage"; // Q&A 상세 (새로 만듦)
function App() {
  return (
    <Routes>
      <Route path={routes.about} element={<AboutPage />}></Route>
      <Route path={routes.home} element={<MainPage />}></Route>
      <Route path={routes.map} element={<MapPage />}></Route>
      {/* <Route path="/search-ai" element={<SearchAiPage />} /> */}
      {/*<Route path={routes.printer} element={<PrinterPage />}></Route>*/}
      <Route path={routes.quiz} element={<Quiz />}></Route>
      <Route path="/board" element={<BoardPage />} />
      <Route path="/faq" element={<FaqPage />} />

      {/* 3. [추가] 상세 페이지를 위한 '동적 라우트' 추가 */}
      {/* 일반 게시글 클릭 시 -> BoardDetailPage 보여주기 */}
      <Route path="/post/:id" element={<BoardDetailPage />} />

      {/* Q&A 글 클릭 시 -> FaqDetailPage 보여주기 */}
      <Route path="/faq/:id" element={<FaqDetailPage />} />
    </Routes>
  );
}

export default App;

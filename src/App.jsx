import routes from "@utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AboutPage from "@pages/AboutPage";
import React from "react";
import MainPage from "@pages/MainPage";
import MapPage from "@pages/MapPage";
import SearchAiPage from "@pages/SearchAiPage";
import PrinterPage from "@pages/PrinterPage";
import Quiz from "@pages/QuizPage";

function App() {
  return (
    <Routes>
      <Route path={routes.about} element={<AboutPage />}></Route>
      <Route path={routes.home} element={<MainPage />}></Route>
      <Route path={routes.map} element={<MapPage />}></Route>
      <Route path={routes.searchAi} element={<SearchAiPage />}></Route>
      <Route path={routes.printer} element={<PrinterPage />}></Route>
      <Route path={routes.quiz} element={<Quiz />}></Route>
    </Routes>
  );
}

export default App;

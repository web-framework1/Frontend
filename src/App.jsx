import routes from "@utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AboutPage from "@pages/AboutPage";
import React from "react";
import MainPage from "@pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path={routes.about} element={<AboutPage />}></Route>
      <Route path={routes.home} element={<MainPage />}></Route>
    </Routes>
  );
}

export default App;

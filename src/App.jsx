import routes from "@utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AboutPage from "@pages/AboutPage";
import React from "react";
import MainPage from "@pages/MainPage";
import PrinterPage from "@pages/PrinterPage";

function App() {
  return (
    <Routes>
      <Route path={routes.about} element={<AboutPage />}></Route>
      <Route path={routes.home} element={<MainPage />}></Route>
      <Route path={routes.printer} element={<PrinterPage />}></Route>
    </Routes>
  );
}

export default App;

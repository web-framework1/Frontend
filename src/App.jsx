import routes from "./utils/constants/routes";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path={routes.about} element={<AboutPage />}></Route>
      <Route path="/" element={<AboutPage />}></Route>
    </Routes>
  );
}

export default App;

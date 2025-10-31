import React from "react";
import pill from "@assets/pill.png";

function Logo() {
  return (
    <a
      className="
      text-2xl font-bold text-green-700 tracking-wide 
      flex items-center rounded-lg hover:text-pink-600"
      href="/"
    >
      <img src={pill} alt="약아이콘" className="mx-2" />
      약모아
    </a>
  );
}

export default Logo;

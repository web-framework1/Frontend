import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@components/common/bar/logo";
import CustomButton from "@components/common/button/custom-button";

const NavigationItem = ({ text, url }) => {
  return (
    <Link
      to={url}
      className="
      font-semibold text-gray-700 hover:text-green-700 
      px-3 py-auto rounded-lg hover:bg-green-200 transition-colors
      "
    >
      {text}
    </Link>
  );
};

export default function NavHeaderMap() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between px-6 py-3">
      <Logo />
      <div className="flex items-center gap-5">
        <nav>
          <ul className="flex gap-5 list-none items-center">
            <li>
              <NavigationItem text="지도" url="/map" />
            </li>
            <li>
              <NavigationItem text="안심 봉투" url="/printer" />
            </li>
            <li>
              <NavigationItem text="AI약품검색" url="/searchAi" />
            </li>
            <li>
              <NavigationItem text="퀴즈" url="/quiz" />
            </li>
            <li>
              <NavigationItem text="게시판" url="/board" />
            </li>
          </ul>
        </nav>
        <CustomButton
          type="button"
          color="gradient"
          onClick={() => {
            navigate("/map");
          }}
        >
          내 주변 수거함 찾기
        </CustomButton>
      </div>
    </div>
  );
}
export { NavHeaderMap, NavigationItem };

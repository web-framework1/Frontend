// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom"; // 페이지 이동을 위해 Link 사용

const NavBar = ({ logoText, navItems = [] }) => {
  // navItems 예시: [{ title: '홈', path: '/' }, { title: '소개', path: '/about' }]
  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        {logoText || "MyLogo"}
      </Link>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="font-medium text-gray-600 hover:text-blue-500"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

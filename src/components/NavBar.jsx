import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ logoText, navItems = [] }) => {
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

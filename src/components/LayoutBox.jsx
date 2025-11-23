import React from "react";

const LayoutBox = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};

export default LayoutBox;

import React from "react";
import { cn } from "@utils/functions/utils";

function Card({ title, children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-lg shadow-md border border-gray-100 p-5 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 hover:bg-emerald-50 hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
}

export default Card;

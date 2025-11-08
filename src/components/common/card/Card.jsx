import React from "react";
import { cn } from "@utils/functions/utils";

function Card({ title, children, className }) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md border border-gray-100 p-5",
        className
      )}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
}

export default Card;

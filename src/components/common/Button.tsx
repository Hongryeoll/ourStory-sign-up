"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full h-12 px-4 rounded-md font-semibold
        ${
          disabled
            ? "bg-gray-300 text-white"
            : "bg-pink-500 text-white hover:bg-pink-600"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

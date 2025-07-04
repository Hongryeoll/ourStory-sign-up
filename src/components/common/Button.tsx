"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset";
  variant?: "default" | "line";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  htmlType = "button",
  variant = "default",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClass =
    "w-full h-12 px-4 rounded-md font-semibold transition-colors";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: disabled
      ? "bg-purple-300 text-white cursor-not-allowed"
      : "bg-purple-500 text-white hover:bg-purple-600",
    line: disabled
      ? "border border-purple-200 text-purple-200 cursor-not-allowed"
      : "border border-purple-500 text-purple-500 hover:bg-purple-50",
  };

  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

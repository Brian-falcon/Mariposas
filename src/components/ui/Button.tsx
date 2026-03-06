"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg",
  secondary: "bg-white border-2 border-primary-500 text-primary-700 hover:bg-primary-50",
  success: "bg-green-500 hover:bg-green-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const sizes = {
  sm: "px-4 py-2 text-base min-h-[44px]",
  md: "px-6 py-3 text-lg min-h-[52px]",
  lg: "px-8 py-4 text-xl min-h-[60px]",
};

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-bold rounded-2xl transition-all duration-200
        active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-400/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

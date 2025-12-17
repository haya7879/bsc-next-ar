import React from "react";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ className = "", size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center py-8 h-[150px] ${className}`}
      aria-label="Loading"
    >
      <div
        className={`${sizeClasses[size]} border-[#253a7b] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}


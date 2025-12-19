import React from "react";

interface LoadingStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function LoadingState({
  title,
  message = "",
  className = "mt-10!",
}: LoadingStateProps) {
  return (
    <section className={className}>
      {title && <h1 className="md:text-[28px]! text-[24px]! text-[#253a7b]! font-semibold">{title}</h1>}
        <div className="text-[#666]! text-sm!">{message}</div>
    </section>
  );
}

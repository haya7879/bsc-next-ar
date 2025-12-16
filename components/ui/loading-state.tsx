import React from "react";

interface LoadingStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function LoadingState({
  title,
  message = "Loading...",
  className = "search-courses home-courses",
}: LoadingStateProps) {
  return (
    <section className={className}>
      {title && <h2 className="md:text-3xl! text-xl! text-[#253a7b]! font-semibold">{title}</h2>}
      <div className="card-container">
        <div>{message}</div>
      </div>
    </section>
  );
}

import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function ErrorState({ 
  title, 
  message = "Failed to load data. Please try again later.", 
  className = "search-courses home-courses" 
}: ErrorStateProps) {
  return (
    <section className={className}>
      <div className="container-main">
        {title && <h2>{title}</h2>}
        <div className="card-container">
          <div className="no-results">{message}</div>
        </div>
      </div>
    </section>
  );
}


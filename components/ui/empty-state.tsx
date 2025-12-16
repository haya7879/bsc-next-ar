import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export default function EmptyState({ 
  title, 
  message = "No data available.", 
  className = "search-courses home-courses" 
}: EmptyStateProps) {
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


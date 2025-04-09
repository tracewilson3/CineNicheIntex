import React, { useEffect, useRef, useState } from 'react';
import '../css/PaginatedMovieRow.css';

const placeholderImage = 'https://placehold.co/165x240?text=Movie';

interface PaginatedMovieRowProps {
  title: string;
}

const PaginatedMovieRow: React.FC<PaginatedMovieRowProps> = ({ title }) => {
  const [movieCount, setMovieCount] = useState(15);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setMovieCount((prev) => prev + 15);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="horizontal-scroll-container">
        {[...Array(movieCount)].map((_, i) => (
          <div
            key={i}
            className="movie-row-card"
            style={{ backgroundImage: `url(${placeholderImage})` }}
          ></div>
        ))}
        <div ref={loader} className="movie-row-card loader-sentinel"></div>
      </div>
    </div>
  );
};

export default PaginatedMovieRow;

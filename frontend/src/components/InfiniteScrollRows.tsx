import React, { useState, useEffect, useRef } from 'react';
import '../css/InfiniteScrollRows.css';

const placeholderImage = 'https://placehold.co/165x240?text=Movie';

const InfiniteScrollGrid = () => {
  const [movieCount, setMovieCount] = useState(35); // 7 across × 5 rows
  const loader = useRef(null);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setMovieCount((prev) => prev + 35);
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
    <div className="infinite-scroll-grid-wrapper">
      <h2 className="grid-title">Explore All Movies</h2>
      <div className="movie-grid">
        {[...Array(movieCount)].map((_, i) => (
          <div
            key={i}
            className="movie-grid-card"
            style={{ backgroundImage: `url(${placeholderImage})` }}
          ></div>
        ))}
      </div>
      <div className="loading-sentinel" ref={loader}></div>
    </div>
  );
};

export default InfiniteScrollGrid;

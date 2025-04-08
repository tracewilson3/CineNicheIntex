import React from 'react';
import './MovieRow.css'; // You'll make this too

const placeholderImage = 'https://placehold.co/150x225?text=Movie';

type MovieRowProps = {
  title: string;
};

const MovieRow: React.FC<MovieRowProps> = ({ title }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="carousel">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="movie-row-card"
            style={{ backgroundImage: `url(${placeholderImage})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;

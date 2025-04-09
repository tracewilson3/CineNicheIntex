import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../css/MovieRow.css";

const placeholderImage = "https://placehold.co/150x225?text=Movie";

type MovieRowProps = {
  title: string;
};

const MovieRow: React.FC<MovieRowProps> = ({ title }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="carousel">
        {[...Array(20)].map((_, i) => (
          <Link
            to={`/MovieDetails/${i}`}
            key={i}
            className="movie-row-card"
            style={{
              backgroundImage: `url(${placeholderImage})`,
              textDecoration: "none",
            }}
          ></Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;

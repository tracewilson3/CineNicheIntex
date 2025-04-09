import React from "react";
import "../css/MoviesPage1.css";
import "../css/MovieRow.css";
import StarRating from "../components/StarRating";
import CineNicheHeader from "../components/CineNicheHeader";

const MovieDetails: React.FC = () => {
  const movie = {
    title: "Example Movie",
    imageUrl: "https://via.placeholder.com/300x450",
    description: `This is a placeholder description for the movie. 
    You'll be able to populate this with dynamic content later.`,
  };

  const placeholderImage = "https://placehold.co/150x225?text=Movie";

  return (
    <>
      <CineNicheHeader />
      <div className="container-fluid w-100 app dark-background text-white min-vh-100">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4">
            <img
              src={placeholderImage}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: "300px", height: "450px" }}
            />
          </div>
          <div className="col-md-8">
            <h1 className="display-4">Avatar: The Last Airbender</h1>
            <p className="lead mt-3">
              A young boy known as the Avatar must master the four elemental powers to save a world
              at war and fight a ruthless enemy bent on stopping him.
            </p>
          </div>
        </div>

        <div className="text-center my-4">
          <StarRating onRate={(value) => console.log(`Rated: ${value} stars`)} />
        </div>

        <div className="section">
          <h2>You Might Also Like...</h2>
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
      </div>
    </>
  );
};

export default MovieDetails;

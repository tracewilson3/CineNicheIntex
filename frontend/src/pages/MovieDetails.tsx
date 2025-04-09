import { useEffect, useState } from "react";
import "./MoviesPage1.css";
import "../components/MovieRow.css";
import StarRating from "../components/StarRating";
import CineNicheHeader from "../components/CineNicheHeader";
import { Movie } from "../types/movie";
import { fetchMovieDetails } from "../api/MovieAPI";
import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { show_id } = useParams<{ show_id: string }>(); // get it from the URL
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string | null>(null);
  const placeholderImage = "https://placehold.co/150x225?text=Movie";
  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";

  useEffect(() => {
    if (!show_id) return;
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(show_id);
        setMovie(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    loadMovie();
  }, [show_id]);

  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Loading movie...</p>;

  return (
    <>
      <CineNicheHeader />
      <div className="container-fluid w-100 app dark-background text-white min-vh-100">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4">
            <img
              src={`${ImageURL}/${encodeURIComponent(movie.title)}.jpg`}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: "300px", height: "450px" }}
            />
          </div>
          <div className="col-md-8">
            <h1 className="display-4">{movie.title}</h1>
            <p className="lead mt-3">{movie.description}</p>
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

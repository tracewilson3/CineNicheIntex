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

  const getGenres = (movie: Movie): string[] => {
    const genreMap: { [key in keyof Movie]?: string } = {
      action: "Action",
      adventure: "Adventure",
      anime_Series_International_TV_Shows: "Anime / International TV",
      british_TV_Shows_Docuseries_International_TV_Shows: "British / Docuseries / International",
      children: "Children",
      comedies: "Comedies",
      comedies_Dramas_International_Movies: "Comedies / Dramas / International",
      comedies_International_Movies: "Comedies / International",
      comedies_Romantic_Movies: "Comedies / Romance",
      crime_TV_Shows_Docuseries: "Crime / Docuseries",
      documentaries: "Documentaries",
      documentaries_International_Movies: "Documentaries / International",
      docuseries: "Docuseries",
      dramas: "Dramas",
      dramas_International_Movies: "Dramas / International",
      dramas_Romantic_Movies: "Dramas / Romance",
      family_Movies: "Family",
      fantasy: "Fantasy",
      horror_Movies: "Horror",
      international_Movies_Thrillers: "International / Thrillers",
      international_TV_Shows_Romantic_TV_Shows_TV_Dramas: "Romantic TV / Dramas",
      kids_TV: "Kids TV",
      language_TV_Shows: "Language TV",
      musicals: "Musicals",
      nature_TV: "Nature TV",
      reality_TV: "Reality TV",
      spirituality: "Spirituality",
      tV_Action: "TV Action",
      tV_Comedies: "TV Comedies",
      tV_Dramas: "TV Dramas",
      talk_Shows_TV_Comedies: "Talk Shows / Comedies",
      thrillers: "Thrillers",
    };

    return Object.entries(genreMap)
      .filter(([key]) => (movie as any)[key] === 1)
      .map(([_, label]) => label);
  };

  const sanitizeTitle = (title: string) => {
    return title.replace(/[#().:'!&"?-]/g, "");
  };

  const sanitized = sanitizeTitle(movie.title);
  const genres = getGenres(movie);

  return (
    <>
      <CineNicheHeader />
      <div className="container-fluid w-100 app dark-background text-white min-vh-100">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4">
            <img
              src={`${ImageURL}/${encodeURIComponent(sanitized)}.jpg`}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: "300px", height: "450px" }}
            />
          </div>
          <div className="col-md-8">
            <h1 className="display-4">{movie.title}</h1>
            <p className="lead mt-3">{movie.rating}</p>
            <p className="lead mt-3">{movie.description}</p>

            {/* get the genres */}
            {genres.length > 0 && (
              <p className="lead mt-3">
                <strong>Genres:</strong> {genres.join(", ")}
              </p>
            )}

            <p className="lead mt-3">
              <strong>Cast:</strong> {movie.cast}
            </p>
            <p className="lead mt-3">
              <strong>Director:</strong> {movie.director}
            </p>
            <p className="lead mt-3">
              <strong>Duration:</strong> {movie.duration}
            </p>
            <p className="lead mt-3">
              <strong>Released: </strong>
              {movie.release_year}
            </p>
            {}
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

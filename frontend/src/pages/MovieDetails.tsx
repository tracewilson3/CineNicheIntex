import { useEffect, useState } from "react";
import "./MoviesPage1.css";
import "../components/MovieRow.css";
import StarRating from "../components/StarRating";
import CineNicheHeader from "../components/CineNicheHeader";
import { Movie } from "../types/movie";
import { fetchMovieDetails, fetchMultipleMovieDetails, addRating } from "../api/MovieAPI";
import { useParams } from "react-router-dom";
import FloatingFooter from "../components/FloatingFooter";
import { fetchShowRecommendations } from "../api/RecommendationAPI";
import { useNavigate } from "react-router-dom";
import { fetchUserIdByEmail } from "../api/RecommendationAPI";


const MovieDetails: React.FC = () => {
  const { show_id } = useParams<{ show_id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [userId, setUserId] = useState<number | null>(null);
  

  
  const userEmail = user.email;

  // const placeholderImage = "https://placehold.co/150x225?text=Movie";
  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";
  useEffect(() => {
    async function loadUserData() {
      const id = await fetchUserIdByEmail(userEmail);
      setUserId(id);
    }

    loadUserData();
  }, [userEmail]);
  useEffect(() => {
    if (!show_id) return;
  
    const loadMovie = async () => {
      try {
        const id = parseInt(show_id); 
        if (isNaN(id)) {
          setError("Invalid movie ID.");
          return;
        }
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
  
    loadMovie();
  }, [show_id]);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (!show_id) return;
  
      try {
        const ids = await fetchShowRecommendations(show_id);
        const movies = await fetchMultipleMovieDetails(ids); // You'll write this
        setRecommended(movies);
      } catch (err) {
        console.error("Failed to load recommendations:", err);
      }
    };
  
    loadRecommendations();
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

  const renderRankedCarousel = (title: string, movieList: Movie[]) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="ranked-carousel">
        {movieList.map((movie, i) => {
          const sanitized = sanitizeTitle(movie.title);
          const rankNumberLeft = i + 1 >= 10 ? "-4rem" : "-2.5rem";
  
          return (
            <div
              className="ranked-card"
              key={movie.show_id}
              onClick={() => navigate(`/MovieDetails/${movie.show_id}`)}
            >
              <div className="rank-number" style={{ left: rankNumberLeft }}>
                {i + 1}
              </div>
              <div
                className="poster"
                style={{
                  backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)`,
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <CineNicheHeader />
      <div className="container-fluid w-100 app dark-background text-white min-vh-100 p-5">
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <img
              src={`${ImageURL}/${encodeURIComponent(sanitized)}.jpg`}
              alt={movie.title}
              className="img-fluid rounded shadow"
              style={{ width: "330px", height: "440px" }}
            />
            
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-end mb-3">
          <StarRating
  onRate={async (value) => {
    try {
      
      if (!userId || !show_id) return;

      await addRating(userId, parseInt(show_id), value);
      console.log(`✅ Saved ${value} star rating`);
    } catch (err) {
      console.error("❌ Error saving rating:", err);
    }
  }}
/>
</div>

            <h1 className="display-3 fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {movie.title}
            </h1>

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{movie.rating}</h3>
            <p className="fs-5 lh-base">{movie.description}</p>

            <p className="fs-5 mt-2">
            <strong>Starring:</strong>{" "}
            {movie.cast
              ?.split(" ")
              .reduce((acc: string[], curr, i, arr) => {
                if (i % 2 === 0) acc.push(curr + " " + (arr[i + 1] || ""));
                return acc;
              }, [])
              .join(" - ")}
          </p>

            <p className="fs-5 mt-3">
              <strong>Director:</strong> {movie.director} &nbsp;&mdash;&nbsp;
              <strong>Duration:</strong> {movie.duration} &nbsp;&mdash;&nbsp;
              <strong>Released:</strong> {movie.release_year}
            </p>

            {genres.length > 0 && (
              <p className="fs-5 mt-3">
                <strong>Genres:</strong> {genres.join(", ")}
              </p>
            )}

          </div>
        </div>

        {recommended.length > 0 && renderRankedCarousel("You Might Also Like...", recommended)}

      </div>
      <FloatingFooter/>
    </>
  );
};

export default MovieDetails;



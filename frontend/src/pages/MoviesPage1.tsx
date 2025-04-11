import "../components/MovieRow.css";
import { useEffect, useState } from "react";
import "./MoviesPage1.css";
import PaginatedMovieRow from "../components/PaginatedMovieRow";
import FloatingFooter from "../components/FloatingFooter";
import CineNicheHeader from "../components/CineNicheHeader";
import { fetchMostReviewed,  fetchTopRated } from "../api/MovieAPI.ts";
import { useNavigate } from "react-router-dom";
import "./SearchResultsPage.css";
import { fetchUserIdByEmail, fetchUserRecommendations } from "../api/RecommendationAPI.ts";
import { fetchMultipleMovieDetails } from "../api/MovieAPI.ts";
import CookieConsent from "react-cookie-consent";

const MoviesPage1 = () => {
  
  const [error, setError] = useState<string | null>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [mostReviewedMovies, setMostReviewedMovies] = useState<any[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([])
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = user.email;
  const [userId, setUserId] = useState<number | null>(null);
  const [recs, setRecs] = useState<string[]>([]);
  
  
  useEffect(() => {
    async function loadUserData() {
      const id = await fetchUserIdByEmail(userEmail);
      setUserId(id);
      
      if (id !== null) {
        const recs = await fetchUserRecommendations(id);
        setRecs(recs);
      }
      
    }

    loadUserData();
  }, [userEmail]);



  
  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        // const data = await fetchMovies(100, 1);
        // setMovies(data);

        const topRatedData = await fetchTopRated();
        setTopRatedMovies(topRatedData);

        const mostReviewedData = await fetchMostReviewed();
        setMostReviewedMovies(mostReviewedData);

        
      } catch (error) {
        setError((error as Error).message);
      }
    };

    loadAllMovies();
  }, []);
  useEffect(() => {
    const loadRecommendedMovies = async () => {
      if (recs.length === 0) return;
  
      try {
        const movieList = await fetchMultipleMovieDetails(recs);
        setRecommendedMovies(movieList);
      } catch (err) {
        console.error("Failed to load recommended movies:", err);
      }
    };
  
    loadRecommendedMovies();
  }, [recs, userId]);
  const navigate = useNavigate();
  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";
  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        // const data = await fetchMovies(100, 1);
        // setMovies(data);
        const topRatedRes = await fetchTopRated();
        const topRatedData = await topRatedRes;
        setTopRatedMovies(topRatedData);
        const mostReviewedRes = await fetchMostReviewed();
        const mostReviewedData = await mostReviewedRes;
        setMostReviewedMovies(mostReviewedData);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    loadAllMovies();
  }, []);
  if (error) return <p>Error: {error}</p>;
  const sanitizeTitle = (title: string) => {
    return title.replace(/[#().:'!&"?-]/g, "");
  };
  const renderRankedCarousel = (title: string, movieList: any[]) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="ranked-carousel">
        {movieList.map((m, i) => {
          const movie = m.movie || m;
          const sanitized = sanitizeTitle(movie.title);
          const rankNumberLeft = i + 1 >= 10 ? "-4rem" : "-2.5rem"; // :arrow_left: Shift left for double digits
          return (
            <div
              className="ranked-card"
              key={movie.show_id}
              onClick={() => navigate(`/MovieDetails/${movie.show_id}`)}
            >
              <div
                className="rank-number"
                style={{ left: rankNumberLeft }} // 🛠 dynamic left shift
              >
                {i + 1}
              </div>
              <div
                className="poster"
                style={{
                  backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)`,
                }}
              >
                {" "}
                <div className="movie-title-overlay">{movie.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  const genreList = [
    "Action",
    "Comedies",
    "Dramas",
    "Thrillers",
    "Family Movies",
    "Kids TV",
    "Horror Movies",
    "Fantasy",
    "Crime TV Shows / Docuseries",
    "TV Dramas",
    "TV Action",
    "Comedies / Romantic Movies",
    "Dramas / Romantic Movies",
    "Adventure",
    "Comedies / International Movies",
    "Dramas / International Movies",
    "Documentaries",
    "Docuseries",
    "Reality TV",
    "Comedies / Dramas / International Movies",
    "Documentaries / International Movies",
    "International Movies / Thrillers",
    "International TV Shows / Romantic TV Shows / TV Dramas",
    "Anime Series / International TV Shows",
    "British TV Shows / Docuseries / International TV Shows",
    "TV Comedies",
    "Talk Shows / TV Comedies",
    "Musicals",
    "Language TV Shows",
    "Children",
    "Nature TV",
    "Spirituality",
  ];
  return (
    <div className="app dark-background">
      <CineNicheHeader />

      {/* Cookie consent notification */}
      <CookieConsent
        location="top"
        style={{ background: "black" }}
        buttonStyle={{ background: "white", color: "black", fontSize: "13px" }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>


      {renderRankedCarousel("Top 10 Most Popular", mostReviewedMovies)}
      
      {recommendedMovies.length > 0 && (
  renderRankedCarousel("Recommended For You", recommendedMovies)
)}

      {renderRankedCarousel("Top 10 Highest Ratings", topRatedMovies)}
      {genreList.map((genre, index) => (
        <PaginatedMovieRow key={index} genreTitle={genre} />
      ))}
      <FloatingFooter />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default MoviesPage1;

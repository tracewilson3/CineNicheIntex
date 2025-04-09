import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CineNicheHeader from "../components/CineNicheHeader.tsx";
import FloatingFooter from "../components/FloatingFooter.tsx";
import "./MoviesPage1.css"; // reuse same styles
import { Movie } from "../types/movie.ts";
import "./SearchResultsPage.css"

const SearchResultsPage = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(`https://localhost:5000/Movies/Search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch search results.");
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const sanitizeTitle = (title: string) => {
    return title.replace(/[#().:'!&"?-]/g, "");
  };

  return (
    <div className="app dark-background">
      <CineNicheHeader />

      <div className="section">
        <h2>Search Results for: "{query}"</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && results.length === 0 && <p>No results found.</p>}

        <div className="movie-grid">
  {results.map((movie) => {
    const sanitized = sanitizeTitle(movie.title);
    return (
      <div
        key={movie.show_id}
        className="movie-grid-card"
        style={{
          backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)`,
        }}
        onClick={() => navigate(`/MovieDetails/${movie.show_id}`)}
      >
        <div className="movie-title-overlay">{movie.title}</div>
      </div>
    );
  })}
</div>

      </div>

      <FloatingFooter />
    </div>
  );
};

export default SearchResultsPage;

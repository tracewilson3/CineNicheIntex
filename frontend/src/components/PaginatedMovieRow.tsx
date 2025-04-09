import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../types/movie";
import { fetchMovies } from "../api/MovieAPI";
import { useNavigate } from "react-router-dom";
import "./PaginatedMovieRow.css";

interface PaginatedMovieRowProps {
  genreTitle: string;
}

const PaginatedMovieRow: React.FC<PaginatedMovieRowProps> = ({ genreTitle }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const genreFieldMap: Record<string, string> = {
    Action: "action",
    Adventure: "adventure",
    "Anime Series / International TV Shows": "anime_Series_International_TV_Shows",
    "British TV Shows / Docuseries / International TV Shows":
      "british_TV_Shows_Docuseries_International_TV_Shows",
    Children: "children",
    Comedies: "comedies",
    "Comedies / Dramas / International Movies": "comedies_Dramas_International_Movies",
    "Comedies / International Movies": "comedies_International_Movies",
    "Comedies / Romantic Movies": "comedies_Romantic_Movies",
    "Crime TV Shows / Docuseries": "crime_TV_Shows_Docuseries",
    Documentaries: "documentaries",
    "Documentaries / International Movies": "documentaries_International_Movies",
    Docuseries: "docuseries",
    Dramas: "dramas",
    "Dramas / International Movies": "dramas_International_Movies",
    "Dramas / Romantic Movies": "dramas_Romantic_Movies",
    "Family Movies": "family_Movies",
    Fantasy: "fantasy",
    "Horror Movies": "horror_Movies",
    "International Movies / Thrillers": "international_Movies_Thrillers",
    "International TV Shows / Romantic TV Shows / TV Dramas":
      "international_TV_Shows_Romantic_TV_Shows_TV_Dramas",
    "Kids TV": "kids_TV",
    "Language TV Shows": "language_TV_Shows",
    Musicals: "musicals",
    "Nature TV": "nature_TV",
    "Reality TV": "reality_TV",
    Spirituality: "spirituality",
    "TV Action": "tV_Action",
    "TV Comedies": "tV_Comedies",
    "TV Dramas": "tV_Dramas",
    "Talk Shows / TV Comedies": "talk_Shows_TV_Comedies",
    Thrillers: "thrillers",
  };

  const genreKey = genreFieldMap[genreTitle];
  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";

  const sanitizeTitle = (title: string) => {
    return title.replace(/[#().:'`!&"?-]/g, "");
  };

  const pageSize = 30;

  const loadMore = async (nextPage: number) => {
    if (!hasMore || loading || !genreKey) return;

    setLoading(true);
    try {
      const data = await fetchMovies(pageSize, nextPage, genreKey);

      setMovies((prev) => {
        const seen = new Set(prev.map((m) => m.show_id));
        const unique = data.filter((m) => !seen.has(m.show_id));
        return [...prev, ...unique];
      });

      if (data.length < pageSize) setHasMore(false);
      setPage(nextPage + 1); // 👈 now we explicitly control the next page
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 👇 ONLY run the first load once on mount
  useEffect(() => {
    loadMore(1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          loadMore(page); // 👈 now it fetches *current page only once*
        }
      },
      { threshold: 1.0 }
    );

    const current = loader.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loader.current, loading, hasMore, page]);

  return (
    <div className="section">
      <h2>{genreTitle}</h2>
      <div className="horizontal-scroll-container">
        {movies.map((movie) => {
          const sanitized = sanitizeTitle(movie.title);
          return (
            <div
              key={movie.show_id}
              className="movie-row-card"
              style={{
                backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)`,
              }}
              onClick={() => navigate(`/MovieDetails/${movie.show_id}`)}
            />
          );
        })}
        <div ref={loader} className="movie-row-card loader-sentinel" />
      </div>
    </div>
  );
};

export default PaginatedMovieRow;

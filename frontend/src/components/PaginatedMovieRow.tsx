import React, { useEffect, useRef, useState } from "react";
import "./PaginatedMovieRow.css";
import { Movie } from "../types/movie";

const placeholderImage = "https://placehold.co/165x240?text=Movie";

interface PaginatedMovieRowProps {
  title: string;
  // movies: Movie[];
}

const PaginatedMovieRow: React.FC<PaginatedMovieRowProps> = ({ title }) => {
  const [movieCount, setMovieCount] = useState(15);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setMovieCount((prev) => prev + 15);
    }
  };

  // const genreFieldMap: Record<string, keyof Movie> = {
  //   Action: "action",
  //   Adventure: "adventure",
  //   "Anime Series / International TV Shows": "anime_Series_International_TV_Shows",
  //   "British TV Shows / Docuseries / International TV Shows":
  //     "british_TV_Shows_Docuseries_International_TV_Shows",
  //   Children: "children",
  //   Comedies: "comedies",
  //   "Comedies / Dramas / International Movies": "comedies_Dramas_International_Movies",
  //   "Comedies / International Movies": "comedies_International_Movies",
  //   "Comedies / Romantic Movies": "comedies_Romantic_Movies",
  //   "Crime TV Shows / Docuseries": "crime_TV_Shows_Docuseries",
  //   Documentaries: "documentaries",
  //   "Documentaries / International Movies": "documentaries_International_Movies",
  //   Docuseries: "docuseries",
  //   Dramas: "dramas",
  //   "Dramas / International Movies": "dramas_International_Movies",
  //   "Dramas / Romantic Movies": "dramas_Romantic_Movies",
  //   "Family Movies": "family_Movies",
  //   Fantasy: "fantasy",
  //   "Horror Movies": "horror_Movies",
  //   "International Movies / Thrillers": "international_Movies_Thrillers",
  //   "International TV Shows / Romantic TV Shows / TV Dramas":
  //     "international_TV_Shows_Romantic_TV_Shows_TV_Dramas",
  //   "Kids TV": "kids_TV",
  //   "Language TV Shows": "language_TV_Shows",
  //   Musicals: "musicals",
  //   "Nature TV": "nature_TV",
  //   "Reality TV": "reality_TV",
  //   Spirituality: "spirituality",
  //   "TV Action": "tV_Action",
  //   "TV Comedies": "tV_Comedies",
  //   "TV Dramas": "tV_Dramas",
  //   "Talk Shows / TV Comedies": "talk_Shows_TV_Comedies",
  //   Thrillers: "thrillers",
  // };

  // const genreKey = genreFieldMap[title];
  // if (!genreKey) return <p>Unknown genre: {title}</p>;

  // const filteredMovies = movies.filter((m) => m[genreKey] === 1);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="horizontal-scroll-container">
        {[...Array(movieCount)].map((_, i) => (
          <div
            key={i}
            className="movie-row-card"
            style={{ backgroundImage: `url(${placeholderImage})` }}
          ></div>
        ))}
        <div ref={loader} className="movie-row-card loader-sentinel"></div>
      </div>
    </div>
  );
};

export default PaginatedMovieRow;

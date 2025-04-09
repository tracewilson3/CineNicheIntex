import "../components/MovieRow.css";

import { useEffect, useState } from "react";
import "./MoviesPage1.css";
import PaginatedMovieRow from "../components/PaginatedMovieRow";
import "../components/MovieRow.css";
import InfiniteScrollGrid from "../components/InfiniteScrollRows";
import FloatingFooter from "../components/FloatingFooter";
import CineNicheHeader from "../components/CineNicheHeader";
import { fetchMovies } from "../api/MovieAPI.ts";
import { Movie } from "../types/movie.ts";
import { useNavigate } from "react-router-dom";

const MoviesPage1 = () => {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const ImageURL = "https://cinenichemovieposters.blob.core.windows.net/movieposters";
  // useEffect(() => {
  //   const loadMovies = async () => {
  //     try {
  //       const data = await fetchMovies(100, 1);
  //       setMovies(data);
  //     } catch (error) {
  //       setError((error as Error).message);
  //     }
  //   };
  //   loadMovies();
  // }, []);

  // if (error) return <p>Error: {error}</p>;

  const sanitizeTitle = (title: string) => {
    return title.replace(/[#().:'!&"?-]/g, "");
  };

  // const renderRankedCarousel = (title: string) => (
  //   <div className="section">
  //     <h2>{title}</h2>
  //     <div className="ranked-carousel">
  //       {movies.map((m, i) => {
  //         const sanitized = sanitizeTitle(m.title);
  //         return (
  //           <div
  //             className="ranked-item"
  //             key={m.show_id}
  //             onClick={() => navigate(`/MovieDetails/${m.show_id}`)}
  //             style={{ cursor: "pointer" }}
  //           >
  //             <span className="rank-badge">{i + 1}</span>
  //             <div
  //               className="movie-row-card"
  //               style={{
  //                 backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)`,
  //               }}
  //             >
  //               {m.title}
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  const genreList = [
    "Action",
    "Adventure",
    "Anime Series / International TV Shows",
    "British TV Shows / Docuseries / International TV Shows",
    "Children",
    "Comedies",
    "Comedies / Dramas / International Movies",
    "Comedies / International Movies",
    "Comedies / Romantic Movies",
    "Crime TV Shows / Docuseries",
    "Documentaries",
    "Documentaries / International Movies",
    "Docuseries",
    "Dramas",
    "Dramas / International Movies",
    "Dramas / Romantic Movies",
    "Family Movies",
    "Fantasy",
    "Horror Movies",
    "International Movies / Thrillers",
    "International TV Shows / Romantic TV Shows / TV Dramas",
    "Kids TV",
    "Language TV Shows",
    "Musicals",
    "Nature TV",
    "Reality TV",
    "Spirituality",
    "TV Action",
    "TV Comedies",
    "TV Dramas",
    "Talk Shows / TV Comedies",
    "Thrillers",
  ];

  return (
    <div className="app dark-background">
      <CineNicheHeader />

      {/* {renderRankedCarousel("Popular Movies")}

      <div className="section">
        <h2>Recommended For You</h2>
        <div className="carousel">
          {movies.map((m, i) => {
            const sanitized = sanitizeTitle(m.title);
            return (
              <div
                key={i}
                className="movie-row-card"
                style={{ backgroundImage: `url(${ImageURL}/${encodeURIComponent(sanitized)}.jpg)` }}
                onClick={() => navigate(`/MovieDetails/${m.show_id}`)}
              >
                {m.title}
              </div>
            );
          })}
        </div>
      </div>

      {renderRankedCarousel("High Rated Movies")} */}

      {genreList.map((genre, index) => (
        <PaginatedMovieRow key={index} genreTitle={genre} />
      ))}

      <InfiniteScrollGrid />
      <FloatingFooter />
    </div>
  );
};

export default MoviesPage1;

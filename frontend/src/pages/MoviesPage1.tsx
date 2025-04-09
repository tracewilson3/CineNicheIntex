

import "../css/MovieRow.css";

import React from 'react';
import '../css/MoviesPage1.css';
import PaginatedMovieRow from '../components/PaginatedMovieRow';
import logo from '../images/logo.png';
import InfiniteScrollGrid from '../components/InfiniteScrollRows';
import FloatingFooter from '../components/FloatingFooter';
import CineNicheHeader from "../components/CineNicheHeader";



const MoviesPage1 = () => {
  const placeholderImage = "https://placehold.co/150x225?text=Movie";

  const renderRankedCarousel = (title: string) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="ranked-carousel">
        {[...Array(10)].map((_, i) => (
          <div className="ranked-item" key={i}>
            <span className="rank-badge">{i + 1}</span>
            <div
              className="movie-row-card"
              style={{
                backgroundImage: `url(${placeholderImage})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );

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

      {renderRankedCarousel("Popular Movies")}

      <div className="section">
        <h2>Recommended For You</h2>
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

      {renderRankedCarousel("High Rated Movies")}

      {genreList.map((genre, index) => (
  <PaginatedMovieRow key={index} title={genre} />
))}



<InfiniteScrollGrid />
<FloatingFooter />




    </div>
  );
};

export default MoviesPage1;

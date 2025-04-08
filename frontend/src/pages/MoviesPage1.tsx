import React from 'react';
import './MoviesPage1.css';
import MovieRow from '../components/MovieRow';
import '../components/MovieRow.css';
import logo from '../images/logo.png';


const MoviesPage1 = () => {
  const placeholderImage = 'https://placehold.co/150x225?text=Movie';

  const renderRankedCarousel = (title: string) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="ranked-carousel">
        {[...Array(10)].map((_, i) => (
            <div className="ranked-item" key={i}>
  <span className="rank-badge">{i + 1}</span>
  <div
    className="movie-row-card"
    style={{ backgroundImage: `url(${placeholderImage})` }}
  ></div>
</div>

        ))}
      </div>
    </div>
  );

  const genreList = [
    "Action", "Adventure", "Anime Series / International TV Shows",
    "British TV Shows / Docuseries / International TV Shows", "Children", "Comedies",
    "Comedies / Dramas / International Movies", "Comedies / International Movies",
    "Comedies / Romantic Movies", "Crime TV Shows / Docuseries", "Documentaries",
    "Documentaries / International Movies", "Docuseries", "Dramas",
    "Dramas / International Movies", "Dramas / Romantic Movies", "Family Movies",
    "Fantasy", "Horror Movies", "International Movies / Thrillers",
    "International TV Shows / Romantic TV Shows / TV Dramas", "Kids TV",
    "Language TV Shows", "Musicals", "Nature TV", "Reality TV", "Spirituality",
    "TV Action", "TV Comedies", "TV Dramas", "Talk Shows / TV Comedies", "Thrillers"
  ];

  return (
    <div className="app dark-background">
      <header className="header">
      <img src={logo} className="logo" alt="Logo" />
        <div className="icons">
          <span role="img" aria-label="search">🔍</span>
          <span role="img" aria-label="profile">🦚</span>
        </div>
      </header>


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
        <MovieRow key={index} title={genre} />
      ))}
    </div>
  );
};

export default MoviesPage1;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./CineNicheHeader.css"; // make sure your styles support the layout

const CineNicheHeader = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // clear input after search
    }
  };

  return (
    <header className="header">
      <a href="/movies1">
        <img src={logo} className="logo" alt="Logo" />
      </a>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by Title, Cast, or Director"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="icons">
        <span role="img" aria-label="search">
          🔍
        </span>
        <span role="img" aria-label="profile">
          🦚
        </span>
      </div>
    </header>
  );
};

export default CineNicheHeader;

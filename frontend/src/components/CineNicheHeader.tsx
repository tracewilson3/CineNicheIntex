import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "./CineNicheHeader.css"; // make sure your styles support the layout
import Logout from "./Logout";

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
      {
        <p
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            color: "white",
            paddingRight: "15px",
            paddingTop: "18px",
          }}
        >
          {localStorage.getItem("email")}
        </p>
      }
      <Logout />
    </header>
  );
};

export default CineNicheHeader;

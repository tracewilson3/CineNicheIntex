import logo from "../images/logo.png";

const CineNicheHeader = () => {
  return (
    <header className="header">
      <a href="/movies1">
        <img src={logo} className="logo" alt="Logo" />
      </a>

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

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png"; // Replace with a more horizontal logo if needed
import "../App.css"; // For any custom overrides

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="app dark-background text-white d-flex align-items-center justify-content-center min-vh-100 position-relative"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.3) 60%), url('https://images.unsplash.com/photo-1609174280691-0ef18e90b6db?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center px-3" style={{ maxWidth: "700px" }}>
        <img
          src={logo}
          alt="CineNiche Logo"
          className="img-fluid mb-4"
          style={{ maxWidth: "300px" }}
        />

        <h1 className="display-4 fw-bold mb-3">Unlimited Movies, Tailored For You</h1>

        <p className="lead mb-4">
          CineNiche helps you discover niche genres, hidden gems, and personalized recommendations.
          No fluff — just films you'll love.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-light btn-lg px-5 fw-bold text-dark shadow-sm"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline-light btn-lg px-5 fw-normal text-light border-white-50"
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="position-absolute bottom-0 mb-3 text-center w-100">
        <button
          className="btn btn-sm btn-link text-light opacity-75"
          onClick={() => navigate("/privacy")}
          style={{ textDecoration: "underline" }}
        >
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default HomePage;

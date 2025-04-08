// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './images/logo.png'

const moviePosters = [
  'https://image.tmdb.org/t/p/original/qtfMr08KQsWXnCHY0a96N8NpQ2l.jpg', // Sonic 2
  'https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg', // Batman
  'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // The Godfather
  'https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg', // Fight Club
  'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg', // The Matrix
  'https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', // Interstellar
  'https://image.tmdb.org/t/p/original/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg', // Dune
  'https://image.tmdb.org/t/p/original/jTNYlTEijZ6c8Mn4gvINOeB2HWM.jpg', // Spider-Man: No Way Home
];

const LoginPage = () => {
  const navigate = useNavigate();

  const [currentPoster, setCurrentPoster] = useState(0);
  const [fade, setFade] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPoster((prev) => (prev + 1) % moviePosters.length);
        setFade(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 20000); // Show popup after 20 seconds

    return () => clearTimeout(popupTimer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-background">
      <div
        className={`react-carousel ${fade ? 'fade-in' : 'fade-out'}`}
        style={{ backgroundImage: `url(${moviePosters[currentPoster]})` }}
      />
      <div className="login-overlay" />

      <form className="login-box" onSubmit={handleSubmit}>
        <img src={logo} alt="CineNiche Logo" className="login-logo" />
        <h2 className="login-title">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>

        <button type="submit" className="login-button" onClick={() => navigate('/movies')}>Sign In</button>

        <p className="login-footer">
          New to CineNiche?{' '}
          <span className="signup-link" onClick={() => navigate('/idol')}>
            Sign up now
          </span>
        </p>
      </form>

      {showPopup && (
        <div className="premium-popup">
          <div className="popup-content">
            <h3>Upgrade to CineNiche Premium</h3>
            <p>Get unlimited downloads and stream without limits.</p>
            <button className="popup-button" onClick={() => setShowPopup(false)}>
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

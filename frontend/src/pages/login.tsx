// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import './login.css';

const moviePosters = [
  'https://image.tmdb.org/t/p/original/qtfMr08KQsWXnCHY0a96N8NpQ2l.jpg',
  'https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg'
];

const LoginPage = () => {
  const [currentPoster, setCurrentPoster] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPoster((prev) => (prev + 1) % moviePosters.length);
        setFade(true);
      }, 500); // time to fade out
    }, 7000); // slide interval

    return () => clearInterval(interval);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <img src="/src/images/logo.png" alt="CineNiche Logo" className="login-logo" />
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

        <button type="submit" className="login-button">Sign In</button>

        <p className="login-footer">
          New to CineNiche? <span className="signup-link">Sign up now</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div className="login-background">
      <div
        className="react-carousel fade-in"
        style={{
          backgroundImage: 'url(https://image.tmdb.org/t/p/original/jTNYlTEijZ6c8Mn4gvINOeB2HWM.jpg)', // pick your fave
        }}
      />
      <div className="login-overlay" />

      <form className="login-box" onSubmit={handleSubmit}>
        <img src="/src/images/logo.png" alt="CineNiche Logo" className="login-logo" />
        <h2 className="login-title">Create Account</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="login-input"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="login-input"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="login-input"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <button type="submit" className="login-button">Create Account</button>

        <p className="login-footer">
          Already have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/')}>Log in</span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

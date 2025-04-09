import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/verify.css';

const VerifyPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    return (
      <div className="verify-container">
        <div className="verify-box">
          <h2>Missing Login Info</h2>
          <p>Please return to login and try again.</p>
          <button className="verify-button" onClick={() => navigate('/')}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5000/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const text = await response.text();

      if (!response.ok) {
        setError(text);
        return;
      }

      const data = JSON.parse(text);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/movies');
    } catch (err) {
      console.error('Verification error:', err);
      setError('Could not verify code. Please try again.');
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>Verify Your Email</h2>
        <p>Enter the 6-digit code we sent to your email.</p>

        <form onSubmit={handleVerify}>
          <input
            className="verify-input"
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="123456"
          />
          <button type="submit" className="verify-button">
            Verify
          </button>
        </form>

        {error && <p className="verify-error">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyPage;

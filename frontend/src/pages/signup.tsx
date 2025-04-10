import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { AUTH_URL } from '../api/config';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords don't match"]);
      return;
    }

    try {
      const response = await fetch(AUTH_URL+'/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const text = await response.text();
      console.log('🧾 Raw response:', text);

      if (!response.ok) {
        try {
          const data = JSON.parse(text);

          // ✅ Handle raw array from backend
          if (Array.isArray(data)) {
            const messages = data.map((e) => e.description || 'Unknown error');
            setErrors(messages);
          } else if (Array.isArray(data.errors)) {
            setErrors(data.errors);
          } else if (typeof data.errors === 'string') {
            setErrors([data.errors]);
          } else {
            setErrors(['Registration failed.']);
          }
        } catch {
          setErrors([text || 'Registration failed.']);
        }
        return;
      }

      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      console.error('❌ Network or unexpected error:', err);
      setErrors(['Unexpected error occurred. Please try again.']);
    }
  };

  return (
    <div className="login-background">
      <div className="react-carousel" />
      <div className="login-overlay" />

      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Create Account</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="login-input"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {errors.length > 0 && (
          <div className="form-error-box" style={{ marginBottom: '10px' }}>
            {errors.map((msg, idx) => (
              <p key={idx} style={{ color: 'red', fontSize: '0.9rem', margin: 0 }}>
                {msg}
              </p>
            ))}
          </div>
        )}

        <button type="submit" className="login-button">Create Account</button>

        <p className="login-footer">
          Already have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/')}>
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: 0,
    gender: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    zip: 0,
    // streaming services (default to 0 = no)
    Netflix: 0,
    Amazon_Prime: 0,
    DisneyPlus: 0,
    ParamountPlus: 0,
    Max: 0,
    Hulu: 0,
    AppleTVPlus: 0,
    Peacock: 0,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === 'number' ? Number(value) : value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const userPayload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      Netflix: formData.Netflix,
      Amazon_Prime: formData.Amazon_Prime,
      DisneyPlus: formData.DisneyPlus,
      ParamountPlus: formData.ParamountPlus,
      Max: formData.Max,
      Hulu: formData.Hulu,
      AppleTVPlus: formData.AppleTVPlus,
      Peacock: formData.Peacock,
      hashed_password: formData.password,
    };

    try {
      const response = await fetch('https://localhost:5000/Movies/CreateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Signup failed');
      }

      navigate('/');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  return (
    <div className="login-background">
      <div className="react-carousel" />
      <div className="login-overlay" />

      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Create Account</h2>

        <input name="name" placeholder="Full Name" className="login-input" value={formData.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="login-input" value={formData.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" className="login-input" value={formData.email} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" className="login-input" value={formData.age} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" className="login-input" value={formData.gender} onChange={handleChange} required />
        <input name="city" placeholder="City" className="login-input" value={formData.city} onChange={handleChange} required />
        <input name="state" placeholder="State" className="login-input" value={formData.state} onChange={handleChange} required />
        <input name="zip" type="number" placeholder="Zip" className="login-input" value={formData.zip} onChange={handleChange} required />
        
        <input name="password" type="password" placeholder="Password" className="login-input" value={formData.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="login-input" value={formData.confirmPassword} onChange={handleChange} required />

        <div className="form-check">
          <label><input type="checkbox" name="Netflix" onChange={handleCheckboxChange} /> Netflix</label>
          <label><input type="checkbox" name="Amazon_Prime" onChange={handleCheckboxChange} /> Amazon Prime</label>
          <label><input type="checkbox" name="DisneyPlus" onChange={handleCheckboxChange} /> Disney+</label>
          <label><input type="checkbox" name="ParamountPlus" onChange={handleCheckboxChange} /> Paramount+</label>
          <label><input type="checkbox" name="Max" onChange={handleCheckboxChange} /> Max</label>
          <label><input type="checkbox" name="Hulu" onChange={handleCheckboxChange} /> Hulu</label>
          <label><input type="checkbox" name="AppleTVPlus" onChange={handleCheckboxChange} /> Apple TV+</label>
          <label><input type="checkbox" name="Peacock" onChange={handleCheckboxChange} /> Peacock</label>
        </div>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <button type="submit" className="login-button">Create Account</button>
        <p className="login-footer">
          Already have an account? <span className="signup-link" onClick={() => navigate('/')}>Log in</span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

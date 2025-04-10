import React, { useState } from 'react';

type ProfileFormProps = {
  userEmail: string;
};

const ProfileForm = ({ userEmail }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: 0,
    gender: '',
    Netflix: 0,
    Amazon_Prime: 0,
    DisneyPlus: 0,
    ParamountPlus: 0,
    Max: 0,
    Hulu: 0,
    AppleTVPlus: 0,
    Peacock: 0,
    city: '',
    state: '',
    zip: 0,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseInt(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('https://localhost:5000/movies/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email: userEmail }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(`Error: ${data.message || 'Failed to update profile.'}`);
        return;
      }

      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input name="zip" type="number" placeholder="Zip" value={formData.zip} onChange={handleChange} required />

        <hr />
        <h4>Streaming Preferences (0 or 1)</h4>
        <input name="Netflix" type="number" placeholder="Netflix" value={formData.Netflix} onChange={handleChange} />
        <input name="Amazon_Prime" type="number" placeholder="Amazon Prime" value={formData.Amazon_Prime} onChange={handleChange} />
        <input name="DisneyPlus" type="number" placeholder="Disney+" value={formData.DisneyPlus} onChange={handleChange} />
        <input name="ParamountPlus" type="number" placeholder="Paramount+" value={formData.ParamountPlus} onChange={handleChange} />
        <input name="Max" type="number" placeholder="Max" value={formData.Max} onChange={handleChange} />
        <input name="Hulu" type="number" placeholder="Hulu" value={formData.Hulu} onChange={handleChange} />
        <input name="AppleTVPlus" type="number" placeholder="Apple TV+" value={formData.AppleTVPlus} onChange={handleChange} />
        <input name="Peacock" type="number" placeholder="Peacock" value={formData.Peacock} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '10px' }}>Save Profile</button>
        {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
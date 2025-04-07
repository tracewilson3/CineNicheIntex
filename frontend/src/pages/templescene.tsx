// TempleScene.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './temple.css';

const TempleScene = () => {
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);

  const handleIdolClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShake(true);
    }, 10000); // Trigger effects after 10 seconds idle

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`temple-container ${shake ? 'shake' : ''}`}>
      <img
        src="/src/images/temple.jpg"
        alt="Temple Background"
        className="temple-background"
      />

      {/* Torch glow overlays */}
      <div className="torch-glow left" />
      <div className="torch-glow right" />

      {/* Idol click zone */}
      <div className="idol-click-zone" onClick={handleIdolClick} />

      {/* Falling dust */}
      {shake && (
        <div className="dust-wrapper">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="dust"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TempleScene;

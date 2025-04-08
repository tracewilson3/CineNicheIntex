import React, { useEffect, useState } from 'react';
import './FloatingFooter.css';

const FloatingFooter: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleUserActivity = () => {
      if (!isNearBottom) {
        setShowFooter(false);
        if (idleTimer) clearTimeout(idleTimer);
        const timer = setTimeout(() => setShowFooter(true), 3000);
        setIdleTimer(timer);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const cursorY = e.clientY;
      const threshold = 100;
      const nearBottom = windowHeight - cursorY <= threshold;

      setIsNearBottom(nearBottom);
      if (nearBottom) {
        setShowFooter(true);
      } else {
        handleUserActivity();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleUserActivity);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [idleTimer, isNearBottom]);

  return (
    <div className={`floating-footer ${showFooter ? 'visible' : 'hidden'}`}>
      <div className="footer-content">
        <span>&copy; 2025 CineNiche</span>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default FloatingFooter;

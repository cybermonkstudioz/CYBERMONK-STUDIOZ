import React from 'react';
import { InfinityLoader } from './InfinityLoader';

const LoadingPage = () => {
  // Add CSS animation keyframes and custom fonts
  const loadingShineKeyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    
    @keyframes loadingShine {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.95; }
      50% { opacity: 1; }
    }
  `;

  return (
    <div className="loading-page" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      zIndex: 9999,
      color: '#ffffffff'
    }}>
      {/* Inject animation keyframes */}
      <style>{loadingShineKeyframes}</style>
      <div style={{ marginBottom: '2rem' }}>
        <InfinityLoader size={80} />
      </div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '900',
        marginBottom: '1rem',
        textAlign: 'center',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: "'Inter', sans-serif",
        textShadow: '0 0 20px rgba(238, 37, 37, 0.5), 0 0 40px rgba(238, 37, 37, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, textShadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-5px) scale(1.05)';
        e.target.style.textShadow = '0 0 30px rgba(238, 37, 37, 0.7), 0 0 60px rgba(238, 37, 37, 0.4), 0 8px 16px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.textShadow = '0 0 20px rgba(238, 37, 37, 0.5), 0 0 40px rgba(238, 37, 37, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3)';
      }}
      >
        Cyber Monk Studioz
      </h1>
      <p style={{
        fontSize: '1.3rem',
        opacity: 0.9,
        color: '#ffffff',
        textAlign: 'center',
        maxWidth: '300px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        letterSpacing: '0.08em',
        fontFamily: "'Inter', sans-serif",
        fontWeight: '400',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '100% 0',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'loadingShine 2s linear infinite'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.opacity = '1';
        e.target.style.textShadow = '0 4px 8px rgba(238, 37, 37, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.opacity = '0.9';
        e.target.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        e.target.style.letterSpacing = '0.05em';
      }}
      >
        Loading premium creative experience...
      </p>
    </div>
  );
};

export default LoadingPage;

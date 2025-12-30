import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--spacing-md)',
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-black)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <h1 style={{
          fontSize: 'clamp(4rem, 15vw, 10rem)',
          fontWeight: 700,
          lineHeight: 1,
          margin: 0,
          background: 'linear-gradient(135deg, #0B0B0B 0%, #333 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'var(--spacing-md)',
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 600,
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-black)',
        }}>
          Oops! Page not found
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          maxWidth: '500px',
          margin: '0 auto var(--spacing-xl)',
          opacity: 0.8,
          lineHeight: 1.7,
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            textDecoration: 'none',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            border: '1px solid var(--color-black)',
            borderRadius: '4px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-black)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-black)';
            e.currentTarget.style.color = 'var(--color-white)';
          }}
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

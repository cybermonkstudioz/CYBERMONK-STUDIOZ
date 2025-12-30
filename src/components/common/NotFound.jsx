import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-white)',
      fontFamily: 'var(--font-secondary)',
      paddingTop: 'var(--spacing-xl)'
    }}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div style={{ width: '100%', maxWidth: '66.666%', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                height: '400px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
              aria-hidden="true"
            >
              <h1 style={{
                textAlign: 'center',
                color: 'var(--color-black)',
                fontSize: '8rem',
                fontWeight: 700,
                paddingTop: '2rem',
                margin: 0
              }}>
                404
              </h1>
            </motion.div>

            <motion.div 
              style={{ marginTop: '-50px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <h3 style={{
                fontSize: '2rem',
                color: 'var(--color-black)',
                fontWeight: 'bold',
                marginBottom: 'var(--spacing-md)'
              }}>
                Look like you're lost
              </h3>
              <p style={{
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-black)'
              }}>
                The page you are looking for is not available!
              </p>

              <Link
                to="/"
                className="btn btn-primary"
                style={{
                  display: 'inline-block',
                  marginTop: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-md)',
                  backgroundColor: '#16a34a',
                  borderColor: '#16a34a'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#15803d';
                  e.currentTarget.style.borderColor = '#15803d';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a34a';
                  e.currentTarget.style.borderColor = '#16a34a';
                }}
              >
                Go to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

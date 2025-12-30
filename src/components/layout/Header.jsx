import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/booking', label: 'Book Now' },
    { path: '/contact', label: 'Contact' },
    { path: '/auth', label: 'Sign / Login' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#000000',
        transition: 'all 0.3s ease',
        color: '#ffffff',
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          position: 'relative'
        }}>
          <Link 
            to="/" 
            style={{ 
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: '#ffffff',
              zIndex: 2
            }}
          >
            Cyber Monk Studioz
          </Link>

          <button 
            onClick={toggleMenu}
            style={{
              display: 'none',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              zIndex: 3,
              '@media (max-width: 991.98px)': {
                display: 'block'
              }
            }}
          >
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                margin: '5px 0',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                margin: '5px 0',
                transition: 'all 0.3s ease',
                opacity: isMenuOpen ? 0 : 1
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                margin: '5px 0',
                transition: 'all 0.3s ease',
                transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
              }} />
            </div>
          </button>

          <nav style={{
            display: 'flex',
            '@media (max-width: 991.98px)': {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#000000',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
              zIndex: 1,
              padding: '5rem 1rem 2rem'
            }
          }}>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              margin: 0,
              padding: 0,
              '@media (max-width: 991.98px)': {
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }
            }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li 
                    key={link.path} 
                    style={{ 
                      marginLeft: '2rem',
                      '@media (max-width: 991.98px)': {
                        margin: '0.5rem 0',
                        width: '100%',
                        textAlign: 'center'
                      }
                    }}
                  >
                    {link.path === '/auth' && isAuthenticated ? (
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                          navigate('/');
                        }}
                        style={{
                          position: 'relative',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          color: '#ffffff',
                          opacity: 0.9,
                          transition: 'all 0.3s ease',
                          padding: '0.5rem 0',
                          display: 'inline-block',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          '@media (max-width: 991.98px)': {
                            fontSize: '1.25rem',
                            padding: '0.75rem 0',
                            display: 'block',
                            width: '100%'
                          }
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = '0.9';
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        style={{
                          position: 'relative',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          color: '#ffffff',
                          opacity: isActive ? 1 : 0.7,
                          transition: 'all 0.3s ease',
                          padding: '0.5rem 0',
                          display: 'inline-block',
                          '@media (max-width: 991.98px)': {
                            fontSize: '1.25rem',
                            padding: '0.75rem 0',
                            display: 'block',
                            width: '100%'
                          }
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseOut={(e) => {
                          if (!isActive) e.currentTarget.style.opacity = '0.7';
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                        <span 
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: isActive ? '100%' : '0',
                            height: '1px',
                            backgroundColor: '#ffffff',
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

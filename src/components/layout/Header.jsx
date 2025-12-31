import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './header.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/booking', label: 'Book Now' },
    { path: '/contact', label: 'Contact' },
    !isAuthenticated ? { path: '/login', label: 'Login' } : null,
  ].filter(Boolean);

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${isHomePage ? 'glass-header' : 'default-header'}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            Cyber Monk Studioz
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li>
                  <button 
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Mobile Menu Backdrop */}
          {isMobileMenuOpen && (
            <div 
              className="mobile-menu-backdrop show"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-content">
              <ul>
                {navLinks.map((link, index) => (
                  <li 
                    key={link.path}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      to={link.path}
                      className={location.pathname === link.path ? 'active' : ''}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {isAuthenticated && (
                  <li style={{ animationDelay: `${navLinks.length * 0.1}s` }}>
                    <button 
                      onClick={handleLogout}
                      className="logout-button"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

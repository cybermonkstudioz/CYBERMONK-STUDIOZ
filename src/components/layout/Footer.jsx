import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faTwitter, 
  faLinkedinIn, 
  faYoutube,
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const footerStyle = {
    backgroundColor: 'var(--color-black)',
    color: 'var(--color-white)',
    padding: 'var(--spacing-xl) 0',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const brandStyle = {
    fontSize: '1.9rem',
    fontFamily: 'var(--font-creative)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'var(--color-white)',
    marginBottom: 'var(--spacing-md)',
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-2px)',
    }
  };

  const linkStyle = {
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    opacity: 0.9,
    fontFamily: 'var(--font-tech)',
    fontWeight: 400,
    '&:hover': {
      opacity: 1,
      color: 'var(--color-accent)',
      transform: 'translateX(5px)'
    }
  };

  const descriptionStyle = {
    maxWidth: '600px',
    margin: '0 auto var(--spacing-md)',
    opacity: 1,
    fontFamily: 'var(--font-tech)',
    color: '#FFFFFF',
    fontSize: '0.9375rem',
    lineHeight: 1.7,
  };

  const socialLinksStyle = {
    marginBottom: '1.5rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  const socialLinkStyle = (platform) => ({
    color: hoveredLink === platform ? 'var(--color-primary)' : 'var(--color-white)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    '&:hover': {
      transform: 'translateY(-3px)',
    },
  });

  const footerLinksContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: 'var(--spacing-md)',
  };

  const footerLinkStyle = (id) => ({
    ...linkStyle,
    opacity: hoveredLink === id ? 1 : 0.7,
  });

  const copyrightStyle = {
    marginTop: 'var(--spacing-lg)',
    fontSize: '0.9rem',
    color: '#FFFFFF',
    fontFamily: 'var(--font-tech)',
    letterSpacing: '0.05em',
    margin: 0,
  };
  
  const handleMouseEnter = (id) => setHoveredLink(id);
  const handleMouseLeave = () => setHoveredLink(null);
  
  return (
    <footer className="footer" style={footerStyle}>
      <div className="container">
        <div style={containerStyle}>
          <Link 
            to="/" 
            style={{
              ...brandStyle,
              opacity: hoveredLink === 'brand' ? 1 : brandStyle.opacity
            }}
            onMouseEnter={() => handleMouseEnter('brand')}
            onMouseLeave={handleMouseLeave}
          >
            Cyber Monk Studioz
          </Link>
          
          <p style={descriptionStyle}>
            Crafting digital experiences that inspire and engage<br />
            serving clients worldwide.
          </p>
          
          <div className="social-links" style={{ ...socialLinksStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a 
                href="https://www.instagram.com/thecybermonkstudioz/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle('instagram'), display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => handleMouseEnter('instagram')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faInstagram} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#E1306C',
                    marginBottom: '0.5rem'
                  }} 
                />
                <span>Instagram</span>
              </a>
              
              <a 
                href="https://x.com/CStudioz82671" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle('twitter'), display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => handleMouseEnter('twitter')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faTwitter} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#1DA1F2',
                    marginBottom: '0.5rem'
                  }} 
                />
                <span>Twitter</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/cyber-monk-studioz-69a6123a2/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle('linkedin'), display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => handleMouseEnter('linkedin')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faLinkedinIn} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#0077B5',
                    marginBottom: '0.5rem'
                  }} 
                />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://www.youtube.com/@CYBERMONKSTUDIOZ" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle('Youtube'), display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => handleMouseEnter('Youtube')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faYoutube} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#FF0000',
                    marginBottom: '0.5rem'
                  }} 
                />
                <span>YouTube</span>
              </a>
              
              <a 
                href="https://wa.me/916374316014?text=Hi%20Cyber%20Monk%20Studioz%2C%20I%20found%20your%20contact%20on%20your%20website" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ ...socialLinkStyle('whatsapp'), display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                onMouseEnter={() => handleMouseEnter('whatsapp')}
                onMouseLeave={handleMouseLeave}
                title="Click to chat on WhatsApp (Primary: 6374316014, Alternative: 9344531196)"
                onClick={(e) => {
                  // If the primary number doesn't respond within 2 seconds, suggest the alternative
                  setTimeout(() => {
                    if (window.confirm('Not getting a response? Would you like to try our alternative WhatsApp number?')) {
                      window.open('https://wa.me/919344531196?text=Hi%20Cyber%20Monk%20Studioz%2C%20I%20tried%20the%20primary%20number%20first', '_blank');
                    }
                  }, 2000);
                }}
              >
                <FontAwesomeIcon 
                  icon={faWhatsapp} 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#25D366',
                    marginBottom: '0.5rem'
                  }} 
                />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
          
          <div className="footer-links" style={footerLinksContainerStyle}>
            <Link 
              to="/privacy-policy" 
              style={footerLinkStyle('privacy')}
              onMouseEnter={() => handleMouseEnter('privacy')}
              onMouseLeave={handleMouseLeave}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              style={footerLinkStyle('terms')}
              onMouseEnter={() => handleMouseEnter('terms')}
              onMouseLeave={handleMouseLeave}
            >
              Terms of Service
            </Link>
            <a 
              href="mailto:cybermonkstudioz@gmail.com" 
              style={footerLinkStyle('email')}
              onMouseEnter={() => handleMouseEnter('email')}
              onMouseLeave={handleMouseLeave}
            >
              cybermonkstudioz@gmail.com
            </a>
          </div>
          
          <p style={copyrightStyle}>
            &copy; {currentYear} Cyber Monk Studioz @2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

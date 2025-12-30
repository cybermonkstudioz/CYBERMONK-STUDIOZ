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
import './footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const handleMouseEnter = (id) => setHoveredLink(id);
  const handleMouseLeave = () => setHoveredLink(null);
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <Link 
            to="/" 
            className="brand-link"
            onMouseEnter={() => handleMouseEnter('brand')}
            onMouseLeave={handleMouseLeave}
          >
            Cyber Monk Studioz
          </Link>
          
          <p className="description">
            Crafting digital experiences that inspire and engage<br />
            serving clients worldwide.
          </p>
          
          <div className="social-links">
            <div className="social-row">
              <a 
                href="https://www.instagram.com/thecybermonkstudioz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                data-platform="instagram"
                onMouseEnter={() => handleMouseEnter('instagram')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faInstagram} 
                  className="social-icon"
                />
                <span className="social-label">Instagram</span>
              </a>
              
              <a 
                href="https://x.com/CStudioz82671" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                data-platform="twitter"
                onMouseEnter={() => handleMouseEnter('twitter')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faTwitter} 
                  className="social-icon"
                />
                <span className="social-label">Twitter</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/cyber-monk-studioz-69a6123a2/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                data-platform="linkedin"
                onMouseEnter={() => handleMouseEnter('linkedin')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faLinkedinIn} 
                  className="social-icon"
                />
                <span className="social-label">LinkedIn</span>
              </a>
              
              <a 
                href="https://www.youtube.com/@CYBERMONKSTUDIOZ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                data-platform="youtube"
                onMouseEnter={() => handleMouseEnter('youtube')}
                onMouseLeave={handleMouseLeave}
              >
                <FontAwesomeIcon 
                  icon={faYoutube} 
                  className="social-icon"
                />
                <span className="social-label">YouTube</span>
              </a>
              
              <a 
                href="https://wa.me/916374316014?text=Hi%20Cyber%20Monk%20Studioz%2C%20I%20found%20your%20contact%20on%20your%20website" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                data-platform="whatsapp"
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
                  className="social-icon"
                />
                <span className="social-label">WhatsApp</span>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <Link 
              to="/privacy-policy" 
              className="footer-link"
              onMouseEnter={() => handleMouseEnter('privacy')}
              onMouseLeave={handleMouseLeave}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="footer-link"
              onMouseEnter={() => handleMouseEnter('terms')}
              onMouseLeave={handleMouseLeave}
            >
              Terms of Service
            </Link>
            <a 
              href="mailto:cybermonkstudioz@gmail.com" 
              className="footer-link"
              onMouseEnter={() => handleMouseEnter('email')}
              onMouseLeave={handleMouseLeave}
            >
              cybermonkstudioz@gmail.com
            </a>
          </div>
          
          <p className="copyright">
            &copy; {currentYear} Cyber Monk Studioz @2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

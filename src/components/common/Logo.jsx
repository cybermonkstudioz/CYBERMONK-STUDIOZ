import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 40, color = '#1a1a1a', withText = true, className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {withText && (
          <motion.span
            style={{
              fontSize: size * 0.4,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: color,
              textTransform: 'uppercase',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Inside the Studio
          </motion.span>
      )}
    </div>
  );
};

export default Logo;

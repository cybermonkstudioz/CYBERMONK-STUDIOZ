import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Check if TawkTo is already loaded to prevent duplicates
    if (window.Tawk_API && window.Tawk_API.isLoaded) return;

    // Store the original Tawk_API if it exists
    const Tawk_API = window.Tawk_API || {};
    const Tawk_LoadStart = new Date();
    
    // Create script element
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/694ad82e55b5561984eddbe5/1jd65otvf';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    // Add script to document
    s0.parentNode.insertBefore(s1, s0);
    
    // Store the API in window
    window.Tawk_API = Tawk_API;
    window.Tawk_LoadStart = Tawk_LoadStart;
    
    // Clean up function to remove the script when component unmounts
    return () => {
      const tawkToScripts = document.querySelectorAll('script[src*="tawk.to"]');
      tawkToScripts.forEach(script => script.remove());
      
      // Clean up global objects
      if (window.Tawk_API) {
        delete window.Tawk_API;
      }
      if (window.Tawk_LoadStart) {
        delete window.Tawk_LoadStart;
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default TawkTo;

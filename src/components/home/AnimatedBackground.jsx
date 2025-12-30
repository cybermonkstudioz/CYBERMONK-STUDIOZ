import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the subtle gradient movement
const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Film grain effect
const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(-2%, 1%); }
  30% { transform: translate(1%, -2%); }
  40% { transform: translate(-1%, 2%); }
  50% { transform: translate(2%, 1%); }
  60% { transform: translate(-2%, -1%); }
  70% { transform: translate(1%, 2%); }
  80% { transform: translate(-1%, -1%); }
  90% { transform: translate(2%, 0); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0a0a1a 0%,
    #0f172a 25%,
    #1e1b4b 50%,
    #312e81 75%,
    #1e1b4b 100%
  );
  background-size: 200% 200%;
  animation: ${gradientFlow} 30s ease infinite;
  will-change: background-position;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  animation: ${grain} 8s steps(10) infinite;
  opacity: 0.2;
  pointer-events: none;
`;

const AnimatedBackground = () => {
  return (
    <BackgroundContainer>
      <GradientBackground />
      <NoiseOverlay />
    </BackgroundContainer>
  );
};

export default AnimatedBackground;

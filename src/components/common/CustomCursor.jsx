import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const CursorOuter = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border: 2px solid #C9A24D;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
  ${props => props.isHovering && `
    width: 50px;
    height: 50px;
    background-color: rgba(201, 162, 77, 0.3);
    border-color: #FFD700;
    animation: ${pulse} 2s infinite;
  `}
`;

const CursorInner = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 8px;
  height: 8px;
  background-color: #C9A24D;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
  ${props => props.isHovering && `
    width: 12px;
    height: 12px;
    background-color: #FFD700;
    transform: translate(-50%, -50%) scale(1.5);
  `}
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <CursorOuter
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        isHovering={isHovering}
      />
      <CursorInner
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        isHovering={isHovering}
      />
    </>
  );
};

export default CustomCursor;

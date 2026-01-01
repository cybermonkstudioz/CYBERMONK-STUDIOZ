import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
  color: #ffffff;
  
  @media (max-width: 768px) {
    min-height: auto;
    height: auto;
    padding-bottom: 4rem;
  }
  @keyframes pulseGlow {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }
  
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes hoverBounce {
    0%, 100% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(-8px);
    }
    75% {
      transform: translateY(-3px);
    }
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes glowPulse {
    0%, 100% {
      filter: brightness(1) drop-shadow(0 4px 2px rgba(0, 0, 0, 0.3));
    }
    50% {
      filter: brightness(1.2) drop-shadow(0 8px 4px rgba(255, 68, 68, 0.6));
    }
  }
  
  @keyframes jumpIn {
    0% {
      opacity: 0;
      transform: translateX(-100px) translateY(30px) scale(0.8);
    }
    30% {
      opacity: 0.7;
      transform: translateX(-50px) translateY(-15px) scale(1.1);
    }
    50% {
      opacity: 0.9;
      transform: translateX(-20px) translateY(-8px) scale(1.05);
    }
    70% {
      opacity: 1;
      transform: translateX(5px) translateY(-3px) scale(0.98);
    }
    85% {
      transform: translateX(-2px) translateY(1px) scale(1.01);
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateY(0) scale(1);
    }
  }
  
  @keyframes enhancedBounce {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    20% {
      transform: translateY(-12px) translateX(3px);
    }
    40% {
      transform: translateY(-20px) translateX(-2px);
    }
    60% {
      transform: translateY(-8px) translateX(1px);
    }
    80% {
      transform: translateY(-4px) translateX(-1px);
    }
  }
  
  .clients-forum {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(16, 16, 16, 0.95) 100%);
    position: relative;
    z-index: 5;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(118, 75, 162, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%);
      pointer-events: none;
    }
    
    .forum-container {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 1;
    }
    
    .forum-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      margin-bottom: 3rem;
      color: #ffffff;
      text-align: center;
      background: linear-gradient(45deg, #667eea, #764ba2, #9d50bb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: 0.05em;
    }
    
    .review-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      transition: all 0.5s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '"';
        position: absolute;
        top: -20px;
        left: 20px;
        font-size: 120px;
        color: rgba(102, 126, 234, 0.2);
        font-family: Georgia, serif;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        border-color: rgba(102, 126, 234, 0.3);
      }
    }
    
    .review-content {
      position: relative;
      z-index: 1;
    }
    
    .rating {
      margin-bottom: 1.5rem;
      
      .star {
        color: #ffd700;
        font-size: 1.5rem;
        margin: 0 0.2rem;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        animation: starPulse 2s ease-in-out infinite;
        
        &:nth-child(odd) {
          animation-delay: 0.1s;
        }
      }
    }
    
    .review-message {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #ffffff;
      margin-bottom: 2rem;
      font-style: italic;
      opacity: 0.9;
    }
    
    .review-author {
      .author-name {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 0.5rem 0;
      }
      
      .author-company {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
      }
    }
    
    .review-indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      
      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-color: #667eea;
          transform: scale(1.2);
        }
        
        &:hover:not(.active) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    
    @keyframes starPulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }
    
    @media (max-width: 768px) {
      padding: 4rem 1rem;
      
      .review-card {
        padding: 2rem 1.5rem;
      }
      
      .forum-title {
        font-size: 1.8rem;
        margin-bottom: 2rem;
      }
      
      .review-message {
        font-size: 1rem;
      }
    }
  }
  
  .hero-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    
    @media (max-width: 768px) {
      position: absolute;
      pointer-events: none;
      touch-action: none;
    }
  }
  
  .hero-content {
    position: relative;
    z-index: 5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    
    @media (max-width: 768px) {
      min-height: auto;
      height: auto;
      padding: 4rem 2rem 2rem;
    }
    &.cosmos-content {
      .hero-title {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 800;
        margin: 0;
        color: #FF0066;
        letter-spacing: 0.05em;
        line-height: 1.2;
        text-align: left;
        width: 100%;
        max-width: 800px;
        
        .title-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
        }
      }
      
      .hero-punch {
        text-align: center;
        margin: 10vh 0 0 0;
        user-select: none;
        position: relative;
        z-index: 100;
        width: 100%;
        max-width: 1200px;
        pointer-events: none;
        padding: 0 1rem;
        
        @media (min-width: 768px) {
          text-align: left;
          margin: 15vh 0 0 5%;
          width: 90%;
          padding: 0 2rem;
        }
      }

      .hero-word {
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 900;
        font-size: clamp(2rem, 8vw, 6.8rem);
        letter-spacing: 0.05em;
        line-height: 1.1;
        color: #F5F5F5;
        opacity: 0;
        text-shadow: 
          2px 2px 4px rgba(0, 0, 0, 0.8),
          0 0 20px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 100;
        max-width: 95%;
        margin: 0 auto;
        padding: 0 1rem;
        text-transform: uppercase;
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        text-stroke: 1px rgba(255, 255, 255, 0.1);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        text-align: center;
        animation: jumpIn 2.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards, enhancedBounce 3.5s ease-in-out 2.5s infinite;
        cursor: pointer;
        
        @media (min-width: 768px) {
          font-size: clamp(3rem, 8vw, 6.8rem);
          text-align: left;
          max-width: 90%;
          margin: 0;
          padding: 0;
        }
      }

      .hero-subline {
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        font-weight: 600;
        font-size: clamp(0.9rem, 3vw, 1.6rem);
        letter-spacing: 0.1em;
        margin-top: 1rem;
        text-transform: uppercase;
        opacity: 0;
        transform: translateX(-100px);
        position: relative;
        display: block;
        text-align: center;
        width: 100%;
        padding: 0 1rem;
        color: #ffffff;
        text-shadow: 
          0 0 10px rgba(0, 0, 0, 0.8),
          0 0 5px rgba(0, 0, 0, 0.8);
        filter: drop-shadow(0 4px 2px rgba(0, 0, 0, 0.3));
        animation: jumpIn 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s forwards, enhancedBounce 3s ease-in-out 2.8s infinite;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
        cursor: pointer;
        
        @media (min-width: 768px) {
          font-size: 1.4rem;
          text-align: right;
          padding-right: 0.5em;
          padding-left: 0;
          letter-spacing: 0.15em;
          margin-top: 1.5rem;
        }
        
        @media (min-width: 1024px) {
          font-size: 1.6rem;
        }
        
        &:hover {
          animation: enhancedBounce 0.8s ease-in-out, glowPulse 1.5s ease-in-out infinite;
          transform: translateX(10px) scale(1.05);
          color: #ff4444;
          text-shadow: 
            0 0 20px rgba(255, 68, 68, 0.8),
            0 0 40px rgba(255, 68, 68, 0.6),
            0 0 60px rgba(255, 68, 68, 0.4);
        }
        
        &::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          z-index: -1;
          text-shadow: 
            0 0 15px rgba(0, 0, 0, 0.9),
            0 0 30px rgba(0, 0, 0, 0.8),
            0 0 45px rgba(0, 0, 0, 0.7);
          filter: blur(2px);
          opacity: 0.7;
        }
        
        &::before, &::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        &::before {
          left: -70px;
          transform: translateY(-50%) translateX(-10px);
        }
        
        &::after {
          right: -70px;
          transform: translateY(-50%) translateX(10px);
        }
        
        &:hover {
          &::before, &::after {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @media (max-width: 1024px) {
          font-size: 1.4rem;
          letter-spacing: 0.1em;
        }
        
        @media (max-width: 768px) {
          font-size: clamp(0.85rem, 2.5vw, 1.2rem);
          text-align: center;
          
          &::before, &::after {
            display: none;
          }
        }
      }
      
      .premium-text {
        color: #ff4444;
        font-weight: 800;
        font-size: 1.15em;
        position: relative;
        display: inline-block;
        margin: 0 0.2em;
        z-index: 1;
        text-shadow: none !important;
        filter: none !important;
        
        
        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffffff, #ff0000, #ff0000, #ffffff, transparent);
          background-size: 300% auto;
          animation: gradientShift 3s ease infinite;
          height: 2px;
          bottom: -4px;
          box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  
  .scroll-sections {
    position: relative;
    z-index: 5;
    
    .content-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 2rem;
      
      @media (max-width: 768px) {
        min-height: auto;
        height: auto;
        padding: 4rem 2rem;
      }
      
      .hero-title {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 800;
        margin-bottom: 2rem;
        background: linear-gradient(45deg, #800020, #f7e7ce, #f8f6ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 0.05em;
        background-size: 200% auto;
        animation: gradientShift 4s ease infinite;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) 
                drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))
                drop-shadow(0 0 60px rgba(255, 255, 255, 0.1));
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      }
      
      .hero-subtitle {
        max-width: 800px;
        
      .subtitle-line {
        margin: 0.8em 0;
        font-size: clamp(1.2rem, 4vw, 2em);
        font-weight: 400;
        line-height: 1.3;
        color: #ffffff;
        text-shadow: 
          0 2px 10px rgba(0, 0, 0, 0.8),
          0 0 20px rgba(0, 0, 0, 0.6),
          0 0 30px rgba(0, 0, 0, 0.4);
        opacity: 1;
        letter-spacing: 1px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.7));
        padding: 0 1rem;
        text-align: center;
        
        @media (min-width: 768px) {
          padding: 0;
          text-align: left;
        }
      }
      }
    }
  }
  
  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    padding: 0 1rem;
    width: 100%;
    
    @media (min-width: 768px) {
      padding: 0;
      width: auto;
    }
    
    .hero-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-size: 0.9rem;
      width: 100%;
      text-align: center;
      
      @media (min-width: 768px) {
        padding: 0.875rem 2rem;
        font-size: 1rem;
        width: auto;
      }
      
      &.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }
      }
      
      &.secondary {
        background: transparent;
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }
      }
      
      svg {
        margin-left: 0.5rem;
        transition: transform 0.3s ease;
      }
      
      &:hover svg {
        transform: translateX(5px);
      }
    }
  }
`;

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const cameraVelocity = useRef({ x: 0, y: 0, z: 0 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const totalSections = 2;
  
  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: []
  });

  // Review data
  const reviews = [
    {
      name: "Ganesh Kumar",
      message: "Cyber Monk Studioz transformed our digital presence completely. Their creativity and technical expertise exceeded our expectations. The team delivered a stunning website that perfectly captures our brand essence.",
      rating: 5
    },
    {
      name: "Sruthi G",
      message: "Working with Cyber Monk Studioz was an incredible experience. They brought our vision to life with innovative solutions and attention to detail. Highly recommend for any digital project!",
      rating: 4.5
    },
    {
      name: "Rajesh",
      message: "The team's dedication to excellence is unmatched. They delivered our project on time and beyond our expectations. Their creative approach to problem-solving is impressive.",
      rating: 5
    },
    {
      name: "Ravikumar",
      message: "Outstanding service and exceptional results! Cyber Monk Studioz helped us increase our conversion rates by 40%. Their expertise in UX design is remarkable.",
      rating: 5
    }
  ];

  // Auto-loop reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      
      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x1a1a1a, 0.00025);
      refs.scene.background = new THREE.Color(0x1a1a1a);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.4,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();
      
      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation matching brand colors
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.4) {
            color.setHSL(0.75, 0.6, 0.7); // Purple
          } else if (colorChoice < 0.7) {
            color.setHSL(0.6, 0.5, 0.8); // Blue-purple
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.3, 0.8); // Soft gold accent
          } else {
            color.setHSL(0, 0, 0.9); // White
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x764ba2) },
          color2: { value: new THREE.Color(0x667eea) },
          color3: { value: new THREE.Color(0x9d50bb) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor1 = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            float mixFactor2 = cos(vUv.x * 8.0 - time * 0.5) * sin(vUv.y * 8.0 - time * 0.5);
            vec3 color = mix(color1, color2, mixFactor1 * 0.5 + 0.5);
            color = mix(color, color3, mixFactor2 * 0.3 + 0.3);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      
      const layers = [
        { distance: -50, height: 60, color: 0x16213e, opacity: 1 },
        { distance: -100, height: 80, color: 0x1a1a2e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f0f23, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x764ba2, opacity: 0.3 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = 0;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = mix(vec3(0.45, 0.3, 0.64), vec3(0.4, 0.5, 0.92), intensity) * intensity;
            
            float pulse = sin(time * 2.0) * 0.05 + 0.95;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.15);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField, i) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05;
        
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
        
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = Math.cos(time * 0.15) * 1 * parallaxFactor;
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        starField.material.dispose();
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        mountain.material.dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations = [];
    refs.mountains.forEach((mountain, i) => {
      locations[i] = mountain.position.z;
    });
    refs.locations = locations;
  };

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;
    
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.out" }
    });
    
    // Animate title characters
    tl.fromTo(
      ".title-char",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      "+=0.2"
    );
    
    // Animate hero word only (subline now uses CSS animation)
    setTimeout(() => {
      gsap.to('.hero-word', {
        y: 0,
        opacity: 1,
        duration: 1.6,
        ease: 'power4.out',
        delay: 0.3
      });
    }, 100);
    
    // Animate tagline characters with staggered effect
    tl.to(".tagline-char", {
      opacity: 1,
      y: 0,
      stagger: {
        amount: 0.5,
        from: "center"
      },
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");
    
    // Animate subtitle
    tl.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);

      const { current: refs } = threeRefs;
      
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;
      
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 }
      ];
      
      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] || currentPos;
      
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
        
        mountain.userData.targetZ = targetZ;
        const location = mountain.position.z;
        if (progress > 0.7) {
          mountain.position.z = 600000;
        }
        if (progress < 0.7) {
          mountain.position.z = refs.locations[i];
        }
      });
      
      if (refs.nebula) {
        refs.nebula.position.z = refs.mountains[3] ? refs.mountains[3].position.z : -1050;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const splitTitle = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char}
      </span>
    ));
  };

  // Split tagline function removed as we're using direct JSX now

  return (
    <HeroContainer ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      

      <div className="hero-content cosmos-content">
        <div ref={taglineRef} className="hero-punch">
          <div className="hero-word" data-text="CREATIVITY">CREATIVITY</div>
          <div className="hero-subline" data-text="ENGINEERED AT PREMIUM LEVEL">
            ENGINEERED AT <span className="premium-text">PREMIUM</span> LEVEL
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        
        <div className="hero-buttons">
          <Link to="/services" className="hero-button primary">
            Get Started <FiArrowRight />
          </Link>
          <Link to="/about" className="hero-button secondary">
            Learn More
          </Link>
        </div>
      </div>

      <div className="scroll-sections">
        {[...Array(3)].map((_, i) => {
          const titles = {
            0: 'HORIZON',
            1: 'CYBER MONK STUDIOZ',
            2: 'HORIZON'
          };
          
          const subtitles = {
            0: {
              line1: 'Where vision meets reality,',
              line2: 'we shape the future of tomorrow'
            },
            1: {
              line1: 'Beyond imagination,',
              line2: 'we build worlds of meaningful digital experiences.'
            },
            2: {
              line1: 'In the space between vision and execution,',
              line2: 'innovation finds its true form.'
            }
          };
          
          return (
            <section key={i} className="content-section">
              <h1 className="hero-title">
                {titles[i+1] || 'DEFAULT'}
              </h1>
          
              <div className="hero-subtitle cosmos-subtitle">
                <p className="subtitle-line">
                  {subtitles[i+1].line1}
                </p>
                <p className="subtitle-line">
                  {subtitles[i+1].line2}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      {/* Client's Forum Section */}
      <div className="clients-forum">
        <div className="forum-container">
          <h2 className="forum-title">What Our Clients Say</h2>
          <div className="review-card">
            <div className="review-content">
              <div className="rating">
                {[...Array(Math.floor(reviews[currentReviewIndex].rating))].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
                {reviews[currentReviewIndex].rating % 1 !== 0 && (
                  <span className="star half-star">☆</span>
                )}
              </div>
              <p className="review-message">{reviews[currentReviewIndex].message}</p>
              <div className="review-author">
                <h4 className="author-name">{reviews[currentReviewIndex].name}</h4>
              </div>
            </div>
          </div>
          <div className="review-indicators">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentReviewIndex ? 'active' : ''}`}
                onClick={() => setCurrentReviewIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

export default HeroSection;

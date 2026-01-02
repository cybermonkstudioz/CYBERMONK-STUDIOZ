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

// Mobile-first styled components
const HeroContainer = styled.div`
  // Mobile-first base styles
  position: relative;
  overflow: hidden;
  background: #000;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  // Natural vertical flow - no fixed heights or absolute positioning
  padding: 2rem 1rem;
  
  // Desktop enhancements only
  @media (min-width: 768px) {
    min-height: 100vh;
    justify-content: center;
    padding: 0;
  }
  
  // Mobile-optimized animations
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  // Disable complex animations on mobile
  @media (max-width: 767px) {
    * {
      animation-duration: 0.4s !important;
      transition-duration: 0.2s !important;
    }
  }
`;

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  // Mobile optimizations
  @media (max-width: 767px) {
    opacity: 0.6;
    transform: scale(0.9);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 600px;
  text-align: center;
  
  // Mobile-first spacing
  margin-top: 4rem;
  
  @media (min-width: 768px) {
    margin-top: 0;
    max-width: 1200px;
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  // Mobile-first typography with clamp()
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
  color: #F5F5F5;
  text-transform: uppercase;
  
  // Mobile text shadow
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  
  // Desktop enhancements
  @media (min-width: 768px) {
    font-size: clamp(2.5rem, 8vw, 6rem);
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  }
  
  // Animation - subtle on mobile
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
  
  @media (max-width: 767px) {
    animation: fadeInUp 0.4s ease-out 0.2s forwards;
  }
`;

const HeroSubline = styled.div`
  // Mobile-first typography
  font-size: clamp(0.8rem, 3vw, 1rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.08em;
  margin-bottom: 2rem;
  color: #ffffff;
  text-transform: uppercase;
  
  // Mobile text shadow
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  
  // Desktop enhancements
  @media (min-width: 768px) {
    font-size: clamp(1rem, 3vw, 1.4rem);
    line-height: 1.4;
    margin-bottom: 3rem;
    letter-spacing: 0.12em;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  }
  
  // Animation
  opacity: 0;
  animation: slideInLeft 0.6s ease-out 0.4s forwards;
  
  @media (max-width: 767px) {
    animation: slideInLeft 0.4s ease-out 0.3s forwards;
  }
`;

const PremiumText = styled.span`
  color: #ff4444;
  font-weight: 800;
  font-size: 1.1em;
  position: relative;
  
  // Simple underline effect
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff4444, transparent);
    
    // Disable animation on mobile
    @media (max-width: 767px) {
      animation: none;
    }
  }
`;

const ButtonContainer = styled.div`
  // Mobile-first button layout
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
  
  // Desktop enhancements
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const HeroButton = styled(Link)`
  // Mobile-first button styles
  display: inline-block;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  min-width: 140px;
  transition: all 0.2s ease;
  
  // Touch-friendly size
  @media (max-width: 767px) {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 280px;
  }
  
  // Desktop enhancements
  @media (min-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
    min-width: 160px;
  }
  
  // Primary button
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    // Subtle mobile hover
    @media (max-width: 767px) {
      &:hover {
        transform: scale(1.02);
      }
    }
  }
  
  // Secondary button
  &.secondary {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateX(2px);
  }
`;

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
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

  // Mobile-optimized Three.js initialization
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      
      // Mobile detection
      const isMobile = window.innerWidth <= 767;
      const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
      const starCount = isMobile ? 800 : 3000;
      
      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x1a1a1a, 0.00025);
      refs.scene.background = new THREE.Color(0x1a1a1a);

      // Camera - mobile-friendly
      refs.camera = new THREE.PerspectiveCamera(
        isMobile ? 65 : 75,
        window.innerWidth / window.innerHeight,
        0.1,
        isMobile ? 800 : 1500
      );
      refs.camera.position.z = isMobile ? 120 : 100;
      refs.camera.position.y = 20;

      // Renderer - mobile optimizations
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'low-power' : 'high-performance'
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(pixelRatio);
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = isMobile ? 0.3 : 0.5;

      // Post-processing only on desktop
      if (!isMobile) {
        refs.composer = new EffectComposer(refs.renderer);
        const renderPass = new RenderPass(refs.scene, refs.camera);
        refs.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.3,
          0.3,
          0.7
        );
        refs.composer.addPass(bloomPass);
      }

      // Create optimized scene elements
      createStarField(starCount);
      if (!isMobile) createNebula();
      createMountains();
      if (!isMobile) createAtmosphere();

      // Start animation
      animate();
      setIsReady(true);
    };

    const createStarField = (count) => {
      const { current: refs } = threeRefs;
      const isMobile = window.innerWidth <= 767;
      const actualCount = isMobile ? Math.floor(count / 3) : count;
      
      for (let i = 0; i < (isMobile ? 1 : 2); i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(actualCount * 3);
        const colors = new Float32Array(actualCount * 3);
        const sizes = new Float32Array(actualCount);

        for (let j = 0; j < actualCount; j++) {
          const radius = 200 + Math.random() * 600;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.4) {
            color.setHSL(0.75, 0.6, 0.7);
          } else if (colorChoice < 0.7) {
            color.setHSL(0.6, 0.5, 0.8);
          } else {
            color.setHSL(0, 0, 0.9);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 1.5 + 0.5;
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
              
              float speedMultiplier = 0.03;
              float angle = time * speedMultiplier * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (200.0 / -mvPosition.z);
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
      
      const geometry = new THREE.PlaneGeometry(6000, 3000, 50, 50);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x764ba2) },
          color2: { value: new THREE.Color(0x667eea) },
          opacity: { value: 0.2 }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 10.0;
            pos.z += elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          
          void main() {
            float mixFactor = sin(vUv.x * 5.0 + time) * cos(vUv.y * 5.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -800;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      
      const layers = [
        { distance: -30, height: 40, color: 0x16213e, opacity: 1 },
        { distance: -60, height: 60, color: 0x1a1a2e, opacity: 0.8 },
        { distance: -90, height: 80, color: 0x0f0f23, opacity: 0.6 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 30;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 800;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 80;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(4000, -200));
        points.push(new THREE.Vector2(-4000, -200));

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
      
      const geometry = new THREE.SphereGeometry(400, 24, 24);
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
            
            float pulse = sin(time * 1.5) * 0.03 + 0.97;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.1);
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
      const isMobile = window.innerWidth <= 767;

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula (skip on mobile)
      if (refs.nebula && refs.nebula.material.uniforms && !isMobile) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      // Simplified animations on mobile
      if (!isMobile) {
        refs.mountains.forEach((mountain, i) => {
          const parallaxFactor = 1 + i * 0.3;
          mountain.position.x = Math.sin(time * 0.08) * 1 * parallaxFactor;
          mountain.position.y = Math.cos(time * 0.12) * 0.5 * parallaxFactor;
        });
      }

      // Render
      if (refs.composer && !isMobile) {
        refs.composer.render();
      } else if (refs.renderer) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (refs.composer) {
          refs.composer.setSize(window.innerWidth, window.innerHeight);
        }
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

  return (
    <HeroContainer ref={containerRef}>
      <CanvasContainer>
        <canvas ref={canvasRef} />
      </CanvasContainer>
      
      <HeroContent>
        <HeroTitle>
          Creativity
        </HeroTitle>
        
        <HeroSubline>
          Engineered at <PremiumText>Premium</PremiumText> Level
        </HeroSubline>
        
        <ButtonContainer>
          <HeroButton to="/contact" className="primary">
            Get Started <FiArrowRight />
          </HeroButton>
          <HeroButton to="/about" className="secondary">
            Learn More
          </HeroButton>
        </ButtonContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;

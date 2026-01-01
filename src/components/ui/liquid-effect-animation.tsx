"use client"

import { useEffect, useRef, useState } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>()

  // Handle mouse movement - DISABLED on mobile to prevent scroll blocking
  useEffect(() => {
    // Only enable on non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop for smooth cursor follow
  useEffect(() => {
    const animate = () => {
      if (window.__liquidApp?.liquidPlane) {
        // Smoothly interpolate to target position
        targetPosition.current.x += (mousePosition.current.x - targetPosition.current.x) * 0.1
        targetPosition.current.y += (mousePosition.current.y - targetPosition.current.y) * 0.1
        
        // Apply the effect with some intensity
        const intensity = isHovered ? 1.5 : 0.5;
        const liquidPlane = window.__liquidApp.liquidPlane;
        
        // Update both material and main uniforms
        if (liquidPlane.material?.uniforms) {
          liquidPlane.material.uniforms.mouseX.value = targetPosition.current.x * intensity;
          liquidPlane.material.uniforms.mouseY.value = targetPosition.current.y * intensity;
        }
        
        if (liquidPlane.uniforms) {
          liquidPlane.uniforms.mouseX.value = targetPosition.current.x * intensity;
          liquidPlane.uniforms.mouseY.value = targetPosition.current.y * intensity;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animationFrameId.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isHovered])

  useEffect(() => {
    if (!canvasRef.current) return

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js')
        .then(module => {
          const LiquidBackground = module.default;
          const canvas = document.getElementById('liquid-canvas');

          if (!canvas) return;

          const app = LiquidBackground(canvas);

          // IMAGE (HIGH RES – SAFE UNSPLASH)
          app.loadImage('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee');

          // MAKE LIQUID FILL ENTIRE SCREEN
          app.liquidPlane.scale.set(3.8, 3.8, 3.8);

          // STRONG, DARK, BOLD WAVES
          app.liquidPlane.uniforms.displacementScale.value = 20;
          
          // ADD MOUSE UNIFORMS
          app.liquidPlane.material.uniforms.mouseX = { value: 0 };
          app.liquidPlane.material.uniforms.mouseY = { value: 0 };
          
          // Also add to main uniforms for global access
          app.liquidPlane.uniforms = app.liquidPlane.uniforms || {};
          app.liquidPlane.uniforms.mouseX = { value: 0 };
          app.liquidPlane.uniforms.mouseY = { value: 0 };
          
          // UPDATE SHADER FOR CURSOR INTERACTION
          const fragmentShader = app.liquidPlane.material.fragmentShader
            .replace(
              'void main() {',
              'uniform float mouseX;\\n  uniform float mouseY;\\n  void main() {',
            )
            .replace(
              'float displacement = texture2D(displacementMap, vUv).r * displacementScale;',
              'float displacement = texture2D(displacementMap, vUv).r * displacementScale;\\n    displacement += 0.1 * (sin((vUv.x + mouseX) * 10.0) + cos((vUv.y + mouseY) * 10.0));',
            );
          
          app.liquidPlane.material.fragmentShader = fragmentShader;
          app.liquidPlane.material.needsUpdate = true;

          // PREMIUM LIGHTING
          app.liquidPlane.material.metalness = 0.85;
          app.liquidPlane.material.roughness = 0.15;

          // CAMERA IMMERSION
          if (app.camera) {
            app.camera.position.z = 2.2;
          }

          // OPTIONAL RAIN (OFF FOR PERFORMANCE)
          app.setRain(false);

          // STORE INSTANCE FOR CLEANUP
          window.__liquidApp = app;
        })
        .catch(error => {
          console.error('Error loading liquid effect:', error);
        });
    `;

    // Add script to document head
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(script);

    // Cleanup function
    return () => {
      try {
        if (window.__liquidApp?.dispose) {
          window.__liquidApp.dispose();
          window.__liquidApp = undefined;
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden z-0"
      onMouseEnter={() => {
        // Only enable hover on non-touch devices
        if (window.matchMedia('(pointer: fine)').matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        // Only enable hover on non-touch devices
        if (window.matchMedia('(pointer: fine)').matches) {
          setIsHovered(false);
        }
      }}
    >
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="w-full h-full cursor-pointer"
      />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApp?: {
      liquidPlane: {
        material: {
          uniforms: {
            mouseX: { value: number }
            mouseY: { value: number }
            displacementScale: { value: number }
          }
          fragmentShader: string
          needsUpdate: boolean
        }
        uniforms: {
          mouseX: { value: number }
          mouseY: { value: number }
          displacementScale: { value: number }
        }
        scale: {
          set: (x: number, y: number, z: number) => void
        }
      }
      camera?: {
        position: {
          z: number
        }
      }
      setRain: (enabled: boolean) => void
      loadImage: (url: string) => void
      dispose: () => void
    }
  }
}

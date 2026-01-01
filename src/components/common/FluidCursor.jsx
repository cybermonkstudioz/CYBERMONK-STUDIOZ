import React, { useEffect, useRef, useCallback } from 'react';

const FluidCursor = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const pointerRef = useRef({
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    moved: false,
    down: false,
    color: { r: 79, g: 70, b: 229 },
    prevColor: { r: 79, g: 70, b: 229 }
  });

  // Configuration reference - simplified without DPI scaling
  const configRef = useRef({
    SPLAT_FORCE: 26000,          // Force for movement
    SPLAT_RADIUS: 0.5,           // Radius for precision
    DENSITY_DISSIPATION: 1.5,    // Dissipation rate
    VELOCITY_DISSIPATION: 0.75,  // Movement fluidity
    CURL: 12,                    // Curl for organic motion
    SHADING: true,               // Shading for depth
    COLOR_INTENSITY: 6.0,        // Color vibrancy
    BLUR_QUALITY: 'high',
    FPS_CAP: 60,                 // Standard frame rate
    PAUSED: false,
    BASE_RADIUS: 100,            // Standard size
    TRAIL_LENGTH: 2,             // Number of trails
    OPACITY: 0.45,               // Cursor opacity
    PULSE_SPEED: 0.008,          // Pulse animation speed
    PULSE_AMOUNT: 0.12,          // Pulse size variation
    OUTER_GLOW: true,            // Outer glow toggle
    OUTER_GLOW_INTENSITY: 0.5,   // Outer glow strength
    INNER_GLOW: true,            // Inner glow toggle
    INNER_GLOW_INTENSITY: 0.3    // Inner glow strength
  });

  // HSV to RGB helper - enhanced for richer, darker colors
  const HSVtoRGB = (h, s = 0.9, v = 0.5) => {
    // Ensure hue is within 0-360
    h = ((h % 360) + 360) % 360;
    
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let r = 0, g = 0, b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    // Apply color intensity and ensure values are within bounds
    const intensity = configRef.current.COLOR_INTENSITY;
    return {
      r: Math.min(255, Math.round((r + m) * 255 * intensity)),
      g: Math.min(255, Math.round((g + m) * 255 * intensity)),
      b: Math.min(255, Math.round((b + m) * 255 * intensity))
    };
  };

  // Ultra vibrant and bold color generator
  const baseHues = [0, 30, 60, 120, 180, 240, 300, 330, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
  let hueIndex = Math.floor(Math.random() * baseHues.length);
  let hueOffset = Math.random() * 60 - 30; // Maximum variation
  let lastColorChange = Date.now();
  const colorChangeInterval = 4000; // Change base color more frequently for dynamic effect
  
  const generateFluidColor = () => {
    // More frequent and dynamic color changes
    const now = Date.now();
    if (now - lastColorChange > colorChangeInterval) {
      hueIndex = (hueIndex + 1 + Math.floor(Math.random() * 3)) % baseHues.length;
      lastColorChange = now;
    }
    
    // More dramatic hue variation for bolder effect
    hueOffset = (hueOffset + Math.random() * 4 - 2) % 60;
    
    // Generate ultra-saturated, high-contrast colors
    const hue = (baseHues[hueIndex] + hueOffset + 360) % 360;
    return HSVtoRGB(hue, 0.98, 0.95); // Maximum saturation and brightness
  };

  // Standard pointer position update
  const updatePointerMove = useCallback((x, y) => {
    const pointer = pointerRef.current;
    const canvas = canvasRef.current;
    
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;
    
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    
    // Calculate texture coordinates
    pointer.texcoordX = canvasX / canvas.width;
    pointer.texcoordY = 1.0 - (canvasY / canvas.height);
    
    // Calculate movement deltas
    pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
    pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
    
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    
    // Update color on movement - with pulse effect for more dynamic feel
    const now = Date.now();
    const config = configRef.current;
    const pulse = Math.sin(now * config.PULSE_SPEED) * config.PULSE_AMOUNT + 1.0;
    
    // Standard cursor movement with pulse effect
    if (pointer.moved) {
      const config = configRef.current;
      const baseSize = pointer.down ? 0.9 : 1.0;
      const pulseEffect = 1 + (pulse - 1) * 0.8;
      
      // Simple speed calculation
      const speed = Math.sqrt(pointer.deltaX * pointer.deltaX + pointer.deltaY * pointer.deltaY) * 1000;
      const speedScale = Math.min(1.3, 1 + speed * 0.5);
      
      // Apply transformations
      config.BASE_RADIUS = 100 * baseSize * pulseEffect * speedScale;
      
      // Adjust trail effect based on speed
      config.TRAIL_LENGTH = speed > 0.5 ? 1 : 2;
    }
    
    // Update color on movement - with smoother transitions
    if (pointer.moved) {
      // Only update color every few frames for smoother transitions
      if (Math.random() > 0.7) {
        pointer.prevColor = { ...pointer.color };
        pointer.color = generateFluidColor();
      }
    }
  }, []);

  // Enhanced splat effect with ultra bold, highly visible visuals
  const splat = useCallback((ctx, pointer) => {
    if (!pointer.moved) return;
    
    const { texcoordX, texcoordY, color, prevColor } = pointer;
    const canvas = ctx.canvas;
    const centerX = texcoordX * canvas.width;
    const centerY = (1 - texcoordY) * canvas.height;
    const baseRadius = 80 * configRef.current.SPLAT_RADIUS; // More moderate base radius
    const radius = baseRadius * (1 + Math.random() * 0.2); // Less randomness
    
    // Create gradient for smooth color transition with higher intensity
    const gradient = ctx.createRadialGradient(
      centerX, 
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    
    // Enhanced colors with better blending
    const currentColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${configRef.current.OPACITY * 1.2})`;
    const prevColorStr = `rgba(${prevColor.r}, ${prevColor.g}, ${prevColor.b}, ${configRef.current.OPACITY * 0.8})`;
    
    gradient.addColorStop(0, currentColor);
    gradient.addColorStop(0.4, prevColorStr);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    // Balanced shadow for subtle depth
    ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
    ctx.shadowBlur = 40; // Reduced blur for subtlety
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = gradient;
    
    // Draw multiple circles for bolder effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    // Add a smaller, more intense inner circle
    const innerGradient = ctx.createRadialGradient(
      centerX, 
      centerY,
      0,
      centerX,
      centerY,
      radius * 0.6
    );
    
    innerGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`);
    innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    // Draw multiple layers for rich color effect
    ctx.save();
    // Use screen blend mode for more vibrant colors
    ctx.globalCompositeOperation = 'screen';
    
    // Draw subtle outer glow
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius * 1.3
    );
    glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.12)`);
    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw main splat
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw inner circle for more intensity
    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle highlight for depth
    const highlightGradient = ctx.createRadialGradient(
      centerX - radius * 0.1,
      centerY - radius * 0.1,
      0,
      centerX - radius * 0.1,
      centerY - radius * 0.1,
      radius * 0.3
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Reset shadow
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    updatePointerMove(e.clientX, e.clientY);
  }, [updatePointerMove]);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updatePointerMove(touch.clientX, touch.clientY);
    }
  }, [updatePointerMove]);

  // Initialize Canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };
    
    // Enhanced animation loop with configurable FPS
    let lastTime = 0;
    const frameTime = 1000 / configRef.current.FPS_CAP;
    
    const render = (timestamp) => {
      if (configRef.current.PAUSED) {
        animationFrameId.current = window.requestAnimationFrame(render);
        return;
      }
      
      // Throttle FPS if needed
      const deltaTime = timestamp - lastTime;
      if (deltaTime < frameTime) {
        animationFrameId.current = window.requestAnimationFrame(render);
        return;
      }
      lastTime = timestamp - (deltaTime % frameTime);
      
      // Clear with subtle fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the cursor trail
      if (pointerRef.current.moved) {
        splat(ctx, pointerRef.current);
        pointerRef.current.moved = false;
      }
      
      // Apply additional post-processing for boldness
      if (configRef.current.BLUR_QUALITY === 'high') {
        // Apply subtle blur for smoother edges
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
      
      animationFrameId.current = window.requestAnimationFrame(render);
    };
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Start animation loop
    animationFrameId.current = window.requestAnimationFrame(render);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove, splat]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.8,
        willChange: 'transform, opacity',
        touchAction: 'none',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransform: 'translateZ(0)',
        mixBlendMode: 'screen',
        filter: 'contrast(1.2) brightness(1.1)'
      }}
    />
  );
};

export default FluidCursor;

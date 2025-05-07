import { useEffect, useRef } from 'react';
import './StarFieldBackground.css';

const StarFieldBackground = ({ showGalaxy = false }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const galaxyStarsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBackgroundStars();
      initGalaxy();
    };

    const initBackgroundStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      starsRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.005 + 0.002,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const initGalaxy = () => {
      const centerX = window.innerWidth * 0.48;
      const centerY = window.innerHeight * 0.48;
      const radius = 140;
      const flattenY = 0.4;
      const starCount = 1000;

      galaxyStarsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        const r = Math.pow(Math.random(), 0.6) * radius;
        const angle = Math.random() * 2 * Math.PI;
        const speed = 0.00025 + (radius - r) * 0.0000015;

        const t = r / radius;
        let color;
        if (t < 0.3) {
          color = `rgba(255, 255, 200, ALPHA)`;
        } else if (t < 0.7) {
          color = `rgba(180, 160, 255, ALPHA)`;
        } else {
          color = `rgba(100, 150, 255, ALPHA)`;
        }

        galaxyStarsRef.current.push({
          initialR: r, // use fixed radius
          angle,
          centerX,
          centerY,
          flattenY,
          speed,
          size: Math.random() * 1.2 + 0.3,
          color,
        });
      }
    };

    const animate = () => {
      const time = Date.now();
      const pulse = 0.4 + Math.sin(time * 0.003) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background stars
      starsRef.current.forEach(star => {
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity <= 0.2 || star.opacity >= 1) {
          star.twinkleDirection *= -1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Only draw galaxy if showGalaxy prop is true
      if (showGalaxy) {
        // Galaxy stars
        galaxyStarsRef.current.forEach(star => {
          const rNorm = star.initialR / 150;
          const speedMultiplier = 1 + (1 - rNorm) * 0.8;
          star.angle += star.speed * speedMultiplier;

          const x = star.initialR * Math.cos(star.angle);
          const y = star.initialR * Math.sin(star.angle) * star.flattenY;

          const px = star.centerX + x;
          const py = star.centerY + y;

          const alpha = 1 - star.initialR / 150;
          const finalColor = star.color.replace('ALPHA', Math.min(alpha * 0.6, 0.6).toFixed(3));

          ctx.fillStyle = finalColor;
          ctx.beginPath();
          ctx.arc(px, py, star.size, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Black hole effects
        const core = galaxyStarsRef.current[0];

        // Ambient core glow
        const coreGlow = ctx.createRadialGradient(core.centerX, core.centerY, 0, core.centerX, core.centerY, 20);
        coreGlow.addColorStop(0, 'rgba(255, 255, 220, 0.15)');
        coreGlow.addColorStop(1, 'rgba(255, 255, 220, 0)');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(core.centerX, core.centerY, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Orange radial glow
        const glowRadius = 7.5;
        const glowGradient = ctx.createRadialGradient(
          core.centerX, core.centerY, 5.5,
          core.centerX, core.centerY, glowRadius
        );
        glowGradient.addColorStop(0, `rgba(255, 140, 0, ${pulse.toFixed(2)})`);
        glowGradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(core.centerX, core.centerY, glowRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Crisp orange ring
        ctx.strokeStyle = `rgba(255, 160, 0, ${pulse.toFixed(2)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(core.centerX, core.centerY, 6.5, 0, Math.PI * 2);
        ctx.stroke();

        // Black core on top
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(core.centerX, core.centerY, 5.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [showGalaxy]); // Add showGalaxy to dependency array

  return <canvas ref={canvasRef} className="star-field-background" />;
};

export default StarFieldBackground;
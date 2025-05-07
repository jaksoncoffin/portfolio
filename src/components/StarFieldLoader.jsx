import { useState, useEffect, useRef } from 'react';
import './StarFieldLoader.css';

const StarFieldLoader = ({ welcomeFormed, welcomeComplete, blackHoleActive, transition }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const textStarsRef = useRef([]);
  const blackHoleRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 5,
    maxRadius: Math.min(window.innerWidth, window.innerHeight) * 2.5,
    growing: false
  });

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [arrivedStarsCount, setArrivedStarsCount] = useState(0);
  const totalTextStarsRef = useRef(0);

  // Keep track of text center position for recalculation during resize
  const textCenterRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  // Animation state reference
  const animationStateRef = useRef({
    initialized: false,
    welcomeText: "Welcome"
  });

  useEffect(() => {
    // Initial star setup only once
    if (!animationStateRef.current.initialized) {
      initializeStars();
      animationStateRef.current.initialized = true;
    }

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleResize = () => {
    // Update canvas dimensions
    setCanvasDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Update blackhole position
    blackHoleRef.current.x = window.innerWidth / 2;
    blackHoleRef.current.y = window.innerHeight / 2;
    blackHoleRef.current.maxRadius = Math.min(window.innerWidth, window.innerHeight) * 2.5;

    // Store original text stars position data
    const textStarsData = textStarsRef.current.map(star => ({
      arrived: star.arrived,
      captured: star.captured,
      relativeX: star.targetX - textCenterRef.current.x,
      relativeY: star.targetY - textCenterRef.current.y,
      currentRelativeX: star.currentX - textCenterRef.current.x,
      currentRelativeY: star.currentY - textCenterRef.current.y,
      size: star.size,
      speed: star.speed,
      offset: star.offset,
      velocity: { ...star.velocity }
    }));

    // Update text center reference
    textCenterRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    // Update background stars positions proportionally
    starsRef.current.forEach(star => {
      const xRatio = star.x / canvasDimensions.width;
      const yRatio = star.y / canvasDimensions.height;

      star.x = xRatio * window.innerWidth;
      star.y = yRatio * window.innerHeight;
    });

    // Generate new canvas for text rendering (don't modify textStarsRef yet)
    const newTextStarsPositions = generateTextPositions(
      animationStateRef.current.welcomeText,
      window.innerWidth,
      window.innerHeight
    );

    // If we have existing text stars, map them to new positions
    if (textStarsData.length > 0 && newTextStarsPositions.length > 0) {
      // Determine how to map old stars to new positions
      const ratio = Math.min(
        newTextStarsPositions.length / textStarsData.length,
        textStarsData.length / newTextStarsPositions.length
      );

      // Create new text stars array based on available positions
      const newTextStars = [];

      // Use the smaller of the two arrays to determine iteration count
      const count = Math.min(textStarsData.length, newTextStarsPositions.length);

      for (let i = 0; i < count; i++) {
        const oldData = textStarsData[i];
        const newPos = newTextStarsPositions[i];

        newTextStars.push({
          targetX: newPos.x,
          targetY: newPos.y,
          // If star had arrived, position it at target, otherwise maintain relative position
          currentX: oldData.arrived ? newPos.x : textCenterRef.current.x + oldData.currentRelativeX,
          currentY: oldData.arrived ? newPos.y : textCenterRef.current.y + oldData.currentRelativeY,
          size: oldData.size,
          arrived: oldData.arrived,
          speed: oldData.speed,
          captured: oldData.captured,
          offset: oldData.offset,
          velocity: { ...oldData.velocity }
        });
      }

      // If we need more stars than we had before
      while (newTextStars.length < newTextStarsPositions.length) {
        const i = newTextStars.length;
        const newPos = newTextStarsPositions[i];

        // Add new stars with default properties
        newTextStars.push({
          targetX: newPos.x,
          targetY: newPos.y,
          currentX: Math.random() * window.innerWidth,
          currentY: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          arrived: false,
          speed: Math.random() * 2 + 3,
          captured: false,
          offset: Math.random() * Math.PI * 2,
          velocity: { x: 0, y: 0 }
        });
      }

      // Update the text stars reference
      textStarsRef.current = newTextStars;
      totalTextStarsRef.current = newTextStars.length;
    } else {
      // If this is the first setup, just use the generated positions
      const newTextStars = newTextStarsPositions.map(pos => ({
        targetX: pos.x,
        targetY: pos.y,
        currentX: Math.random() * window.innerWidth,
        currentY: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        arrived: false,
        speed: Math.random() * 2 + 3,
        captured: false,
        offset: Math.random() * Math.PI * 2,
        velocity: { x: 0, y: 0 }
      }));

      textStarsRef.current = newTextStars;
      totalTextStarsRef.current = newTextStars.length;
    }
  };

  // Generate text positions without modifying the stars array
  const generateTextPositions = (text, width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Clear canvas and prepare for drawing text
    ctx.clearRect(0, 0, width, height);

    // Make font size responsive to screen width
    const fontSize = Math.min(120, width * 0.15);
    ctx.font = `bold ${fontSize}px SpaceFont`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = 'white';

    // Draw text exactly in the center
    const textX = width / 2;
    const textY = height / 2;
    const textWidth = ctx.measureText(text).width;

    ctx.fillText(text, textX, textY);

    // Get image data to sample pixels
    const imageData = ctx.getImageData(0, 0, width, height);

    const positions = [];
    // Number of samples to get positions for the welcome text
    const samples = 6000;

    // Padding around text scales with font size
    const paddingX = fontSize * 0.5;
    const paddingY = fontSize * 1.5;

    for (let i = 0; i < samples; i++) {
      const sampleX = Math.floor(textX - textWidth / 2 - paddingX + Math.random() * (textWidth + paddingX * 2));
      const sampleY = Math.floor(textY - paddingY / 2 + Math.random() * paddingY);
      const pixelIndex = (sampleY * width + sampleX) * 4 + 3;

      if (pixelIndex >= 0 && pixelIndex < imageData.data.length && imageData.data[pixelIndex] > 0) {
        positions.push({
          x: sampleX,
          y: sampleY
        });
      }
    }

    return positions;
  };

  // Extracted initializeStars as a separate function for reuse
  const initializeStars = () => {
    // Always use current dimensions for initialization
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // Set text center reference
    textCenterRef.current = {
      x: currentWidth / 2,
      y: currentHeight / 2
    };

    // Significantly reduce background stars - just enough for depth
    starsRef.current = Array(30).fill().map(() => ({
      x: Math.random() * currentWidth,
      y: Math.random() * currentHeight,
      size: Math.random() * 2 + 1,
      velocity: {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1
      },
      captured: false,
      // Add an initial offset to prevent line formation
      offset: Math.random() * Math.PI * 2
    }));

    // Generate the text stars positions
    const textPositions = generateTextPositions(
      animationStateRef.current.welcomeText,
      currentWidth,
      currentHeight
    );

    // Create the text stars from positions
    textStarsRef.current = textPositions.map(pos => ({
      targetX: pos.x,
      targetY: pos.y,
      // Distribute stars widely for initial animation
      currentX: Math.random() * currentWidth,
      currentY: Math.random() * currentHeight,
      size: Math.random() * 2 + 1,
      arrived: false,
      speed: Math.random() * 2 + 3,
      captured: false,
      offset: Math.random() * Math.PI * 2,
      velocity: {
        x: 0,
        y: 0
      }
    }));

    totalTextStarsRef.current = textStarsRef.current.length;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let arrivedCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background stars - the few stragglers for depth
      starsRef.current.forEach(star => {
        if (!star.captured) {
          star.x += star.velocity.x;
          star.y += star.velocity.y;

          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
        } else {
          const blackHole = blackHoleRef.current;
          const dx = blackHole.x - star.x;
          const dy = blackHole.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Ensure velocity is initialized
          if (!star.velocity) {
            star.velocity = { x: 0, y: 0 };
          }

          if (distance < 5) {
            // Star has been consumed - move it off-screen
            star.x = -100;
            star.y = -100;
          } else {
            // Calculate spiral motion towards black hole
            const angle = Math.atan2(dy, dx) + (star.offset / (distance / 50));

            // Apply force that increases as stars get closer
            const force = Math.min(10, 2000 / (distance * distance));

            // Limit maximum velocity to prevent wild movement
            const maxVelocity = 15;

            // Calculate new velocity components
            const newVx = Math.cos(angle) * force;
            const newVy = Math.sin(angle) * force;

            // Apply smooth acceleration
            star.velocity.x = star.velocity.x * 0.95 + newVx * 0.05;
            star.velocity.y = star.velocity.y * 0.95 + newVy * 0.05;

            // Clamp velocities to prevent excessive speed
            star.velocity.x = Math.max(-maxVelocity, Math.min(maxVelocity, star.velocity.x));
            star.velocity.y = Math.max(-maxVelocity, Math.min(maxVelocity, star.velocity.y));

            // Update position based on velocity
            star.x += star.velocity.x;
            star.y += star.velocity.y;
          }
        }

        // Skip rendering if the star is off-screen or has invalid coordinates
        if (isNaN(star.x) || isNaN(star.y) ||
          star.x < -50 || star.x > canvas.width + 50 ||
          star.y < -50 || star.y > canvas.height + 50) {
          return;
        }

        // Draw star
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      arrivedCount = 0;

      // Handle Welcome text stars
      textStarsRef.current.forEach(star => {
        if (welcomeFormed && !star.arrived) {
          const dx = star.targetX - star.currentX;
          const dy = star.targetY - star.currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 5) {
            star.arrived = true;
            star.currentX = star.targetX;
            star.currentY = star.targetY;
            // Reset velocity once arrived
            star.velocity.x = 0;
            star.velocity.y = 0;
          } else {
            const angle = Math.atan2(dy, dx);
            const acceleration = 0.15;
            const speedFactor = Math.min(1.5, 30 / distance);

            star.currentX += Math.cos(angle) * (star.speed + distance * acceleration) * speedFactor;
            star.currentY += Math.sin(angle) * (star.speed + distance * acceleration) * speedFactor;
          }
        }

        if (star.arrived) arrivedCount++;

        if (blackHoleActive && star.arrived && !star.captured) {
          star.captured = true;
        }

        if (star.captured) {
          const blackHole = blackHoleRef.current;
          const dx = blackHole.x - star.currentX;
          const dy = blackHole.y - star.currentY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 5) {
            star.currentX = -100;
            star.currentY = -100;
          } else {
            // Calculate spiral effect with unique offset for each star
            const angle = Math.atan2(dy, dx) + (star.offset / (distance / 30));

            // Higher force for text stars for better visual effect
            const force = Math.min(12, 3000 / (distance * distance));

            // Update velocity with smooth acceleration
            if (!star.velocity) star.velocity = { x: 0, y: 0 };

            // Apply force with dampening for smoother movement
            star.velocity.x = star.velocity.x * 0.9 + Math.cos(angle) * force * 0.1;
            star.velocity.y = star.velocity.y * 0.9 + Math.sin(angle) * force * 0.1;

            // Limit maximum velocity
            const maxVelocity = 18;
            star.velocity.x = Math.max(-maxVelocity, Math.min(maxVelocity, star.velocity.x));
            star.velocity.y = Math.max(-maxVelocity, Math.min(maxVelocity, star.velocity.y));

            // Update position
            star.currentX += star.velocity.x;
            star.currentY += star.velocity.y;
          }
        }

        // Skip rendering if the star is off-screen or has invalid coordinates
        if (isNaN(star.currentX) || isNaN(star.currentY) ||
          star.currentX < -50 || star.currentX > canvas.width + 50 ||
          star.currentY < -50 || star.currentY > canvas.height + 50) {
          return;
        }

        // Draw text star
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.currentX, star.currentY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      setArrivedStarsCount(arrivedCount);

      // Draw and update black hole
      if (blackHoleActive) {
        const blackHole = blackHoleRef.current;

        if (transition) {
          blackHole.radius *= 1.08;

          starsRef.current.forEach(star => {
            star.captured = true;
          });

          const gradient = ctx.createRadialGradient(
            blackHole.x, blackHole.y, 0,
            blackHole.x, blackHole.y, blackHole.radius * 1.5
          );

          gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
          gradient.addColorStop(0.7, 'rgba(30, 0, 60, 0.8)');
          gradient.addColorStop(0.85, 'rgba(100, 0, 100, 0.4)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
          ctx.fill();

          const diskGradient = ctx.createRadialGradient(
            blackHole.x, blackHole.y, blackHole.radius * 0.8,
            blackHole.x, blackHole.y, blackHole.radius * 1.3
          );

          diskGradient.addColorStop(0, 'rgba(255, 150, 0, 0)');
          diskGradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.7)');
          diskGradient.addColorStop(0.7, 'rgba(255, 50, 0, 0.5)');
          diskGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

          ctx.fillStyle = diskGradient;
          ctx.beginPath();
          ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 1.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          blackHole.radius += 0.2;

          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
          ctx.fill();

          const gradient = ctx.createRadialGradient(
            blackHole.x, blackHole.y, blackHole.radius * 0.8,
            blackHole.x, blackHole.y, blackHole.radius * 1.2
          );

          gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
          gradient.addColorStop(0.8, 'rgba(100, 0, 100, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Calculate capture radius based on black hole size
        const captureRadius = blackHole.radius * 5;

        // Capture nearby background stars
        starsRef.current.forEach(star => {
          const dx = blackHole.x - star.x;
          const dy = blackHole.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < captureRadius) star.captured = true;
        });

        // Capture nearby text stars
        textStarsRef.current.forEach(star => {
          if (star.arrived) {
            const dx = blackHole.x - star.currentX;
            const dy = blackHole.y - star.currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < captureRadius) star.captured = true;
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [welcomeFormed, welcomeComplete, blackHoleActive, transition, canvasDimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      className="star-field-loader"
    />
  );
};

export default StarFieldLoader;
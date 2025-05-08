import { useState, useEffect, useRef } from 'react';
import './ConstellationNavigation.css';

const ConstellationNavigation = ({ onSectionSelect, activeSection }) => {
  const canvasRef = useRef(null);
  const constellationsRef = useRef([]);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const sections = [
      {
        id: 'about',
        name: 'About Me',
        stars: [
          { x: 0.15, y: 0.20 },
          { x: 0.13, y: 0.22 },
          { x: 0.17, y: 0.22 },
          { x: 0.15, y: 0.24 },
          { x: 0.15, y: 0.30 },
          { x: 0.15, y: 0.36 },
          { x: 0.11, y: 0.28 },
          { x: 0.08, y: 0.32 },
          { x: 0.06, y: 0.29 },
          { x: 0.19, y: 0.28 },
          { x: 0.22, y: 0.32 },
          { x: 0.24, y: 0.29 },
          { x: 0.12, y: 0.42 },
          { x: 0.10, y: 0.48 },
          { x: 0.09, y: 0.54 },
          { x: 0.18, y: 0.42 },
          { x: 0.20, y: 0.48 },
          { x: 0.21, y: 0.54 }
        ],
        connections: [
          [0, 1], [1, 3], [3, 2], [2, 0], [3, 4], [4, 5], [4, 6], [6, 7],
          [7, 8], [4, 9], [9, 10], [10, 11], [5, 12], [12, 13], [13, 14],
          [5, 15], [15, 16], [16, 17]
        ],
        labelPosition: { x: 0.15, y: 0.17 }
      },
      {
        id: 'projects',
        name: 'Projects',
        stars: [
          { x: 0.68, y: 0.23 }, // 0
          { x: 0.78, y: 0.23 }, // 1
          { x: 0.78, y: 0.33 }, // 2
          { x: 0.68, y: 0.33 }, // 3
          { x: 0.73, y: 0.34 }, // 4
          { x: 0.73, y: 0.37 }, // 5
          { x: 0.70, y: 0.37 }, // 6
          { x: 0.76, y: 0.37 }, // 7
          { x: 0.70, y: 0.255 }, // 8
          { x: 0.76, y: 0.255 }, // 9
          { x: 0.70, y: 0.280 }, // 10
          { x: 0.76, y: 0.280 }, // 11
          { x: 0.70, y: 0.305 }, // 12
          { x: 0.76, y: 0.305 }  // 13
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [2, 4], [4, 5], [5, 6],
          [6, 7], [7, 5], [8, 9], [10, 11], [12, 13]
        ],
        labelPosition: { x: 0.73, y: 0.20 }
      },
      {
        id: 'resume',
        name: 'Resume',
        stars: [
          { x: 0.31, y: 0.70 }, // 0
          { x: 0.41, y: 0.70 }, // 1
          { x: 0.41, y: 0.90 }, // 2
          { x: 0.31, y: 0.90 }, // 3
          { x: 0.33, y: 0.7333 }, // 4
          { x: 0.39, y: 0.7333 }, // 5
          { x: 0.33, y: 0.7667 }, // 6
          { x: 0.39, y: 0.7667 }, // 7
          { x: 0.33, y: 0.8000 }, // 8
          { x: 0.39, y: 0.8000 }, // 9
          { x: 0.33, y: 0.8333 }, // 10
          { x: 0.39, y: 0.8333 }, // 11
          { x: 0.33, y: 0.8667 }, // 12
          { x: 0.39, y: 0.8667 }  // 13
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [6, 7], [8, 9], [10, 11],
          [12, 13]
        ],
        labelPosition: { x: 0.36, y: 0.67 }
      },
      {
        id: 'contact',
        name: 'Contact',
        stars: [
          { x: 0.83, y: 0.70 }, // 0
          { x: 0.93, y: 0.70 }, // 1
          { x: 0.93, y: 0.80 }, // 2
          { x: 0.83, y: 0.80 }, // 3
          { x: 0.88, y: 0.75 }  // 4
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4]
        ],
        labelPosition: { x: 0.88, y: 0.67 }
      }
    ];

    constellationsRef.current = sections.map(section => ({
      ...section,
      stars: section.stars.map(star => ({
        x: star.x * dimensions.width,
        y: star.y * dimensions.height,
        size: Math.random() * 1.5 + 1,
        twinkleSpeed: Math.random() * 0.005 + 0.002,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        opacity: Math.random() * 0.5 + 0.3
      })),
      labelPosition: {
        x: section.labelPosition.x * dimensions.width,
        y: section.labelPosition.y * dimensions.height
      },
      hovered: false
    }));
  }, [dimensions]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      constellationsRef.current.forEach(constellation => {
        const isActive = activeSection === constellation.id;

        ctx.beginPath();
        constellation.connections.forEach(([startIdx, endIdx]) => {
          const startStar = constellation.stars[startIdx];
          const endStar = constellation.stars[endIdx];
          ctx.moveTo(startStar.x, startStar.y);
          ctx.lineTo(endStar.x, endStar.y);
        });

        ctx.strokeStyle = isActive
          ? 'rgba(100, 200, 255, 0.9)'
          : constellation.hovered
            ? 'rgba(100, 150, 255, 0.7)'
            : 'rgba(100, 100, 255, 0.4)';
        ctx.lineWidth = isActive ? 2.5 : constellation.hovered ? 2 : 1.2;
        ctx.stroke();

        const { x, y } = constellation.labelPosition;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const labelGlow = isActive || constellation.hovered;
        const fontSize = labelGlow ? 20 : 20;
        ctx.font = `${labelGlow ? '600' : '400'} ${fontSize}px SpaceFont, Arial`;

        if (labelGlow) {
          ctx.save();
          ctx.shadowColor = 'rgba(120, 220, 255, 0.8)';
          ctx.shadowBlur = 10;
          ctx.fillStyle = 'rgba(200, 240, 255, 1)';
          ctx.fillText(constellation.name, x, y);
          ctx.restore();
        } else {
          ctx.fillStyle = 'rgba(0, 0, 40, 0.8)';
          ctx.fillText(constellation.name, x + 2, y + 2);
          ctx.fillStyle = 'rgba(180, 210, 255, 0.7)';
          ctx.fillText(constellation.name, x, y);
        }

        constellation.stars.forEach(star => {
          star.opacity += star.twinkleSpeed * star.twinkleDirection;
          if (star.opacity >= 0.9 || star.opacity <= 0.3) {
            star.twinkleDirection *= -1;
          }

          const baseOpacity = isActive ? 1 : (constellation.hovered ? 0.8 : star.opacity);
          const size = isActive ? star.size * 1.5 : (constellation.hovered ? star.size * 1.2 : star.size);

          ctx.fillStyle = `rgba(255, 255, 255, ${baseOpacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
          ctx.fill();

          if (isActive || constellation.hovered) {
            const glowSize = size * 2;
            const gradient = ctx.createRadialGradient(
              star.x, star.y, size * 0.5,
              star.x, star.y, glowSize
            );

            gradient.addColorStop(0, isActive ? 'rgba(120, 220, 255, 0.8)' : 'rgba(100, 180, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(120, 220, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [activeSection, dimensions]);

  useEffect(() => {
    constellationsRef.current.forEach(c => {
      c.hovered = false;
    });
  }, [activeSection]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleMouseMove = (e) => {
      if (activeSection) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hoveredAny = false;

      constellationsRef.current.forEach(constellation => {
        let hovered = false;

        for (const star of constellation.stars) {
          const dx = mouseX - star.x;
          const dy = mouseY - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30) {
            hovered = true;
            hoveredAny = true;
            break;
          }
        }

        if (!hovered) {
          for (const [startIdx, endIdx] of constellation.connections) {
            const start = constellation.stars[startIdx];
            const end = constellation.stars[endIdx];

            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const lengthSq = dx * dx + dy * dy;

            const t = Math.max(0, Math.min(1, ((mouseX - start.x) * dx + (mouseY - start.y) * dy) / lengthSq));
            const projX = start.x + t * dx;
            const projY = start.y + t * dy;

            const distToLine = Math.hypot(mouseX - projX, mouseY - projY);

            if (distToLine < 25) {
              hovered = true;
              hoveredAny = true;
              break;
            }
          }
        }

        constellation.hovered = hovered;
      });

      canvas.style.cursor = hoveredAny ? 'pointer' : 'default';
      canvas.__hoveringConstellation = hoveredAny;

    };

    const handleClick = () => {
      if (activeSection) return;
      constellationsRef.current.forEach(c => {
        if (c.hovered && onSectionSelect) {
          onSectionSelect(c.id);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [onSectionSelect, activeSection]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="constellation-navigation"
    />
  );
};

export default ConstellationNavigation;

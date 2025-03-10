import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router";
import GenerativeSharpLines from "./GenerativeSharpLines";
import useIsMobile from "../hooks/useIsMobile";
import ThemeToggle from "./ThemeToggle";

const THEMES = [
  { bg: "bg-black", line: "#f5f5f5" },
  { bg: "bg-[#faa]/70", line: "#000" },
  { bg: "bg-violet-500/70", line: "#f5f5f5" },
  { bg: "bg-lime-300/70", line: "#6341bf" },
  { bg: "bg-[#aaf]/70", line: "#000" },
  { bg: "bg-red-500/70", line: "#f5f5f5" },
];

const NUM_STARS = 200;

// Star shape types
const STAR_TYPES = [
  "circle", // Simple circle
  "dot", // Smaller dot
  "cross", // Small cross shape
  "diamond", // Diamond shape
  "sparkle", // 4-point sparkle
  "sixPointStar", // ✧ - six-pointed star
  "asterisk", // ⋆ - asterisk
  "fivePointStar", // ⭒ - five-pointed star
  "eightPointStar", // ✲ - eight-pointed star
  "stylizedDot", // .̶̧̢̤̣̮̮͍͆̏ͫ - stylized dot
];

const StarBackground = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const starsRef = useRef([]);
  const pixelRatioRef = useRef(1);

  const location = useLocation();
  const home = location.pathname === "/";
  const isMobile = useIsMobile();
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);

  // Create easing function for smooth transitions
  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Initialize canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get device pixel ratio for HiDPI displays
    pixelRatioRef.current = window.devicePixelRatio || 1;

    // Set up canvas context
    const ctx = canvas.getContext("2d", { alpha: false });
    contextRef.current = ctx;

    // Apply initial sizing
    resizeCanvas();

    // Initialize stars
    initializeStars();

    // Start animation
    startAnimation();

    // Set up resize handler
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Initialize stars with precise animation parameters
  const initializeStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    starsRef.current = Array(NUM_STARS)
      .fill(null)
      .map(() => {
        // Generate longer, more consistent durations for smoother animations
        const duration = 3 + Math.random() * 5; // 3-8 seconds

        return {
          x: (Math.random() * canvas.width) / pixelRatioRef.current,
          y: (Math.random() * canvas.height) / pixelRatioRef.current,
          type: (() => {
            // Give higher probability to the new star types
            const rand = Math.random();
            if (rand < 0.6) {
              // 60% chance for the new star types
              return STAR_TYPES[Math.floor(Math.random() * 5) + 5]; // New star types (index 5-9)
            } else {
              // 40% chance for the original shapes
              return STAR_TYPES[Math.floor(Math.random() * 5)]; // Original shapes (index 0-4)
            }
          })(),
          baseSize: 1 + Math.random() * 2, // Base size in pixels
          phaseOffset: Math.random() * Math.PI * 2,
          duration: duration,
          startTime: performance.now() - Math.random() * duration * 1000,
        };
      });
  };

  // Handle window resize with proper HiDPI support
  const handleResize = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    resizeCanvas();
    repositionStars();
    startAnimation();
  };

  // Resize canvas with HiDPI support
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = contextRef.current;
    if (!ctx) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const pixelRatio = pixelRatioRef.current;

    canvas.width = displayWidth * pixelRatio;
    canvas.height = displayHeight * pixelRatio;

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.scale(pixelRatio, pixelRatio);
  };

  // Reposition stars when canvas size changes
  const repositionStars = () => {
    const canvas = canvasRef.current;
    if (!canvas || !starsRef.current.length) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    starsRef.current = starsRef.current.map((star) => ({
      ...star,
      x: Math.random() * displayWidth,
      y: Math.random() * displayHeight,
    }));
  };

  // Draw a specific star shape based on its type
  const drawStarShape = (ctx, star, size) => {
    switch (star.type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "dot":
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "cross":
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.lineWidth = size / 2;
        ctx.lineCap = "round";
        ctx.stroke();
        break;

      case "diamond":
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case "sparkle":
        // 4-point star
        ctx.beginPath();

        // Main points
        ctx.moveTo(0, -size * 1.5);
        ctx.lineTo(0, size * 1.5);
        ctx.moveTo(-size * 1.5, 0);
        ctx.lineTo(size * 1.5, 0);

        ctx.lineWidth = size / 2;
        ctx.lineCap = "round";
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "sixPointStar":
        // ✧ - six-pointed star
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.6);
        ctx.lineTo(size * 0.6, -size * 0.2);
        ctx.lineTo(size * 1.6, 0);
        ctx.lineTo(size * 0.6, size * 0.2);
        ctx.lineTo(0, size * 1.6);
        ctx.lineTo(-size * 0.6, size * 0.2);
        ctx.lineTo(-size * 1.6, 0);
        ctx.lineTo(-size * 0.6, -size * 0.2);
        ctx.closePath();
        ctx.fill();
        break;

      case "asterisk":
        // ⋆ - asterisk
        ctx.beginPath();
        // Vertical line
        ctx.moveTo(0, -size * 1.4);
        ctx.lineTo(0, size * 1.4);
        // Diagonal line 1
        ctx.moveTo(-size * 1.2, -size * 0.8);
        ctx.lineTo(size * 1.2, size * 0.8);
        // Diagonal line 2
        ctx.moveTo(-size * 1.2, size * 0.8);
        ctx.lineTo(size * 1.2, -size * 0.8);
        // Horizontal line
        ctx.moveTo(-size * 1.4, 0);
        ctx.lineTo(size * 1.4, 0);

        ctx.lineWidth = size / 3;
        ctx.lineCap = "round";
        ctx.stroke();
        break;

      case "fivePointStar":
        // ⭒ - five-pointed star
        ctx.beginPath();
        const points = 5;
        const outerRadius = size * 1.4;
        const innerRadius = size * 0.6;

        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / points) * i - Math.PI / 2;
          const pointX = radius * Math.cos(angle);
          const pointY = radius * Math.sin(angle);

          if (i === 0) {
            ctx.moveTo(pointX, pointY);
          } else {
            ctx.lineTo(pointX, pointY);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;

      case "eightPointStar":
        // ✲ - eight-pointed star
        ctx.beginPath();
        // Draw 8 spikes
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI / 4) * i;
          const outerX = size * 1.6 * Math.cos(angle);
          const outerY = size * 1.6 * Math.sin(angle);
          const innerX = size * 0.6 * Math.cos(angle + Math.PI / 8);
          const innerY = size * 0.6 * Math.sin(angle + Math.PI / 8);

          ctx.moveTo(0, 0);
          ctx.lineTo(outerX, outerY);
          ctx.moveTo(0, 0);
          ctx.lineTo(innerX, innerY);
        }

        ctx.lineWidth = size / 3;
        ctx.lineCap = "round";
        ctx.stroke();
        break;

      case "stylizedDot":
        // .̶̧̢̤̣̮̮͍͆̏ͫ - stylized dot
        // Draw main dot
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Draw decorative lines
        ctx.beginPath();
        ctx.moveTo(-size, -size * 0.4);
        ctx.lineTo(size, size * 0.2);
        ctx.moveTo(-size * 0.8, size * 0.6);
        ctx.lineTo(size * 0.6, -size * 0.6);

        ctx.lineWidth = size / 4;
        ctx.lineCap = "round";
        ctx.stroke();
        break;

      default:
        // Default to circle
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
    }
  };

  // Draw the stars with ultra-smooth animation
  const drawStars = (timestamp) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx || !starsRef.current.length) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Clear the canvas
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
    gradient.addColorStop(0, "#030712 "); // from-gray-950
    gradient.addColorStop(1, "#1e1a4d "); // to-indigo-950
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw each star
    starsRef.current.forEach((star) => {
      // Calculate precise animation progress
      const elapsedTime = (timestamp - star.startTime) / 1000; // seconds
      const cycle = (elapsedTime % star.duration) / star.duration;

      // Use sine wave for natural pulsing with phase offset
      const sineValue = Math.sin(cycle * Math.PI * 2 + star.phaseOffset);

      // Apply quadratic easing for extra smoothness
      const normalizedSine = (sineValue + 1) / 2;
      const easedValue = easeInOutQuad(normalizedSine);

      // Scale between 0% and 120% of base size
      const scale = 0 + easedValue * 1;

      // Scale opacity between 0% and 90%
      const opacity = 0 + easedValue * 0.6;

      // Calculate precise size with scaling
      const size = star.baseSize * scale;

      // Save current transformation state
      ctx.save();

      // Move to star position
      ctx.translate(star.x, star.y);

      // Set shadow for glow effect
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = size * 2;

      // Set opacity and styling
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#ffffff";

      // Draw the star shape
      drawStarShape(ctx, star, size);

      // Restore transformation state
      ctx.restore();
    });
  };

  // Animation loop
  const startAnimation = () => {
    const animate = (timestamp) => {
      drawStars(timestamp);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <>
      <div className="fixed inset-0 -z-100 overflow-hidden bg-gradient-to-b from-gray-950 to-indigo-950">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{ zIndex: 1 }}
        />
        <div
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse, black 20%, transparent 100%)",
            maskImage: "radial-gradient(ellipse, black 20%, transparent 100%)",
            zIndex: 2,
            position: "absolute",
            inset: 0,
          }}
          className={`h-full w-full ${currentTheme.bg}`}
        >
          {isMobile && !home ? null : (
            <GenerativeSharpLines line={currentTheme.line} />
          )}
        </div>
      </div>
      <ThemeToggle
        themes={THEMES}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </>
  );
};

export default StarBackground;

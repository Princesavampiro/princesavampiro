import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const GenerativeSharpLines = ({ line }) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const lastDrawTimeRef = useRef(0);
  const frameRateRef = useRef(10); // Target ~10 FPS instead of 60 FPS

  const location = useLocation();
  const home = location.pathname === "/";
  const speed = !home ? 10 : 1;

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    if (home) window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [home, line]);

  // Draw function
  const drawFrame = (timestamp) => {
    // Limit frame rate
    const frameInterval = (1000 * speed) / frameRateRef.current;
    if (timestamp - lastDrawTimeRef.current < frameInterval) {
      animationFrameRef.current = requestAnimationFrame(drawFrame);
      return;
    }

    lastDrawTimeRef.current = timestamp;

    if (!canvasRef.current) {
      animationFrameRef.current = requestAnimationFrame(drawFrame);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Add subtle time-based variation
    const time = Date.now() * 0.0003;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height);

    // Center point
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate influence from mouse position
    const mouseInfluenceX = (mousePosition.x - centerX) * 0.15;
    const mouseInfluenceY = (mousePosition.y - centerY) * 0.15;

    // Line properties
    const numBranches = 5;
    const maxDepth = 7;
    const branchingFactor = 0.7;
    const maxAngleDeviation = Math.PI / 6;
    const lineColor = line;

    // Mouse distance for effects
    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;
    const mouseDistance = Math.sqrt(dx * dx + dy * dy);
    const mouseAngle = Math.atan2(dy, dx);

    // Draw a branch recursively
    const drawBranch = (x, y, angle, length, width, depth) => {
      if (depth >= maxDepth) return;

      // Calculate end point
      const endX = x + Math.cos(angle) * length;
      const endY = y + Math.sin(angle) * length;

      // Draw the line
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = width;
      ctx.lineCap = "square"; // Sharp ends
      ctx.stroke();

      // Create sub-branches
      const numSubBranches = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numSubBranches; i++) {
        if (Math.random() < branchingFactor) {
          // Mouse influence on branching angle
          let angleInfluence = 0;
          if (mouseDistance < 200) {
            const branchToMouseAngle = Math.atan2(
              mousePosition.y - endY,
              mousePosition.x - endX,
            );
            angleInfluence =
              (branchToMouseAngle - angle) * (1 - mouseDistance / 200) * 0.2;
          }

          // Add subtle time-based variation
          const timeVariation = Math.sin(time + depth + i) * 0.03;

          // Calculate new angle with randomness and influences
          const newAngle =
            angle +
            (Math.random() * 2 - 1) * maxAngleDeviation +
            angleInfluence +
            timeVariation;

          // New branch with reduced length and width
          const newLength = length * (0.5 + Math.random() * 0.3);
          const newWidth = width * 0.8;

          // Draw the sub-branch
          drawBranch(endX, endY, newAngle, newLength, newWidth, depth + 1);
        }
      }
    };

    // Create initial branches
    for (let i = 0; i < numBranches; i++) {
      const angle = (i / numBranches) * Math.PI * 2;

      // Make length responsive to mouse distance from that angle
      const angleDiff = Math.abs(
        ((angle - mouseAngle + Math.PI) % (Math.PI * 2)) - Math.PI,
      );
      const lengthBoost =
        mouseDistance < 300
          ? (1 - angleDiff / Math.PI) * (1 - mouseDistance / 300) * 30
          : 0;

      const length = 40 + Math.random() * 70 + lengthBoost;
      const width = 0.5 + Math.random() * 0.5; // Thin lines

      drawBranch(
        centerX + mouseInfluenceX,
        centerY + mouseInfluenceY,
        angle,
        length,
        width,
        0,
      );
    }

    // Add some shorter, sharper green lines
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2 + time * 0.1;

      // Make these lines responsive to mouse as well
      const distanceFactor =
        mouseDistance < 200 ? 1 + (1 - mouseDistance / 200) * 0.5 : 1;
      const length = (10 + Math.random() * 20) * distanceFactor;

      const endX = centerX + mouseInfluenceX + Math.cos(angle) * length;
      const endY = centerY + mouseInfluenceY + Math.sin(angle) * length;

      ctx.beginPath();
      ctx.moveTo(centerX + mouseInfluenceX, centerY + mouseInfluenceY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = "#0f0";
      ctx.lineWidth = 0.3;
      ctx.stroke();
    }

    animationFrameRef.current = requestAnimationFrame(drawFrame);
  };

  // Start the animation
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, location.pathname, line]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="max-h-full max-w-full"
      />
    </div>
  );
};

export default GenerativeSharpLines;

import { useEffect, useRef } from "react";

const MAX_PIXELS = 7;
const PIXEL_SIZE = 14;
const PIXEL_LIFESPAN = 800;
const CURSOR_OFFSET = 16;
const MAX_VELOCITY = 1;
const SPAWN_RADIUS = 10;
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 0.8;
const SPAWN_INTERVAL = 50;

export default function PixelCursorCanvas() {
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastSpawnTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setHighDPICanvas = (canvas) => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
      return dpr;
    };

    const resizeCanvas = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      setHighDPICanvas(canvas);

      ctx.textRendering = "geometricPrecision";
      ctx.imageSmoothingEnabled = false;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateMousePosition = (e) => {
      const currentTime = Date.now();
      const newPosition = { x: e.clientX, y: e.clientY };

      velocityRef.current = {
        x: newPosition.x - prevPositionRef.current.x,
        y: newPosition.y - prevPositionRef.current.y,
      };

      mousePositionRef.current = newPosition;

      if (
        currentTime - lastSpawnTimeRef.current > SPAWN_INTERVAL &&
        (Math.abs(velocityRef.current.x) > 1 ||
          Math.abs(velocityRef.current.y) > 1)
      ) {
        spawnPixel(newPosition, velocityRef.current);
        lastSpawnTimeRef.current = currentTime;
      }

      prevPositionRef.current = newPosition;
    };

    const spawnPixel = (position, velocity) => {
      const limitedVelocity = {
        x: Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity.x)),
        y: Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity.y)),
      };

      const randomOffset = {
        x: (Math.random() - 0.5) * SPAWN_RADIUS * 2,
        y: (Math.random() - 0.5) * SPAWN_RADIUS * 2,
      };

      const randomOpacity =
        Math.random() * (MAX_OPACITY - MIN_OPACITY) + MIN_OPACITY;

      const newPixel = {
        id: Date.now() + Math.random(),
        x: position.x + CURSOR_OFFSET + randomOffset.x,
        y: position.y + CURSOR_OFFSET + randomOffset.y,
        velocity: {
          x: limitedVelocity.x * (Math.random() * 0.5 + 0.5),
          y: limitedVelocity.y * (Math.random() * 0.5 + 0.5),
        },
        opacity: randomOpacity,
        createdAt: Date.now(),
        size: PIXEL_SIZE,
      };

      pixelsRef.current.push(newPixel);

      if (pixelsRef.current.length > MAX_PIXELS) {
        pixelsRef.current.shift();
      }
    };

    const animate = (timestamp) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastFrameTimeRef.current) / 16.67; // Normalize to 60fps
      lastFrameTimeRef.current = timestamp;

      const currentTime = Date.now();

      ctx.clearRect(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio,
      );

      pixelsRef.current = pixelsRef.current.filter((pixel) => {
        const age = currentTime - pixel.createdAt;

        if (age > PIXEL_LIFESPAN) {
          return false;
        }

        pixel.x += pixel.velocity.x * deltaTime;
        pixel.y += pixel.velocity.y * deltaTime;

        let opacity = pixel.opacity;
        if (age > PIXEL_LIFESPAN - 200) {
          opacity = pixel.opacity * (1 - (age - (PIXEL_LIFESPAN - 200)) / 200);
        }

        ctx.save();
        ctx.font = `${pixel.size}px Arial`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✧", Math.round(pixel.x), Math.round(pixel.y)); // FIX 4: Round pixel positions
        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updateMousePosition);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
    />
  );
}

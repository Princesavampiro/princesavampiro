import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MAX_PIXELS = 7;
const PIXEL_SIZE = 4;
const PIXEL_LIFESPAN = 800;
const CURSOR_OFFSET = 16;
const FADE_DURATION = 20;
const MAX_VELOCITY = 5;
const SPAWN_RADIUS = 10;
const MIN_OPACITY = 0.1; // New constant for minimum opacity
const MAX_OPACITY = 0.8; // New constant for maximum opacity

export default function PixelCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pixels, setPixels] = useState([]);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);

  useEffect(() => {
    let prevPosition = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const updateMousePosition = (e) => {
      const currentTime = Date.now();
      const newPosition = { x: e.clientX, y: e.clientY };

      velocity = {
        x: newPosition.x - prevPosition.x,
        y: newPosition.y - prevPosition.y,
      };

      setMousePosition(newPosition);
      prevPosition = newPosition;

      if (
        currentTime - lastSpawnTime > 50 &&
        (Math.abs(velocity.x) > 1 || Math.abs(velocity.y) > 1)
      ) {
        spawnPixel(newPosition, velocity);
        setLastSpawnTime(currentTime);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [lastSpawnTime]);

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
      id: Date.now(),
      x: position.x + CURSOR_OFFSET + randomOffset.x,
      y: position.y + CURSOR_OFFSET + randomOffset.y,
      velocity: {
        x: limitedVelocity.x * (Math.random() * 0.5 + 0.5),
        y: limitedVelocity.y * (Math.random() * 0.5 + 0.5),
      },
      opacity: randomOpacity,
    };

    setPixels((prevPixels) => {
      const updatedPixels = [...prevPixels, newPixel].slice(-MAX_PIXELS);
      setTimeout(() => {
        setPixels((pixels) => pixels.filter((p) => p.id !== newPixel.id));
      }, PIXEL_LIFESPAN);
      return updatedPixels;
    });
  };

  return (
    <div className="pointer-events-none fixed inset-0">
      {pixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          className="absolute"
          style={{
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            x: pixel.x,
            y: pixel.y,
            opacity: pixel.opacity,
          }}
          animate={{
            x: pixel.x + pixel.velocity.x * 10,
            y: pixel.y + pixel.velocity.y * 10,
            opacity: [pixel.opacity, pixel.opacity, 0],
          }}
          transition={{
            duration: PIXEL_LIFESPAN / 1000,
            times: [0, (PIXEL_LIFESPAN - FADE_DURATION) / PIXEL_LIFESPAN, 1],
            ease: "linear",
          }}
        >
          ✧
        </motion.div>
      ))}
    </div>
  );
}

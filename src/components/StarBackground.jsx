import { useState, useEffect } from "react";
import GenerativeSharpLines from "./GenerativeSharpLines";
import useIsMobile from "../hooks/useIsMobile";
import { useLocation } from "react-router";
import ThemeToggle from "./ThemeToggle";

const STAR_CHARS = ["✧", "⋆", "⭒", "✲", ".̶̧̢̤̣̮̮͍͆̏ͫ", "."];
const NUM_STARS = 150;
const THEMES = [
  "bg-black",
  "bg-[#faa]/70",
  "bg-violet-500/70",
  "bg-lime-300/70",
  "bg-[#aaf]/70",
  "bg-red-500/70",
];

function generateStar() {
  return {
    id: Math.random(),
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
    size: Math.random() * 0.5 + 0.5, // between 0.5 and 1
    duration: Math.random() * 4 + 1, // between 1 and 5 seconds
    delay: Math.random() * -4, // random start time for animation
  };
}

export default function StarBackground() {
  const location = useLocation();
  const home = location.pathname === "/";
  const isMobile = useIsMobile();
  const [stars, setStars] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);

  useEffect(() => {
    setStars(Array(NUM_STARS).fill(null).map(generateStar));
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-100 overflow-hidden bg-gradient-to-b from-gray-950 to-indigo-950">
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}rem`,
              color: "#eee",
              opacity: 0.8,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
            className="drop-shadow-[0_0_2px_#fff]"
          >
            {star.char}
          </div>
        ))}
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0; transform: scale(0.5); }
              50% { opacity: 0.8; transform: scale(1); }
            }
          `}
        </style>
        <div
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse, black 20%, transparent 100%)",
            maskImage: "radial-gradient(ellipse, black 20%, transparent 100%)",
          }}
          className={`h-full w-full ${currentTheme}`}
        >
          {isMobile && !home ? null : <GenerativeSharpLines />}
        </div>
      </div>
      <ThemeToggle
        themes={THEMES}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
    </>
  );
}

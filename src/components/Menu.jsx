import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";
import { motion, useDragControls } from "motion/react";

export default function Menu({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];
  const { language } = useLanguage();
  const controlsArray = sections ? sections.map(() => useDragControls()) : [];
  const [initialPositions, setInitialPositions] = useState([]);
  const positionsCalculated = useRef(false);

  useEffect(() => {
    if (!sections || positionsCalculated.current) return;

    const calculatePositions = () => {
      const sortedSections = [...sections].sort((a, b) => {
        return sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type);
      });

      const numItems = sortedSections.length;
      const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.25;

      const radiusVariation = baseRadius * 0.2;
      const angleVariation = 0.5;

      const newPositions = sortedSections.map((_, index) => {
        const baseAngle = (index / numItems) * 2 * Math.PI - Math.PI / 2;

        const randomRadius =
          baseRadius + (Math.random() * 2 - 1) * radiusVariation;
        const randomAngle =
          baseAngle + (Math.random() * 2 - 1) * angleVariation;

        const x = randomRadius * Math.cos(randomAngle);
        const y = randomRadius * Math.sin(randomAngle);

        return { x, y };
      });

      setInitialPositions(newPositions);
      positionsCalculated.current = true;
    };

    calculatePositions();
  }, [sections]);

  if (!sections || initialPositions.length === 0) return null;

  const sortedSections = [...sections].sort((a, b) => {
    return sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type);
  });

  return (
    <nav className="pointer-events-none fixed inset-0 flex h-screen w-full items-center justify-center text-center font-[Nightingale] select-none">
      {sortedSections.map((section, index) => (
        <motion.div
          drag
          dragListener={false}
          dragControls={controlsArray[index]}
          whileDrag={{ scale: 0.9 }}
          dragMomentum={false}
          key={section._id}
          initial={{
            x: initialPositions[index]?.x,
            y: initialPositions[index]?.y,
          }}
          className="pointer-events-auto absolute flex size-[120px] animate-pulse cursor-grab flex-col items-center px-2 hover:z-30 hover:animate-none active:z-30 active:animate-none active:cursor-grabbing"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: "-60px",
            marginTop: "-60px",
          }}
        >
          {index !== sections.length && (
            <div
              className="mx-auto size-6 animate-spin cursor-grab rounded-full border border-white/30 hover:animate-none"
              onPointerDown={(event) => controlsArray[index].start(event)}
            >
              ✴
            </div>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
            to={section.slug.current}
          >
            {section.icono && (
              <div className="hover:brightness-120 hover:saturate-200">
                <img
                  src={section.icono.url + "?w=300&fm=webp"}
                  width={100}
                  alt=""
                  className="pointer-events-none drop-shadow-[0_0_10px_#000]"
                />
              </div>
            )}
            <div>
              {section._type === "quienSoy"
                ? "???"
                : section.titulo[language] || section.titulo}
            </div>
          </NavLink>
        </motion.div>
      ))}
    </nav>
  );
}

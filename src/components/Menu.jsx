import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";
import { motion, useDragControls } from "motion/react";

export default function Menu({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];
  const { language } = useLanguage();
  const controlsArray = sections ? sections.map(() => useDragControls()) : [];

  if (!sections) return null;

  return (
    <section className="pointer-events-none fixed inset-0 flex h-screen w-full animate-pulse items-center justify-center gap-4 text-center font-[Nightingale] italic select-none">
      {sections
        .sort((a, b) => {
          return sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type);
        })
        .map((section, index) => (
          <motion.div
            drag
            dragListener={false}
            dragControls={controlsArray[index]}
            whileDrag={{ scale: 0.9 }}
            dragMomentum={false}
            key={section._id}
            className="pointer-events-auto flex flex-col items-center px-2"
          >
            {index !== sections.length && (
              <div
                className="mx-auto cursor-grab"
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
                <div>
                  <img
                    src={section.icono.url + "?w=300&fm=webp"}
                    width={100}
                    alt=""
                    className="pointer-events-none"
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
    </section>
  );
}

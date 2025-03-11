import useLanguage from "../hooks/useLanguage";
import { motion } from "motion/react";

export default function Help() {
  const { language } = useLanguage();

  return (
    <motion.div
      drag
      className="fixed top-8 right-24 animate-pulse cursor-grab text-sm select-none hover:animate-none active:cursor-grabbing"
    >
      {language === "es" ? (
        <span className="flex items-center gap-1">
          arrastra estrellas
          <img src="/img/star.svg" alt="star" className="w-4 invert" />
          para mover cosas
        </span>
      ) : (
        <span className="flex items-center gap-1">
          drag stars
          <img src="/img/star.svg" alt="star" className="w-4 invert" />
          to move things
        </span>
      )}
    </motion.div>
  );
}

import useLanguage from "../hooks/useLanguage";
import { motion } from "motion/react";

export default function Help() {
  const { language } = useLanguage();

  return (
    <motion.div
      drag
      className="fixed right-8 bottom-8 animate-pulse cursor-grab text-sm select-none hover:animate-none active:cursor-grabbing"
    >
      {language === "es"
        ? "arrastra estrellas ✴ para mover cosas"
        : "drag stars ✴ to move things"}
    </motion.div>
  );
}

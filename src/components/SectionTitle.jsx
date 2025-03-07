import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function SectionTitle({ title, className }) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      drag
      whileDrag={{ scale: 0.9 }}
      dragMomentum={false}
      initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0 }}
      animate={isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className={`almendra w-max cursor-grab pt-12 pl-4 text-7xl uppercase sm:text-9xl ${className}`}
    >
      {title}
    </motion.div>
  );
}

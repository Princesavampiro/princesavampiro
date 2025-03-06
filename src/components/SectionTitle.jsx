import { motion } from "motion/react";

export default function SectionTitle({ title, className }) {
  return (
    <motion.div
      drag
      whileDrag={{ scale: 0.9 }}
      dragMomentum={false}
      className={`almendra w-max cursor-grab pt-12 pl-4 text-7xl uppercase sm:text-9xl ${className}`}
    >
      {title}
    </motion.div>
  );
}

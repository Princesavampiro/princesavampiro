import { motion } from "motion/react";

export default function SectionTitle({ title, className }) {
  return (
    <motion.div
      drag
      whileDrag={{ scale: 0.9 }}
      dragMomentum={false}
      className={`almendra w-max cursor-grab text-9xl uppercase ${className}`}
    >
      {title}
    </motion.div>
  );
}

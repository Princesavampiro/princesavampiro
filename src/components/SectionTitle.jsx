import { motion } from "motion/react";

export default function SectionTitle({ title }) {
  return (
    <motion.div
      drag
      whileDrag={{ scale: 0.9 }}
      dragMomentum={false}
      className="almendra fixed top-1/3 right-1/8 w-max cursor-grab text-9xl uppercase"
    >
      {title}
    </motion.div>
  );
}

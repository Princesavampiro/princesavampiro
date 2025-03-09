import Loading from "./Loading";
import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-1000 grid place-items-center bg-black"
    >
      <Loading />
    </motion.div>
  );
}

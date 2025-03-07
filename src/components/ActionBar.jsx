import { NavLink, useLocation } from "react-router";
import { motion } from "motion/react";

export default function ActionBar() {
  const location = useLocation();

  return (
    <NavLink
      to={
        location.pathname.split("/").length > 2
          ? "../" + location.pathname.split("/")[1]
          : "/"
      }
      aria-label="Home"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-4 left-1/2 z-100 flex size-16 -translate-x-1/2 cursor-pointer items-center justify-center gap-4 rounded-full border border-white/30 p-3 text-center font-[Crozette] text-4xl leading-none text-black backdrop-blur-md select-none ${location.pathname.split("/").length > 2 ? "bg-radial-[at_50%_50%] from-green-100 to-[#00f] to-80%" : "bg-radial-[at_50%_50%] from-green-100 to-[#0f0] to-80%"}`}
      >
        X
      </motion.div>
    </NavLink>
  );
}

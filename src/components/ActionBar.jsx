import { NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function ActionBar() {
  const location = useLocation();
  const isMobile = useIsMobile();

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
        className={`fixed bottom-4 left-1/2 z-100 flex size-16 -translate-x-1/2 cursor-pointer items-center justify-center gap-4 rounded-full border border-white/30 text-center font-[Crozette] text-4xl leading-none text-black backdrop-blur-md select-none sm:p-3 sm:pt-4 ${location.pathname.split("/").length > 2 ? "bg-radial-[at_50%_50%] from-[#0f0] to-[#e7a1ef] to-80%" : "bg-radial-[at_50%_50%] from-green-100 to-[#e7a1ef] to-80%"}`}
      >
        {isMobile ? <img src="/img/X.png" /> : "X"}
      </motion.div>
    </NavLink>
  );
}

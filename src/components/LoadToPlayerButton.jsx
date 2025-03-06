import usePlayer from "../hooks/usePlayer";
import { motion, useDragControls } from "motion/react";

export default function LoadToPlayerButton({ data, className }) {
  const { currentEmbed, setCurrentEmbed, setIsExpanded } = usePlayer();
  const controls = useDragControls();

  if (currentEmbed === data) return null;

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      dragMomentum={false}
      className={`flex flex-col items-center justify-center gap-4 ${className} rotate-12`}
    >
      <div
        className="mx-auto size-6 animate-spin cursor-grab rounded-full border border-white/30 select-none hover:animate-none active:cursor-grabbing"
        onPointerDown={(event) => controls.start(event)}
      >
        ✴
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer rounded-full bg-radial-[at_50%_50%] from-green-100 to-[#0f0] to-80% px-8 pt-4 pb-2 font-[Nightingale] text-4xl text-black uppercase select-none"
        onClick={() => {
          setCurrentEmbed(data);
          setIsExpanded(true);
        }}
      >
        play
      </motion.button>
    </motion.div>
  );
}

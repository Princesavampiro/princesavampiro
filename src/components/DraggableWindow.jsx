import { motion, useDragControls } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function DraggableWindow({ title, children, className }) {
  const controls = useDragControls();
  const isMobile = useIsMobile();

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      dragMomentum={false}
      className={`flex h-full flex-col rounded-lg border-white/30 select-none sm:overflow-hidden sm:border sm:bg-[#00000022] sm:shadow-[0_0_12px_#000] sm:backdrop-blur-sm ${className} hover:z-30 active:z-30`}
    >
      {!isMobile && (
        <div
          onPointerDown={(event) => controls.start(event)}
          className="flex min-h-8 cursor-grab items-center justify-center border-b border-white/30 active:cursor-grabbing"
        >
          {title ?? "✴"}
        </div>
      )}
      <div className="sm:overflow-y-auto">{children}</div>
    </motion.div>
  );
}

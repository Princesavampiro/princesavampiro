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
      className={`flex h-full flex-col overflow-hidden rounded-lg border-white/30 bg-[#00000022] drop-shadow-[0_0_12px_#000] backdrop-blur-xl select-none sm:border sm:backdrop-blur-sm ${className}`}
    >
      {!isMobile && (
        <div
          onPointerDown={(event) => controls.start(event)}
          className="flex min-h-8 cursor-grab items-center justify-center border-b active:cursor-grabbing"
        >
          {title ?? "✴"}
        </div>
      )}
      <div className="overflow-y-auto">{children}</div>
    </motion.div>
  );
}

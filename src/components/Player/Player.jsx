import { useEffect } from "react";
import { useConfig } from "../../hooks/useData";
import EmbedRenderer from "../EmbedRenderer";
import usePlayer from "../../hooks/usePlayer";
import { motion, useDragControls, AnimatePresence } from "motion/react";
import useIsMobile from "../../hooks/useIsMobile";

export default function Player() {
  const { data } = useConfig();
  const { currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded } =
    usePlayer();
  const controls = useDragControls();
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentEmbed(data[0].releaseDestacado?.embed || null);
  }, [data, setCurrentEmbed]);

  return (
    <>
      <motion.div
        drag
        dragListener={false}
        dragControls={controls}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        dragMomentum={false}
        className="max-w-content fixed bottom-8 left-8 z-70 flex h-max flex-col overflow-hidden rounded-lg border-white/30 bg-[#00000022] shadow-[0_0_12px_#000] backdrop-blur-xl select-none sm:border sm:backdrop-blur-sm"
      >
        {!isMobile && (
          <div
            onPointerDown={(event) => controls.start(event)}
            className="flex min-h-8 cursor-grab items-center justify-center border-b border-white/30 active:cursor-grabbing"
          >
            ✴
          </div>
        )}
        <div className="overflow-hidden">
          <motion.div
            layout
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              width: isExpanded ? "min-content" : "5rem",
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
            className="overflow-hidden"
            style={{ minWidth: isExpanded ? "400px" : "auto" }}
          >
            <AnimatePresence>
              {currentEmbed && <EmbedRenderer value={currentEmbed} />}
            </AnimatePresence>
          </motion.div>
          <div
            className="flex cursor-pointer justify-around gap-2 bg-[#00000022] p-2 backdrop-blur-sm select-none hover:bg-white/30"
            onClick={() =>
              setIsExpanded((prev) => {
                return !prev;
              })
            }
          >
            <div className="text-center font-[Nightingale] uppercase">
              {isExpanded ? "↓" : "player"}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

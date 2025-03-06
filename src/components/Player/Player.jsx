import { useEffect } from "react";
import { useConfig } from "../../hooks/useData";
import EmbedRenderer from "../EmbedRenderer";
import usePlayer from "../../hooks/usePlayer";
import useLanguage from "../../hooks/useLanguage";
import { motion, useDragControls } from "motion/react";
import useIsMobile from "../../hooks/useIsMobile";

export default function Player() {
  const { data } = useConfig();
  const { currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded } =
    usePlayer();
  const { language } = useLanguage();
  const controls = useDragControls();
  const isMobile = useIsMobile();

  const fields = {
    show: {
      es: "mostrar",
      en: "show",
    },
    hide: {
      es: "esconder",
      en: "hide",
    },
  };

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
        className="max-w-content fixed bottom-8 left-8 z-70 flex h-max flex-col overflow-hidden rounded-lg border-white/30 bg-[#00000022] drop-shadow-[0_0_12px_#000] backdrop-blur-xl select-none sm:border sm:backdrop-blur-sm"
      >
        {!isMobile && (
          <div
            onPointerDown={(event) => controls.start(event)}
            className="flex min-h-8 cursor-grab items-center justify-center border-b border-white/30 active:cursor-grabbing"
          >
            ✴
          </div>
        )}
        <div className="overflow-y-auto">
          <div
            className={`${isExpanded ? "h-max min-w-[400px]" : "h-0 w-20 overflow-hidden"}`}
          >
            {currentEmbed && <EmbedRenderer value={currentEmbed} />}
          </div>
          <div
            className="flex cursor-pointer justify-around gap-2 bg-[#00000022] p-2 backdrop-blur-sm select-none"
            onClick={() =>
              setIsExpanded((prev) => {
                return !prev;
              })
            }
          >
            <div className="text-center">
              {isExpanded ? fields.hide[language] : fields.show[language]}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

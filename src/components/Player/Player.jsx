import { useEffect, useState } from "react";
import { useConfig } from "../../hooks/useData";
import EmbedRenderer from "../EmbedRenderer";
import DraggableWindow from "../DraggableWindow";
import usePlayer from "../../hooks/usePlayer";
import useLanguage from "../../hooks/useLanguage";

export default function Player() {
  const { data } = useConfig();
  const { currentEmbed, setCurrentEmbed } = usePlayer();
  const [isExpanded, setIsExpanded] = useState(true);
  const { language } = useLanguage();

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

  useEffect(() => {
    if (currentEmbed) {
      setIsExpanded(true);
    }
  }, [currentEmbed]);

  return (
    <>
      <DraggableWindow className="max-w-content fixed bottom-8 left-8 h-max min-w-[400px]">
        <div className={`${isExpanded ? "h-max" : "h-0"}`}>
          {currentEmbed && <EmbedRenderer value={currentEmbed} />}
        </div>
        <div
          className="relative z-20 flex cursor-pointer justify-around gap-2 bg-[#00000022] p-2 backdrop-blur-sm select-none"
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
      </DraggableWindow>
    </>
  );
}

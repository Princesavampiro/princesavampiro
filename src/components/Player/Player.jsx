import { useEffect, useState } from "react";
import { useConfig } from "../../hooks/useData";
import EmbedRenderer from "../EmbedRenderer";
import DraggableWindow from "../DraggableWindow";
import usePlayer from "../../hooks/usePlayer";
import useLanguage from "../../hooks/useLanguage";

export default function Player() {
  const { data } = useConfig();
  const { currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded } =
    usePlayer();
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

  return (
    <>
      <DraggableWindow className="max-w-content fixed bottom-8 left-8 z-50 h-max">
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
      </DraggableWindow>
    </>
  );
}

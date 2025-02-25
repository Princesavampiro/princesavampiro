import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import useLanguage from "../../hooks/useLanguage";
import { useSections } from "../../hooks/useData";
import Loading from "../Loading";
import DraggableWindow from "../DraggableWindow";
import { components } from "../PortableText/PortableTextComponents";

export default function Visceral() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;

  const visceralData = data.filter((i) => i._type === "visceral")[0];

  return (
    <section className="grid grid-cols-6">
      <motion.h1
        drag
        whileDrag={{ scale: 0.9 }}
        dragMomentum={false}
        className="almendra w-max cursor-grab py-8 text-center text-8xl"
      >
        {visceralData.titulo}
      </motion.h1>

      {visceralData.descripcion && (
        <div className="col-span-2">
          <DraggableWindow title={visceralData.titulo}>
            <div className="flex flex-col gap-4">
              <PortableText
                components={components}
                value={
                  visceralData.descripcion[language] ||
                  visceralData.descripcion.es
                }
              />
            </div>
          </DraggableWindow>
        </div>
      )}

      {visceralData.links && (
        <DraggableWindow title="Links">
          {visceralData.links.map((link, index) => (
            <li key={link._key}>
              <a className="hover:underline" href={link.url} target="_blank">
                {link.titulo}
              </a>
              {/* {index !== visceralData.links.length - 1 && (
                <span className="pl-4">⧂</span>
              )} */}
            </li>
          ))}
        </DraggableWindow>
      )}
    </section>
  );
}

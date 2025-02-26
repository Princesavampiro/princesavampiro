import { PortableText } from "@portabletext/react";
import { useCurrentSection } from "../hooks/useCurrentSection";
import useLanguage from "../hooks/useLanguage";
import DraggableWindow from "./DraggableWindow";
import { components } from "./PortableText/PortableTextComponents";

export default function SectionInfo({ title }) {
  const { currentSection, error, isLoading } = useCurrentSection();
  const { language } = useLanguage();

  if (isLoading) return null;
  if (error) return <div>Hubo un error :( </div>;

  if (!currentSection) return null;

  const sectionTitle =
    currentSection.titulo[language] || currentSection.titulo.es;
  const text =
    currentSection.texto?.[language] ??
    currentSection.bio?.[language] ??
    currentSection.descripcion?.[language] ??
    null;

  return (
    <DraggableWindow title={title} className={"max-h-[40vh] max-w-prose"}>
      <div className="p-4">
        <h1 className="py-8 pl-8 font-[Nightingale] text-2xl">
          {sectionTitle}
        </h1>
        <div className="flex flex-col gap-4">
          <PortableText components={components} value={text} />
        </div>
      </div>
    </DraggableWindow>
  );
}

import { PortableText } from "@portabletext/react";
import { components } from "./PortableText/PortableTextComponents";
import DraggableWindow from "./DraggableWindow";

export default function SectionInfo({ windowTitle, sectionTitle, text }) {
  if (!windowTitle && !sectionTitle && !text) return null;

  return (
    <DraggableWindow title={windowTitle} className={"max-h-[40vh] max-w-prose"}>
      <div className="p-4">
        {sectionTitle && (
          <h1 className="py-8 pl-8 font-[Nightingale] text-2xl">
            {sectionTitle}
          </h1>
        )}
        {text && (
          <div className="flex flex-col gap-4">
            <PortableText components={components} value={text} />
          </div>
        )}
      </div>
    </DraggableWindow>
  );
}

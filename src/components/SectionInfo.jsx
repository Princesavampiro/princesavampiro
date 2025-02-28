import { PortableText } from "@portabletext/react";
import { components } from "./PortableText/PortableTextComponents";
import DraggableWindow from "./DraggableWindow";

export default function SectionInfo({
  windowTitle,
  sectionTitle,
  details,
  text,
}) {
  if (!windowTitle && !sectionTitle && !text) return null;

  return (
    <DraggableWindow
      title={windowTitle}
      className={"fixed top-1/8 left-16 max-h-[40vh] max-w-prose"}
    >
      <div className="p-4">
        {sectionTitle && (
          <h1 className="py-4 font-[Nightingale] text-2xl">{sectionTitle}</h1>
        )}

        {details && (
          <div className="pb-4 text-sm">
            {details.date && <p>{details.date}</p>}
            {details.label && <p>{details.label}</p>}
            {details.releaseType && <p>{details.releaseType}</p>}
            {details.place && <p>{details.place}</p>}
          </div>
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

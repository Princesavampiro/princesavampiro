import { PortableText } from "@portabletext/react";
import { components } from "./PortableText/PortableTextComponents";
import DraggableWindow from "./DraggableWindow";

export default function SectionInfo({
  windowTitle,
  sectionTitle,
  details,
  text,
  className,
  contact,
}) {
  if (!windowTitle && !sectionTitle && !text) return null;

  return (
    <DraggableWindow
      title={windowTitle}
      className={`h-max max-w-prose sm:max-h-[40vh] ${className}`}
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
        {contact?.email && (
          <div className="flex gap-2 py-4">
            {contact?.message && <p>{contact?.message}: </p>}
            <a
              href={`mailto:${contact.email}`}
              className="animate-pulse hover:animate-none hover:underline"
            >
              {contact.email}
            </a>
          </div>
        )}
      </div>
    </DraggableWindow>
  );
}

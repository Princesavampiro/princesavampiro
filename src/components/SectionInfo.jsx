import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
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
  const { language } = useLanguage();
  if (!windowTitle && !sectionTitle && !text) return null;

  return (
    <DraggableWindow
      title={windowTitle}
      className={`h-max max-w-prose sm:max-h-[40vh] ${className}`}
    >
      <div className="p-8">
        {sectionTitle && (
          <h1 className="pb-4 font-[Nightingale] text-2xl">{sectionTitle}</h1>
        )}

        {details && (
          <div className="pb-4 text-sm">
            {details.date && (
              <p>
                {new Date(details.date).toLocaleDateString(language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
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
          <div className="gap-2 py-4 sm:flex">
            {contact?.message && <span>{contact?.message}: </span>}
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

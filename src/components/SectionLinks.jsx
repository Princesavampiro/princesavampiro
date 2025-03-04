import DraggableWindow from "./DraggableWindow";
import useLanguage from "../hooks/useLanguage";

export default function SectionLinks({ links }) {
  const { language } = useLanguage();
  if (!links) return null;

  return (
    <DraggableWindow
      title={"Links"}
      className={"fixed right-1/8 bottom-1/16 h-min min-w-[250px]"}
    >
      <ul className="p-4">
        {links.map((link) => (
          <li key={link._key} className="text-center">
            <a
              className="hover:underline"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.comentario && (
                <span className="pr-2">
                  {link.comentario?.[language] || link.comentario?.es}
                </span>
              )}
              <span>{link.titulo}</span>
            </a>
          </li>
        ))}
      </ul>
    </DraggableWindow>
  );
}

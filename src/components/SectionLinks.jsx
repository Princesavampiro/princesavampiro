import DraggableWindow from "./DraggableWindow";
import useLanguage from "../hooks/useLanguage";

export default function SectionLinks({ links, className }) {
  const { language } = useLanguage();
  if (!links) return null;

  return (
    <DraggableWindow
      title={"Links"}
      className={`h-min min-w-[250px] sm:max-w-1/4 ${className}`}
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

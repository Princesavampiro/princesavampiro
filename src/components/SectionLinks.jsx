import DraggableWindow from "./DraggableWindow";
import useLanguage from "../hooks/useLanguage";

export default function SectionLinks({ links, className }) {
  const { language } = useLanguage();
  if (!links) return null;

  return (
    <DraggableWindow
      title={"Links"}
      className={`h-min min-w-[250px] ${className}`}
    >
      <ul className="flex flex-col items-center gap-2 p-4 sm:gap-0">
        {links.map((link) => (
          <li
            key={link._key}
            className="rounded-full border px-2 py-1 text-center sm:border-none sm:p-0"
          >
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

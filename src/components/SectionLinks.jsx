import { useCurrentSection } from "../hooks/useCurrentSection";
import DraggableWindow from "./DraggableWindow";

export default function SectionLinks() {
  const { currentSection, error, isLoading } = useCurrentSection();
  const links = currentSection?.links;

  if (isLoading) return null;
  if (error) return <div>Hubo un error :( </div>;
  if (!currentSection || !links) return null;

  return (
    <DraggableWindow title={"Links"} className={"h-min min-w-[250px]"}>
      <ul>
        {links.map((link, index) => (
          <li key={link._key} className="text-center">
            <a
              className="hover:underline"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.titulo}
            </a>
          </li>
        ))}
      </ul>
    </DraggableWindow>
  );
}

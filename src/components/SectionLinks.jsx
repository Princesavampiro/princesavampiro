import DraggableWindow from "./DraggableWindow";

export default function SectionLinks({ links }) {
  if (!links) return null;

  return (
    <DraggableWindow title={"Links"} className={"h-min min-w-[250px]"}>
      <ul className="p-4">
        {links.map((link) => (
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

import { NavLink } from "react-router";

export default function Menu({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];

  if (!sections) return null;

  return (
    <nav>
      <ul className="flex flex-col">
        {sections
          .sort((a, b) => {
            return (
              sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type)
            );
          })
          .map((section) => (
            <NavLink key={section._id} to={section.slug.current}>
              {section.titulo.es || section.titulo}
            </NavLink>
          ))}
      </ul>
    </nav>
  );
}

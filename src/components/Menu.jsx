import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";

export default function Menu({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];
  const { language } = useLanguage();

  if (!sections) return null;

  return (
    <nav>
      <ul className="flex flex-wrap justify-center gap-4 text-center">
        {sections
          .sort((a, b) => {
            return (
              sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type)
            );
          })
          .map((section) => (
            <NavLink key={section._id} to={section.slug.current}>
              {section.titulo[language] || section.titulo}
            </NavLink>
          ))}
      </ul>
    </nav>
  );
}

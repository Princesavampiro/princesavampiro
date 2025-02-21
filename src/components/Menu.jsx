import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";

export default function Menu({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];
  const { language } = useLanguage();

  if (!sections) return null;

  return (
    <nav className="fixed top-1/4 left-2 z-10">
      <ul className="flex flex-wrap justify-center gap-4 text-center">
        {sections
          .sort((a, b) => {
            return (
              sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type)
            );
          })
          .map((section) =>
            section._type === "quienSoy" ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-[Nightingale] underline"
                    : "font-[Nightingale] hover:underline"
                }
                key={section._id}
                to={section.slug.current}
              >
                ???
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-[Nightingale] underline"
                    : "font-[Nightingale] hover:underline"
                }
                key={section._id}
                to={section.slug.current}
              >
                {section.titulo[language] || section.titulo}
              </NavLink>
            ),
          )}
      </ul>
    </nav>
  );
}

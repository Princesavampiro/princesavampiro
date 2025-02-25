import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";

export default function Home({ sections }) {
  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];
  const { language } = useLanguage();

  if (!sections) return null;
  return (
    <section className="fixed inset-0 flex h-screen w-full animate-pulse items-center justify-center gap-4 italic">
      <ul className="flex flex-wrap justify-center rounded-[50%] bg-[#000000ee] px-12 py-6 text-center font-[Nightingale] select-none">
        {sections
          .sort((a, b) => {
            return (
              sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type)
            );
          })
          .map((section, index) => (
            <div key={section._id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "px-2 underline" : "px-2 hover:underline"
                }
                to={section.slug.current}
              >
                {section._type === "quienSoy"
                  ? "???"
                  : section.titulo[language] || section.titulo}
              </NavLink>
              {index !== sections.length - 1 && (
                <span className="mx-auto">✴</span>
              )}
            </div>
          ))}
      </ul>
    </section>
  );
}

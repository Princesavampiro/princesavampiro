import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { components } from "./PortableText/PortableTextComponents";
import Loading from "./Loading";

export default function Visceral() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;

  const visceralData = data.filter((i) => i._type === "visceral")[0];

  console.log(visceralData);

  return (
    <section className="">
      <h1 className="almendra py-8 text-center text-8xl">
        {visceralData.titulo}
      </h1>

      {visceralData.descripcion && (
        <div className="flex flex-col gap-2">
          <PortableText
            components={components}
            value={
              visceralData.descripcion[language] || visceralData.descripcion.es
            }
          />
        </div>
      )}

      {visceralData.links && (
        <ul className="flex flex-wrap justify-center gap-4 px-32 pt-16">
          {visceralData.links.map((link, index) => (
            <li key={link._key}>
              <a className="hover:underline" href={link.url} target="_blank">
                {link.titulo}
              </a>
              {index !== visceralData.links.length - 1 && (
                <span className="pl-4">⧂</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

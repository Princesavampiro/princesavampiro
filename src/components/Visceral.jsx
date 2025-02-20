import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function Visceral() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error :( </div>;

  const visceralData = data.filter((i) => i._type === "visceral")[0];

  return (
    <section>
      <SectionTitle title={visceralData.titulo} />
      {visceralData.descripcion && (
        <PortableText
          value={
            visceralData.descripcion[language] || visceralData.descripcion.es
          }
        />
      )}
      {visceralData.links && (
        <ul>
          {visceralData.links.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank">
                {link.titulo}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

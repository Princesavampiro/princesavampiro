import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function QuienSoy() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error :( </div>;

  const quienSoyData = data.filter((i) => i._type === "quienSoy")[0];

  return (
    <section>
      <SectionTitle
        title={quienSoyData.titulo[language] || quienSoyData.titulo.es}
      />
      {quienSoyData.bio && (
        <PortableText
          value={quienSoyData.bio[language] || quienSoyData.bio.es}
        />
      )}
    </section>
  );
}

import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function Visual() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error :( </div>;

  const visualData = data.filter((i) => i._type === "visual")[0];

  return (
    <section>
      <SectionTitle
        title={visualData.titulo[language] || visualData.titulo.es}
      />
      {visualData.descripcion && (
        <PortableText
          value={visualData.descripcion[language] || visualData.descripcion.es}
        />
      )}
    </section>
  );
}

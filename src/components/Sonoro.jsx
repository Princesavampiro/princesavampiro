import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function Sonoro() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  return (
    <section>
      <SectionTitle
        title={sonoroData.titulo[language] || sonoroData.titulo.es}
      />
      {sonoroData.descripcion && (
        <PortableText
          value={sonoroData.descripcion[language] || sonoroData.descripcion.es}
        />
      )}
    </section>
  );
}

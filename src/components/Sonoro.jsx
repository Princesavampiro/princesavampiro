import { useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

export default function Sonoro() {
  const { data, isLoading, error } = useSections();
  const { language } = useLanguage();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  return (
    <section>
      <h1 className="text-xl">
        {sonoroData.titulo[language] || sonoroData.titulo.es}
      </h1>
      {sonoroData.descripcion && (
        <PortableText
          value={sonoroData.descripcion[language] || sonoroData.descripcion.es}
        />
      )}
    </section>
  );
}

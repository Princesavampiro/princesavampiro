import { useExpos, useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function Visual() {
  const { data, isLoading, error } = useSections();
  const {
    data: expos,
    isLoading: isExposLoading,
    error: exposError,
  } = useExpos();

  const { language } = useLanguage();

  if (isLoading || isExposLoading) return <div>Cargando...</div>;
  if (error || exposError) return <div>Hubo un error :( </div>;

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

      {expos && (
        <div>
          {expos.map((expo) => (
            <div key={expo._id}>
              <h3>{expo.titulo}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

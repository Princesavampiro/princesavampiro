import { useReleases, useSections } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import SectionTitle from "./SectionTitle";

export default function Sonoro() {
  const { data, isLoading, error } = useSections();
  const {
    data: releases,
    isLoading: isReleasesLoading,
    error: releasesError,
  } = useReleases();

  const { language } = useLanguage();

  if (isLoading || isReleasesLoading) return <div>Cargando...</div>;
  if (error || releasesError) return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  console.log(releases);

  return (
    <section className="flex flex-col gap-8">
      <SectionTitle
        title={sonoroData.titulo[language] || sonoroData.titulo.es}
      />

      {sonoroData.descripcion && (
        <div className="flex flex-col gap-2">
          <PortableText
            value={
              sonoroData.descripcion[language] || sonoroData.descripcion.es
            }
          />
        </div>
      )}

      {releases && (
        <ul className="grid grid-cols-2 gap-8">
          {releases.map((release) => (
            <li key={release._id}>
              <h3 className="text-center">{release.titulo}</h3>
              <img src={release.artwork.url} alt="" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

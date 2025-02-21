import { useReleases, useSections } from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import Loading from "./Loading";
import CardGrid from "./CardGrid";

export default function Sonoro() {
  const { data, isLoading, error } = useSections();
  const {
    data: releases,
    isLoading: isReleasesLoading,
    error: releasesError,
  } = useReleases();

  const { language } = useLanguage();

  if (isLoading || isReleasesLoading) return <Loading />;
  if (error || releasesError) return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  return (
    <section className="flex flex-col gap-8">
      <SectionInfo
        title={sonoroData.titulo[language] || sonoroData.titulo.es}
        text={sonoroData.descripcion[language] || sonoroData.descripcion.es}
      />
      {releases && <CardGrid data={releases} release={true} />}
    </section>
  );
}

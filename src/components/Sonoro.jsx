import { useState } from "react";
import {
  useReleases,
  useSections,
  useTiposDeReleases,
  useLives,
} from "../hooks/useData";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import Loading from "./Loading";
import CardGrid from "./CardGrid";

export default function Sonoro() {
  const [selectedSection, setSelectedSection] = useState("releases");
  const { data, isLoading, error } = useSections();
  const {
    data: releases,
    isLoading: isReleasesLoading,
    error: releasesError,
  } = useReleases();
  const {
    data: tipos,
    isLoading: isTiposLoading,
    error: tiposError,
  } = useTiposDeReleases();
  const {
    data: lives,
    isLoading: isLivesLoading,
    error: livesError,
  } = useLives();

  const { language } = useLanguage();

  if (isLoading || isReleasesLoading || isTiposLoading || isLivesLoading)
    return <Loading />;
  if (error || releasesError || tiposError || livesError)
    return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  return (
    <section className="flex w-full flex-col items-center gap-4">
      <SectionInfo
        title={sonoroData.titulo[language] || sonoroData.titulo.es}
        text={sonoroData.descripcion[language] || sonoroData.descripcion.es}
      />
      <h3 className="z-10 text-center font-[Nightingale] text-xl">
        <span
          className={
            selectedSection === "releases" ? "underline" : "cursor-pointer"
          }
          onClick={() => setSelectedSection("releases")}
        >
          Releases
        </span>
        /{" "}
        <span
          className={
            selectedSection === "lives" ? "underline" : "cursor-pointer"
          }
          onClick={() => setSelectedSection("lives")}
        >
          Lives
        </span>
      </h3>
      {selectedSection === "releases" && (
        <div className="flex w-full flex-col items-center gap-8">
          {tipos && (
            <ul className="flex gap-2">
              {tipos.map((tipo) => (
                <li
                  key={tipo._id}
                  className="rounded border px-2 text-sm uppercase"
                >
                  {tipo.tipoDeRelease}
                </li>
              ))}
            </ul>
          )}
          {releases && <CardGrid data={releases} release={true} />}
        </div>
      )}
      {selectedSection === "lives" && (
        <div className="flex w-full flex-col items-center gap-8">
          {lives && <CardGrid data={lives} release={false} />}
        </div>
      )}
    </section>
  );
}

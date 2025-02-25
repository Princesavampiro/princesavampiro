import { useEffect, useState } from "react";
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
import DraggableWindow from "./DraggableWindow";
import { Outlet } from "react-router";

export default function Sonoro() {
  const [selectedSection, setSelectedSection] = useState("releases");
  const [filteredReleases, setFilteredReleases] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

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

  useEffect(() => {
    selectedType
      ? setFilteredReleases(
          releases.filter(
            (release) => release.tipoDeRelease.tipoDeRelease === selectedType,
          ),
        )
      : setFilteredReleases(releases);
  }, [selectedType, releases]);

  if (isLoading || isReleasesLoading || isTiposLoading || isLivesLoading)
    return <Loading />;
  if (error || releasesError || tiposError || livesError)
    return <div>Hubo un error :( </div>;

  const sonoroData = data.filter((i) => i._type === "sonoro")[0];

  return (
    <section className="grid h-full w-full flex-grow grid-cols-6 gap-8 px-8">
      <div className="col-span-2 row-span-1 h-1/4">
        <SectionInfo
          title={sonoroData.titulo[language] || sonoroData.titulo.es}
          text={sonoroData.descripcion[language] || sonoroData.descripcion.es}
        />
      </div>
      <div className="col-span-4 row-span-3 h-full">
        <DraggableWindow>
          <h3 className="text-center font-[Nightingale] text-xl">
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
                <ul className="flex">
                  {tipos.map((tipo) => (
                    <li
                      key={tipo._id}
                      className={`cursor-pointer rounded-[50%] border px-4 text-sm uppercase select-none ${selectedType === tipo.tipoDeRelease ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
                      onClick={() => setSelectedType(tipo.tipoDeRelease)}
                    >
                      {tipo.tipoDeRelease + "s"}
                    </li>
                  ))}
                  <li
                    className={`cursor-pointer rounded-[50%] border px-2 text-sm uppercase select-none hover:bg-white hover:text-black`}
                    onClick={() => setSelectedType(null)}
                  >
                    ✕
                  </li>
                </ul>
              )}
              {filteredReleases && (
                <CardGrid data={filteredReleases} contentType="release" />
              )}
            </div>
          )}
          {selectedSection === "lives" && (
            <div className="flex w-full flex-col items-center gap-8">
              {lives && <CardGrid data={lives} contentType="live" />}
            </div>
          )}
        </DraggableWindow>
      </div>
      <div className="fixed top-0 left-0 h-3/4">
        <Outlet />
      </div>
    </section>
  );
}

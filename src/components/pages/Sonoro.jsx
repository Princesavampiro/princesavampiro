import { useEffect, useState } from "react";
import {
  useReleases,
  useSections,
  useTiposDeReleases,
  useLives,
} from "../../hooks/useData";
import Loading from "../Loading";
import CardGrid from "../CardGrid";

export default function Sonoro() {
  const [selectedSection, setSelectedSection] = useState("releases");
  const [filteredReleases, setFilteredReleases] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const { isLoading, error } = useSections();
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

  return (
    <>
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
          Performances
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
    </>
  );
}

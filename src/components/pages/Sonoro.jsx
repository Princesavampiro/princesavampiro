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
    <section className="flex w-full flex-col items-center gap-8 p-8">
      <h3 className="text-center font-[Nightingale] text-xl">
        <span
          className={`rounded-full px-2 py-1 drop-shadow-lg ${
            selectedSection === "releases"
              ? "bg-white/30"
              : "cursor-pointer bg-white/15 hover:bg-white/30"
          }`}
          onClick={() => setSelectedSection("releases")}
        >
          Releases
        </span>
        /{" "}
        <span
          className={`rounded-full px-2 py-1 drop-shadow-lg ${
            selectedSection === "lives"
              ? "bg-white/30"
              : "cursor-pointer bg-white/15 hover:bg-white/30"
          }`}
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
                  className={`cursor-pointer rounded-[50%] border border-white/40 bg-black/5 px-2 py-1 text-sm uppercase transition-all select-none ${selectedType === tipo.tipoDeRelease ? "rounded-none" : "hover:bg-white/30"}`}
                  onClick={() => setSelectedType(tipo.tipoDeRelease)}
                >
                  {tipo.tipoDeRelease + "s"}
                </li>
              ))}
              <li
                className={`cursor-pointer rounded-[50%] border border-white/40 bg-black/5 px-2 py-1 text-sm uppercase transition-all select-none hover:bg-white/30`}
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
    </section>
  );
}

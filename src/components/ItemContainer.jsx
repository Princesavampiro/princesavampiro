import { NavLink, useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import SectionImage from "./SectionImage";
import DraggableWindow from "./DraggableWindow";
import SectionLinks from "./SectionLinks";
import LoadToPlayerButton from "./LoadToPlayerButton";

export default function ItemContainer() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const { data, isLoading, error } = useItem(currentPath);
  const { language } = useLanguage();

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 grid place-items-center backdrop-blur-sm">
        <Loading />
      </div>
    );
  if (error) return <div>Hubo un error :(</div>;

  const details = {
    date: data[0].fecha,
    label: data[0].sello,
    place: data[0].lugar,
    releaseType: data[0].tipoDeRelease?.tipoDeRelease,
  };

  return (
    <section className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#0000022] backdrop-blur-sm">
      <SectionInfo
        sectionTitle={data[0].titulo}
        details={details}
        text={data[0].texto[language]}
        className={`sm:fixed sm:top-1/8 sm:left-1/8`}
      />

      {data[0].imagenes && (
        <DraggableWindow className="fixed top-1/4 left-1/2 h-min">
          <div className="flex w-2/3 items-center gap-2 overflow-x-auto p-2">
            {data[0].imagenes?.map((imagen) => (
              <img
                key={imagen._key}
                src={imagen.url + size.small}
                alt={data[0].titulo}
                className="mx-auto w-[100px] rounded-sm"
              />
            ))}
          </div>
        </DraggableWindow>
      )}

      {data[0].obras && (
        <DraggableWindow className="fixed bottom-1/8 left-1/4 max-h-[40vh] w-2/3">
          <div className="grid grid-cols-2 gap-8 p-8">
            {data[0].obras?.map((obra) => (
              <div key={obra.titulo}>
                {obra.imagen.url ? (
                  <img
                    src={obra.imagen?.url + size.small}
                    alt={obra.titulo}
                    className="w-[200px] rounded-sm"
                  />
                ) : (
                  <div className="h-[100px] w-full rounded-sm border bg-black opacity-30" />
                )}
                <div className="text-sm">
                  {obra.titulo && (
                    <h2 className="py-2 font-[Nightningale] text-xl">
                      {obra.titulo}
                    </h2>
                  )}
                  {obra.fecha && <p>{obra.fecha}</p>}
                  {obra.medidas && <p>{obra.medidas}</p>}
                  {obra.materiales && <p>{obra.materiales?.[language]}</p>}
                </div>
                {obra.descripcion && (
                  <p>
                    descripcion de la obra:{" "}
                    {obra.descripcion?.[language] || obra.descripcion?.es}
                  </p>
                )}
              </div>
            ))}
          </div>
        </DraggableWindow>
      )}

      {data[0].links && (
        <SectionLinks
          links={data[0].links}
          className={`sm:fixed sm:right-1/6 sm:bottom-1/16`}
        />
      )}

      {data[0].artwork && (
        <SectionImage
          image={data[0].artwork}
          alt={data[0].titulo}
          className={`sm:fixed sm:bottom-32 sm:left-1/3`}
        />
      )}

      {data[0].embed && (
        <LoadToPlayerButton
          data={data[0].embed}
          className="max-w-content fixed bottom-1/8 left-1/4 h-max"
        />
      )}
    </section>
  );
}

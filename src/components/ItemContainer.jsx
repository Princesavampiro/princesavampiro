import { NavLink, useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import SectionImage from "./SectionImage";
import DraggableWindow from "./DraggableWindow";
import SectionLinks from "./SectionLinks";
import LoadToPlayerButton from "./LoadToPlayerButton";
import useLightbox from "../hooks/useLightbox";

export default function ItemContainer() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const { data, isLoading, error } = useItem(currentPath);
  const { language } = useLanguage();

  const { setLightboxOpen, setLightboxImage } = useLightbox();

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-60 grid place-items-center backdrop-blur-sm">
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
    <section className="fixed inset-0 z-60 h-screen w-screen overflow-hidden bg-[#00000044] backdrop-blur-xl">
      <SectionInfo
        sectionTitle={data[0].titulo}
        details={details}
        text={data[0].texto[language]}
        className={`sm:fixed sm:top-1/8 sm:left-1/8`}
      />

      {data[0].imagenes && (
        <DraggableWindow className="h-min w-max max-w-1/3 sm:fixed sm:top-1/4 sm:right-1/8">
          <div className="flex w-full items-center gap-2 overflow-x-auto p-2">
            {data[0].imagenes?.map((imagen) => (
              <div key={imagen._key}>
                <img
                  src={imagen.url + size.small}
                  alt={data[0].titulo}
                  className="mx-auto w-[170px] cursor-zoom-in rounded-sm"
                  onClick={() => {
                    setLightboxImage(imagen);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </DraggableWindow>
      )}

      {data[0].obras && (
        <DraggableWindow className="max-h-[50vh] w-1/3 sm:fixed sm:bottom-1/8 sm:left-1/4">
          <div className="columns-3xs gap-8 p-8 pb-0">
            {data[0].obras?.map((obra) => (
              <div
                key={obra.titulo}
                className="flex break-inside-avoid flex-col gap-2 pb-8"
              >
                {obra.imagen.url ? (
                  <img
                    src={obra.imagen?.url + size.small}
                    alt={obra.titulo}
                    className="w-full cursor-zoom-in rounded-sm"
                    onClick={() => {
                      setLightboxImage(obra.imagen);
                      setLightboxOpen(true);
                    }}
                  />
                ) : (
                  <div className="h-[100px] w-full rounded-sm border border-white/50 bg-black opacity-30" />
                )}
                <div className="text-sm">
                  {obra.titulo && (
                    <h2 className="py-2 font-[Nightingale] text-xl">
                      {obra.titulo}
                    </h2>
                  )}
                  {obra.fecha && <p>{obra.fecha}</p>}
                  {obra.medidas && <p>{obra.medidas}</p>}
                  {obra.materiales && <p>{obra.materiales?.[language]}</p>}
                </div>
                {obra.descripcion && (
                  <p>{obra.descripcion?.[language] || obra.descripcion?.es}</p>
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
          className="max-w-content fixed bottom-1/8 left-1/4 h-max hover:z-70 active:z-70"
        />
      )}
    </section>
  );
}

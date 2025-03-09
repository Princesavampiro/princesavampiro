import { useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";
import Error from "./Error";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import SectionImage from "./SectionImage";
import DraggableWindow from "./DraggableWindow";
import SectionLinks from "./SectionLinks";
import LoadToPlayerButton from "./LoadToPlayerButton";
import useLightbox from "../hooks/useLightbox";
import useIsMobile from "../hooks/useIsMobile";
import EmbedRenderer from "./EmbedRenderer";

export default function ItemContainer() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const { data, isLoading, error } = useItem(currentPath);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

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
  if (error)
    return (
      <div className="fixed inset-0 z-100 flex h-screen w-full items-center justify-center rounded-lg bg-[#000000aa] backdrop-blur-lg">
        <Error />
      </div>
    );

  const details = {
    date: data[0].fecha,
    label: data[0].sello,
    place: data[0].lugar,
    releaseType: data[0].tipoDeRelease?.tipoDeRelease,
  };

  return (
    <section className="fixed inset-0 z-60 w-full overflow-auto bg-black/30 pb-24 backdrop-blur-xl sm:h-screen sm:overflow-hidden sm:pb-0">
      <SectionInfo
        sectionTitle={data[0].titulo}
        details={details}
        text={data[0].texto[language]}
        className={`sm:fixed sm:top-1/8 sm:left-1/8`}
      />

      {data[0].artwork && (
        <SectionImage
          image={data[0].artwork}
          alt={data[0].titulo}
          className={`sm:fixed sm:bottom-32 sm:left-1/3`}
        />
      )}

      {data[0].embed &&
        (isMobile ? (
          <div className="mx-4 overflow-hidden rounded-md">
            <EmbedRenderer value={data[0].embed} />
          </div>
        ) : (
          <LoadToPlayerButton
            data={data[0].embed}
            className="max-w-content fixed bottom-1/8 left-1/4 h-max hover:z-70 active:z-70"
          />
        ))}

      <div className="py-8 text-center sm:hidden">✴</div>

      {data[0].obras && (
        <DraggableWindow
          className={`sm:fixed sm:bottom-1/8 sm:left-1/4 sm:max-h-[50vh] ${data[0].obras?.length > 1 ? "sm:w-1/3" : "sm:max-w-[300px]"}`}
        >
          <div className="flex flex-col gap-8 p-8 pb-0 sm:block sm:columns-3xs">
            {data[0].obras?.map((obra) => (
              <div
                key={obra.titulo}
                className="flex flex-col gap-2 sm:break-inside-avoid sm:pb-8"
              >
                {obra.imagen?.url ? (
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
                  <div className="w-full rounded-sm border border-white/50 bg-black opacity-30 sm:h-[100px]" />
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

      <div className="py-8 text-center sm:hidden">✴</div>

      {data[0].imagenes && (
        <DraggableWindow className="sm:fixed sm:top-1/4 sm:right-1/8 sm:h-min sm:w-max sm:max-w-1/2 lg:max-w-1/3">
          <div className="flex w-full flex-col items-center gap-4 p-4 sm:flex-row sm:overflow-x-auto">
            {data[0].imagenes?.map(
              (imagen) =>
                imagen.url && (
                  <div key={imagen._key} className="shrink-0">
                    <img
                      src={imagen.url + size.small}
                      alt={data[0].titulo}
                      className={`mx-auto w-full cursor-zoom-in rounded-sm ${data[0].imagenes.length === 1 ? "sm:w-[300px]" : "sm:w-[170px]"}`}
                      onClick={() => {
                        setLightboxImage(imagen);
                        setLightboxOpen(true);
                      }}
                    />
                  </div>
                ),
            )}
          </div>
        </DraggableWindow>
      )}
    </section>
  );
}

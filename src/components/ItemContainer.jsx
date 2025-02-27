import { NavLink, useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";
import useLanguage from "../hooks/useLanguage";
import SectionInfo from "./SectionInfo";
import SectionImage from "./SectionImage";
import DraggableWindow from "./DraggableWindow";
import SectionLinks from "./SectionLinks";

export default function ItemContainer() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const { data, isLoading, error } = useItem(currentPath);
  const { language } = useLanguage();

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :(</div>;

  const details = {
    date: data[0].fecha,
    label: data[0].sello,
    place: data[0].lugar,
    releaseType: data[0].tipoDeRelease?.tipoDeRelease,
  };

  return (
    <section className="fixed inset-0 grid h-screen w-screen grid-cols-2 place-items-center gap-8 overflow-scroll bg-[#0000022] p-16 backdrop-blur-sm">
      <SectionInfo
        sectionTitle={data[0].titulo}
        details={details}
        text={data[0].texto[language]}
      />

      {data[0].imagenes && (
        <DraggableWindow className="h-min">
          <div className="flex w-full items-center gap-2 overflow-x-auto p-2">
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
        <DraggableWindow className="col-span-2">
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

      {data[0].links && <SectionLinks links={data[0].links} />}

      {data[0].artwork && (
        <SectionImage image={data[0].artwork} alt={data[0].titulo} />
      )}

      <NavLink
        to={location.pathname.split("/")[1]}
        className="fixed bottom-16 mx-auto rounded-[50%] bg-white px-2 py-1 text-sm text-black"
      >
        {language === "es" ? "CERRAR" : "CLOSE"}
      </NavLink>
    </section>
  );
}

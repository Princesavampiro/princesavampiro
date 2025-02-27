import { NavLink, useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";
import { PortableText } from "@portabletext/react";
import { components } from "./PortableText/PortableTextComponents";
import useLanguage from "../hooks/useLanguage";

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

  return (
    <section className="fixed flex h-screen w-screen flex-col items-center justify-center gap-4 overflow-scroll bg-[#0000022] backdrop-blur-sm">
      <h1>{data[0].titulo}</h1>
      <p>{data[0].fecha}</p>
      {data[0].sello && <p>{data[0].sello}</p>}
      {data[0].lugar && <p>LUGAR: {data[0].lugar}</p>}
      {data[0].texto && (
        <PortableText
          value={data[0].texto?.[language]}
          components={components}
        />
      )}
      {data[0].imagenes && (
        <div className="flex gap-2">
          {data[0].imagenes?.map((imagen) => (
            <img
              key={imagen._key}
              src={imagen.url + size.small}
              alt={data[0].titulo}
              className="w-[100px]"
            />
          ))}
        </div>
      )}
      {data[0].obras?.map((obra) => (
        <div key={obra.titulo}>
          {obra.imagen && (
            <img
              src={obra.imagen?.url + size.small}
              alt={obra.titulo}
              className="w-[200px]"
            />
          )}
          <h2>{obra.titulo}</h2>
          {obra.fecha && <p>{obra.fecha}</p>}
          {obra.medidas && <p>{obra.medidas}</p>}
          {obra.materiales && <p>{obra.materiales?.[language]}</p>}
          {obra.descripcion && (
            <p>
              descripcion de la obra:{" "}
              {obra.descripcion?.[language] || obra.descripcion?.es}
            </p>
          )}
        </div>
      ))}
      {data[0].links?.map((link) => (
        <a key={link._key} href={link.url}>
          {link.titulo}
        </a>
      ))}
      {data[0].artwork && (
        <img src={data[0].artwork.url + size.small} alt={data[0].titulo} />
      )}
      {data[0].tipoDeRelease && (
        <p>tipo de release: {data[0].tipoDeRelease.tipoDeRelease}</p>
      )}
      <NavLink to={location.pathname.split("/")[1]}>CERRAR</NavLink>
    </section>
  );
}

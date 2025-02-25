import { NavLink, useParams } from "react-router";
import { PortableText } from "@portabletext/react";
import useLanguage from "../../hooks/useLanguage";
import { useRelease } from "../../hooks/useData";
import Loading from "../Loading";
import ItemContainer from "../ItemContainer";
import DraggableWindow from "../DraggableWindow";
import ImageGallery from "../ImageGallery";
import LinksList from "../LinksList";
import { components } from "../PortableText/PortableTextComponents";

export default function Release() {
  const { slug } = useParams();
  const { data, isLoading, error } = useRelease(slug);
  const { language } = useLanguage();

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  const fields = {
    label: {
      es: "Sello",
      en: "Label",
    },
    close: {
      es: "Cerrar",
      en: "Close",
    },
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;

  return (
    <ItemContainer>
      <NavLink to="..">{fields.close[language]}</NavLink>
      <DraggableWindow>
        <section className="flex flex-col items-center justify-center gap-4">
          {data[0].titulo && <h1>{data[0].titulo}</h1>}
          <p>{data[0].fecha}</p>
          {data[0].sello && (
            <p>{fields.label[language] + ": " + data[0].sello}</p>
          )}
          {data[0].artwork && (
            <img src={data[0].artwork.url + size.small} alt={data[0].titulo} />
          )}
          {data[0].texto && (
            <PortableText
              value={data[0].texto[language] || data[0].texto.es}
              components={components}
            />
          )}
          {/* embed */}
          {data[0].imagenes && <ImageGallery images={data[0].imagenes} />}
          {data[0].links && <LinksList links={data[0].links} />}
        </section>
      </DraggableWindow>
    </ItemContainer>
  );
}

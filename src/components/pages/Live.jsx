import { useLives } from "../hooks/useData";
import { NavLink, useParams } from "react-router";
import Loading from "./Loading";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { components } from "./PortableText/PortableTextComponents";
import ImageGallery from "./ImageGallery";
import LinksList from "./LinksList";
import ItemContainer from "./ItemContainer";

export default function Live() {
  const { slug } = useParams();
  const { data, isLoading, error } = useLives(slug);
  const { language } = useLanguage();

  const fields = {
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

      <section className="flex flex-col items-center justify-center gap-4">
        <h1>{data[0].titulo}</h1>
        <p>{data[0].fecha}</p>
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
    </ItemContainer>
  );
}

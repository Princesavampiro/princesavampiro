import { useRelease } from "../hooks/useData";
import { useNavigate, useParams } from "react-router";
import Loading from "./Loading";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { components } from "./PortableText/PortableTextComponents";

export default function Release() {
  const { slug } = useParams();
  const { data, isLoading, error } = useRelease(slug);
  const navigate = useNavigate();
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
    goBack: {
      es: "Volver",
      en: "Go back",
    },
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1>{data[0].titulo}</h1>
      <p>{data[0].fecha}</p>
      {data[0].sello && <p>{fields.label[language] + ": " + data[0].sello}</p>}
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

      {data[0].imagenes && (
        <ul className="flex flex-wrap gap-4">
          {data[0].imagenes.map((img) => (
            <li key={img._key} className="w-[200px]">
              <img src={img.url + size.small} alt={data[0].titulo} />
            </li>
          ))}
        </ul>
      )}

      {data[0].links && (
        <ul>
          <h3 className="underline">Links:</h3>
          {data[0].links.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank">
                {link.titulo}
              </a>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate(-1)}>{fields.goBack[language]}</button>
    </section>
  );
}

import { useQuienSoy } from "../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import { components } from "./PortableText/PortableTextComponents";
import Loading from "./Loading";

export default function QuienSoy() {
  const { data, isLoading, error } = useQuienSoy();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;

  return (
    <section className="flex flex-col gap-16 pb-16">
      <div>
        <h1 className="py-8 text-center font-[Nightingale] text-2xl">
          {data.titulo[language] || data.titulo.es}
        </h1>

        {data.bio && (
          <div className="flex flex-col gap-2">
            <PortableText
              components={components}
              value={data.bio[language] || data.bio.es}
            />
          </div>
        )}
      </div>

      {data.comentarios && (
        <div>
          <h3 className="pb-4 text-center font-[Nightingale] text-base">
            Comentarios
          </h3>
          <div className="flex flex-col gap-2">
            {data.comentarios.map((comentario, index) => (
              <div key={comentario._key} className="flex flex-col gap-2">
                <PortableText
                  components={components}
                  value={comentario[language] || comentario.es}
                />
                {index !== data.comentarios.length - 1 && (
                  <div className="mx-auto">✴</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.links && (
        <ul className="flex justify-center gap-4">
          {data.links.map((link, index) => (
            <li key={link._key}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.titulo}
              </a>
              {index !== data.links.length - 1 && (
                <span className="pl-4">⧂</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

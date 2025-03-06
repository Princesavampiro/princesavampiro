import { useQuienSoy } from "../../hooks/useData";
import { PortableText } from "@portabletext/react";
import useLanguage from "../../hooks/useLanguage";
import { components } from "../PortableText/PortableTextComponents";
import Loading from "../Loading";

export default function QuienSoy() {
  const { data, isLoading, error } = useQuienSoy();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :( </div>;
  if (!data?.comentarios) return null;

  return (
    <div className="flex flex-col gap-2 p-4 pt-8">
      {data.comentarios.map((comentario, index) => (
        <div key={comentario._key} className="flex flex-col gap-2">
          <PortableText
            components={components}
            value={comentario[language] || comentario.es}
          />
          {index !== data.comentarios.length - 1 && (
            <div className="mx-auto my-4">✴</div>
          )}
        </div>
      ))}
    </div>
  );
}

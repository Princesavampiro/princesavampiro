import { useState } from "react";
import {
  useInvestigacion,
  useArticulos,
  useBlogPosts,
  useSections,
} from "../../hooks/useData";
import useLanguage from "../../hooks/useLanguage";
import Loading from "../Loading";
import { PortableText } from "@portabletext/react";
import { components } from "../PortableText/PortableTextComponents";

export default function Escrito() {
  const { data, isLoading, error } = useSections();
  const {
    data: investigacion,
    isLoading: isInvestigacionLoading,
    error: investigacionError,
  } = useInvestigacion();
  const {
    data: articulos,
    isLoading: isArticulosLoading,
    error: articulosError,
  } = useArticulos();
  const {
    data: blogPosts,
    isLoading: isBlogPostsLoading,
    error: blogPostsError,
  } = useBlogPosts();

  const { language } = useLanguage();

  const [selectedSection, setSelectedSection] = useState("investigacion");

  if (
    isLoading ||
    isInvestigacionLoading ||
    isArticulosLoading ||
    isBlogPostsLoading
  )
    return <Loading />;
  if (error || investigacionError || articulosError || blogPostsError)
    return <div>Hubo un error :( </div>;

  return (
    <section className="flex w-full flex-col items-center gap-16 p-8">
      <h3 className="z-10 text-center font-[Nightingale] text-xl">
        <span
          className={`rounded-full px-2 py-1 drop-shadow-lg ${
            selectedSection === "investigacion"
              ? "bg-white/30"
              : "cursor-pointer bg-white/15 hover:bg-white/30"
          }`}
          onClick={() => setSelectedSection("investigacion")}
        >
          {investigacion[0].titulo
            ? investigacion[0].titulo[language] || investigacion[0].titulo.es
            : "Investigación"}
        </span>
        {" / "}
        <span
          className={`rounded-full px-2 py-1 drop-shadow-lg ${
            selectedSection === "blog"
              ? "bg-white/30"
              : "cursor-pointer bg-white/15 hover:bg-white/30"
          }`}
          onClick={() => setSelectedSection("blog")}
        >
          Blog
        </span>
      </h3>

      {selectedSection === "investigacion" && (
        <div className="flex w-full flex-col items-center gap-16">
          {investigacion[0].texto && (
            <div className="flex flex-col items-center gap-4">
              <PortableText
                components={components}
                value={
                  investigacion[0].texto?.[language] ||
                  investigacion[0].texto?.es ||
                  investigacion[0].texto?.en
                }
              />
            </div>
          )}

          <div className="mx-auto">✴</div>

          {articulos &&
            articulos.map((articulo, index) => (
              <Entry
                key={articulo._id}
                arr={articulos}
                entry={articulo}
                index={index}
              />
            ))}
        </div>
      )}

      {selectedSection === "blog" && (
        <div className="flex w-full flex-col items-center gap-16">
          {blogPosts &&
            blogPosts.map((post, index) => (
              <Entry
                key={post._id}
                arr={blogPosts}
                entry={post}
                index={index}
              />
            ))}
        </div>
      )}
    </section>
  );
}

export function Entry({ arr, entry, index }) {
  const { language } = useLanguage();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="text-xs">{entry.fecha}</div>
      <h4 className="mb-6 text-xl underline">{entry.titulo.es}</h4>
      <div className="flex flex-col items-center gap-4">
        <PortableText
          components={components}
          value={entry.texto[language] || entry.texto.es}
        />
      </div>
      {index !== arr.length - 1 && <div className="mx-auto mt-16">✴</div>}
    </div>
  );
}

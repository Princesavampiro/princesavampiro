import { useState } from "react";
import { useArticulos, useBlogPosts, useSections } from "../../hooks/useData";
import useLanguage from "../../hooks/useLanguage";
import Loading from "../Loading";
import SectionInfo from "../SectionInfo";

export default function Visual() {
  const [selectedSection, setSelectedSection] = useState("investigacion");
  const { data, isLoading, error } = useSections();
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

  if (isLoading || isArticulosLoading || isBlogPostsLoading) return <Loading />;
  if (error || articulosError || blogPostsError)
    return <div>Hubo un error :( </div>;

  const escritoData = data.filter((i) => i._type === "escrito")[0];

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <SectionInfo
        title={escritoData.titulo[language] || escritoData.titulo.es}
        text={escritoData.descripcion[language] || escritoData.descripcion.es}
      />
      <h3 className="z-10 text-center font-[Nightingale] text-xl">
        <span
          className={
            selectedSection === "investigacion" ? "underline" : "cursor-pointer"
          }
          onClick={() => setSelectedSection("investigacion")}
        >
          Investigación
        </span>
        /{" "}
        <span
          className={
            selectedSection === "blog" ? "underline" : "cursor-pointer"
          }
          onClick={() => setSelectedSection("blog")}
        >
          Blog
        </span>
      </h3>
      {selectedSection === "investigacion" && (
        <div className="flex w-full flex-col items-center gap-8">
          {articulos &&
            articulos.map((articulo) => (
              <div key={articulo._id}>{articulo.titulo.es}</div>
            ))}
        </div>
      )}
      {selectedSection === "blog" && (
        <div className="flex w-full flex-col items-center gap-8">
          {blogPosts &&
            blogPosts.map((post) => <div key={post._id}>{post.titulo.es}</div>)}
        </div>
      )}
    </section>
  );
}

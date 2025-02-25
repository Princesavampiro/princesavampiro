import { useExpos, useSections } from "../../hooks/useData";
import useLanguage from "../../hooks/useLanguage";
import CardGrid from "../CardGrid";
import Loading from "../Loading";
import SectionInfo from "../SectionInfo";

export default function Visual() {
  const { data, isLoading, error } = useSections();
  const {
    data: expos,
    isLoading: isExposLoading,
    error: exposError,
  } = useExpos();

  const { language } = useLanguage();

  if (isLoading || isExposLoading) return <Loading />;
  if (error || exposError) return <div>Hubo un error :( </div>;

  const visualData = data.filter((i) => i._type === "visual")[0];

  return (
    <section className="flex w-full flex-col items-center gap-8">
      <SectionInfo
        title={visualData.titulo[language] || visualData.titulo.es}
        text={visualData.descripcion[language] || visualData.descripcion.es}
      />
      {expos && <CardGrid data={expos} contentType="expo" />}
    </section>
  );
}

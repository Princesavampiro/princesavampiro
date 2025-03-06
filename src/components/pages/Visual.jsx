import { useExpos, useSections } from "../../hooks/useData";
import useLanguage from "../../hooks/useLanguage";
import CardGrid from "../CardGrid";
import Error from "../Error";

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

  if (isLoading || isExposLoading || !expos) return;
  if (error || exposError) return <Error />;

  const visualData = data.filter((i) => i._type === "visual")[0];

  return (
    <div className="p-8">
      <CardGrid data={expos} contentType="expo" />
    </div>
  );
}

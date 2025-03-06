import { useExpos, useSections } from "../../hooks/useData";
import CardGrid from "../CardGrid";
import Error from "../Error";

export default function Visual() {
  const { isLoading, error } = useSections();
  const {
    data: expos,
    isLoading: isExposLoading,
    error: exposError,
  } = useExpos();

  if (isLoading || isExposLoading || !expos) return;
  if (error || exposError) return <Error />;

  return (
    <div className="p-8">
      <CardGrid data={expos} contentType="expo" />
    </div>
  );
}

import { NavLink, useLocation } from "react-router";
import { useItem } from "../hooks/useData";
import Loading from "./Loading";

export default function ItemContainer() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const { data, isLoading, error } = useItem(currentPath);

  if (isLoading) return <Loading />;
  if (error) return <div>Hubo un error :(</div>;

  return (
    <section className="fixed flex h-screen w-screen flex-col items-center justify-center gap-4 bg-[#0000022] backdrop-blur-sm">
      <h1>{data[0].titulo}</h1>
      <NavLink to={location.pathname.split("/")[1]}>CERRAR</NavLink>
    </section>
  );
}

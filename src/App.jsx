import { NavLink, useLocation } from "react-router";
import { useConfig, useSections } from "./hooks/useData";
import Menu from "./components/Menu";
import LanguageButton from "./components/LanguageButton";
import LoadingScreen from "./components/LoadingScreen";
import StarBackground from "./components/StarBackground";
import Player from "./components/Player/Player";
import SectionContainer from "./components/SectionContainer";

function App() {
  const { data, isLoading, error } = useSections();
  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfig();

  const location = useLocation();

  if (isLoading || isConfigLoading) return <LoadingScreen />;
  if (error || configError) return <div>Hubo un error :( </div>;

  return (
    <main className="relative flex min-h-screen flex-col">
      <StarBackground />

      <div className="fixed inset-0 animate-pulse">
        <h1 className="-rotate-1 py-4 pl-[25%] font-[Crozette] text-4xl">
          <NavLink to="/">{configData[0]?.tituloDelSitio}</NavLink>
        </h1>
      </div>

      <Menu sections={data} />

      {location.pathname !== "/" && <SectionContainer />}
      <LanguageButton />
      <Player />
    </main>
  );
}

export default App;

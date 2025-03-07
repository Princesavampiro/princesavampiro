import { NavLink, useLocation } from "react-router";
import { useConfig, useSections } from "./hooks/useData";
import Menu from "./components/Menu";
import LanguageButton from "./components/LanguageButton";
import LoadingScreen from "./components/LoadingScreen";
import StarBackground from "./components/StarBackground";
import Player from "./components/Player/Player";
import SectionContainer from "./components/SectionContainer";
import ItemContainer from "./components/ItemContainer";
import ActionBar from "./components/ActionBar";
import Help from "./components/Help";
import useIsMobile from "./hooks/useIsMobile";
import Lightbox from "./components/Lightbox";
import Error from "./components/Error";
import PixelCursor from "./components/PixelCursor";

function App() {
  const { data, isLoading, error } = useSections();
  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfig();

  const location = useLocation();
  const isMobile = useIsMobile();

  if (isLoading || isConfigLoading) return <LoadingScreen />;
  if (error || configError)
    return (
      <div className="fixed inset-0 z-100 flex h-screen w-full items-center justify-center rounded-lg bg-[#000000aa] backdrop-blur-lg">
        <Error />
      </div>
    );

  return (
    <main className="relative flex min-h-screen flex-col">
      <StarBackground />

      <div className="fixed inset-0 animate-pulse">
        <h1 className="-rotate-1 py-6 pl-4 font-[Crozette] text-3xl sm:py-4 sm:pl-8 sm:text-4xl">
          <NavLink to="/">{configData[0]?.tituloDelSitio}</NavLink>
        </h1>
      </div>

      <Menu sections={data} />

      {location.pathname !== "/" && <SectionContainer />}
      {location.pathname.split("/").length > 2 && <ItemContainer />}

      <LanguageButton />
      {!isMobile && <Player />}
      {location.pathname !== "/" && <ActionBar />}
      {location.pathname === "/" && !isMobile && <Help />}
      <Lightbox />
      {!isMobile && <PixelCursor />}
    </main>
  );
}

export default App;

import { Routes, Route, NavLink, useLocation } from "react-router";
import { useConfig, useSections } from "./hooks/useData";
import Menu from "./components/Menu";
import Home from "./components/pages/Home";
import Visceral from "./components/pages/Visceral";
import Sonoro from "./components/pages/Sonoro";
import Visual from "./components/pages/Visual";
import Escrito from "./components/pages/Escrito";
import QuienSoy from "./components/pages/QuienSoy";
import LanguageButton from "./components/LanguageButton";
import LoadingScreen from "./components/LoadingScreen";
import StarBackground from "./components/StarBackground";
import Release from "./components/Release";
import Live from "./components/Live";
import Exposicion from "./components/Exposicion";

function App() {
  const { data, isLoading, error } = useSections();
  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfig();
  const location = useLocation();

  const selectSection = (section) => {
    switch (section._type) {
      case "visceral":
        return <Visceral />;
      case "sonoro":
        return <Sonoro />;
      case "visual":
        return <Visual />;
      case "escrito":
        return <Escrito />;
      case "quienSoy":
        return <QuienSoy />;
      default:
        return <Home />;
    }
  };

  if (isLoading || isConfigLoading) return <LoadingScreen />;
  if (error || configError) return <div>Hubo un error :( </div>;

  return (
    <main className="flex min-h-screen flex-col">
      <StarBackground />
      <div className="animate-pulse">
        <h1 className="-rotate-1 py-4 pl-[25%] font-[Crozette] text-4xl">
          <NavLink to="/">{configData[0]?.tituloDelSitio}</NavLink>
        </h1>
      </div>

      {location.pathname !== "/" && <Menu sections={data} />}

      <Routes>
        <Route path="/" element={<Home sections={data} />} />
        {data.flatMap((section) => {
          const routes = [
            <Route
              key={section._id}
              path={section.slug.current}
              element={selectSection(section)}
            >
              {section._type === "sonoro" && (
                <Route
                  key={`${section._id}-detail`}
                  path={`release/:slug`}
                  element={<Release />}
                />
              )}
              {section._type === "sonoro" && (
                <Route
                  key={`${section._id}-detail`}
                  path={`live/:slug`}
                  element={<Live />}
                />
              )}
              {section._type === "visual" && (
                <Route
                  key={`${section._id}-detail`}
                  path={`expo/:slug`}
                  element={<Exposicion />}
                />
              )}
            </Route>,
          ];
          return routes;
        })}
      </Routes>
      <LanguageButton />
    </main>
  );
}

export default App;

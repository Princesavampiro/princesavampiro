import { Routes, Route, NavLink } from "react-router";
import { useConfig, useSections } from "./hooks/useData";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Visceral from "./components/Visceral";
import Sonoro from "./components/Sonoro";
import Visual from "./components/Visual";
import Escrito from "./components/Escrito";
import QuienSoy from "./components/QuienSoy";
import LanguageButton from "./components/LanguageButton";
import LoadingScreen from "./components/LoadingScreen";
import StarBackground from "./components/StarBackground";

function App() {
  const { data, isLoading, error } = useSections();
  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfig();

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
    <main className="pb-32">
      <StarBackground />
      <div className="animate-pulse">
        <h1 className="-rotate-1 py-4 pl-[25%] font-[Crozette] text-4xl">
          <NavLink to="/">{configData[0]?.tituloDelSitio}</NavLink>
        </h1>
      </div>

      <Menu sections={data} />

      <Routes>
        <Route path="/" element={<Home />} />
        {data.map((section) => (
          <Route
            key={section._id}
            path={section.slug.current}
            element={selectSection(section)}
          />
        ))}
      </Routes>
      <LanguageButton />
    </main>
  );
}

export default App;

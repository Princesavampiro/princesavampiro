import { Routes, Route, NavLink } from "react-router";
import { motion } from "motion/react";
import { useSections } from "./hooks/useData";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Visceral from "./components/Visceral";
import Sonoro from "./components/Sonoro";
import Visual from "./components/Visual";
import Escrito from "./components/Escrito";
import QuienSoy from "./components/QuienSoy";

function App() {
  const { data, isLoading, error } = useSections();

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

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error al cargar la data</div>;

  return (
    <>
      <motion.div drag className="animate-pulse cursor-grab">
        <h1>
          <NavLink to="/">
            ☆*: .｡. o(≧▽≦)o .｡.:*☆pr1nc3s4-v4mp1r0(*/ω＼*)
          </NavLink>
        </h1>
      </motion.div>

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
    </>
  );
}

export default App;

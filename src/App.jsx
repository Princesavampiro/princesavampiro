import { motion } from "motion/react";
import { useSections } from "./hooks/useData";

function App() {
  const { data, isLoading, error } = useSections();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error al cargar los programas</div>;

  console.log(data);
  return (
    <>
      <motion.div drag className="animate-pulse cursor-grab">
        ☆*: .｡. o(≧▽≦)o .｡.:*☆pr1nc3s4-v4mp1r0(*/ω＼*)
        {data.map((section) => (
          <div key={section._id}>{section.titulo.es}</div>
        ))}
      </motion.div>
    </>
  );
}

export default App;

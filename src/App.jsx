import { motion } from "motion/react";
import { useSections } from "./hooks/useData";

function App() {
  const { data, isLoading, error } = useSections();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Hubo un error al cargar la data</div>;

  const sectionOrder = ["visceral", "sonoro", "visual", "escrito", "quienSoy"];

  console.log(data);
  return (
    <>
      <motion.div drag className="animate-pulse cursor-grab">
        ☆*: .｡. o(≧▽≦)o .｡.:*☆pr1nc3s4-v4mp1r0(*/ω＼*)
        {data
          .sort((a, b) => {
            return (
              sectionOrder.indexOf(a._type) - sectionOrder.indexOf(b._type)
            );
          })
          .map((section) => (
            <div key={section._id}>{section.titulo.es}</div>
          ))}
      </motion.div>
    </>
  );
}

export default App;

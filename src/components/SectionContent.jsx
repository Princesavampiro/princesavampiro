import { useCurrentSection } from "../hooks/useCurrentSection";
import useLanguage from "../hooks/useLanguage";
import DraggableWindow from "./DraggableWindow";
import Escrito from "./pages/Escrito";
import Sonoro from "./pages/Sonoro";
import Visual from "./pages/Visual";
import QuienSoy from "./pages/QuienSoy";

export default function SectionContent() {
  const { currentSection, error, isLoading } = useCurrentSection();
  const { language } = useLanguage();

  const quienSoyTitle = language === "es" ? "Comentarios" : "Comments";

  if (isLoading) return null;
  if (error) return <div>Hubo un error :( </div>;
  if (!currentSection || currentSection._type === "visceral") return null;

  return (
    <DraggableWindow
      title={currentSection?._type === "quienSoy" ? quienSoyTitle : "✴"}
      className={"max-h-[60vh] w-full"}
    >
      {currentSection?._type === "escrito" && <Escrito />}
      {currentSection?._type === "visual" && <Visual />}
      {currentSection?._type === "sonoro" && <Sonoro />}
      {currentSection?._type === "quienSoy" && <QuienSoy />}
    </DraggableWindow>
  );
}

import { useCurrentSection } from "../hooks/useCurrentSection";
import useLanguage from "../hooks/useLanguage";
import DraggableWindow from "./DraggableWindow";
import Escrito from "./pages/Escrito";
import Sonoro from "./pages/Sonoro";
import Visual from "./pages/Visual";

export default function SectionContent() {
  const { currentSection, error, isLoading } = useCurrentSection();
  const { language } = useLanguage();

  if (isLoading) return null;
  if (error) return <div>Hubo un error :( </div>;
  if (
    !currentSection ||
    currentSection._type === "visceral" ||
    currentSection._type === "quienSoy"
  )
    return null;

  return (
    <DraggableWindow title="✴" className={"max-h-[60vh] w-full"}>
      {currentSection?._type === "escrito" && <Escrito />}
      {currentSection?._type === "visual" && <Visual />}
      {currentSection?._type === "sonoro" && <Sonoro />}
    </DraggableWindow>
  );
}

import { useCurrentSection } from "../hooks/useCurrentSection";
import DraggableWindow from "./DraggableWindow";

export default function SectionImage() {
  const { currentSection, error, isLoading } = useCurrentSection();
  const image = currentSection?.imagen;
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (isLoading) return null;
  if (error) return <div>Hubo un error :( </div>;
  if (!currentSection || !image) return null;

  return (
    <DraggableWindow className={"h-min w-[350px]"}>
      <img src={image?.url + size.small} />
    </DraggableWindow>
  );
}

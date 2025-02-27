import DraggableWindow from "./DraggableWindow";

export default function SectionImage({ image }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (!image) return null;

  return (
    <DraggableWindow title="✴" className={"h-min w-[350px]"}>
      <img src={image?.url + size.small} />
    </DraggableWindow>
  );
}

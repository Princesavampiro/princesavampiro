import DraggableWindow from "./DraggableWindow";

export default function SectionImage({ image, alt }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (!image) return null;

  return (
    <DraggableWindow
      title="✴"
      className={"fixed bottom-32 left-1/3 h-min w-[350px]"}
    >
      <img src={image?.url + size.small} alt={alt ?? ""} />
    </DraggableWindow>
  );
}

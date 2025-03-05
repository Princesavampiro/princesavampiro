import DraggableWindow from "./DraggableWindow";

export default function SectionImage({ image, alt, className }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (!image) return null;

  return (
    <DraggableWindow title="✴" className={`h-min w-[350px] ${className}`}>
      <img
        src={image?.url + size.small}
        alt={alt ?? ""}
        className="h-full w-full"
      />
    </DraggableWindow>
  );
}

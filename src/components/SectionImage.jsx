import DraggableWindow from "./DraggableWindow";
import useLightbox from "../hooks/useLightbox";

export default function SectionImage({ image, alt, className }) {
  const { setLightboxImage, setLightboxOpen } = useLightbox();

  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  if (!image) return null;

  return (
    <DraggableWindow
      title={<img src="/img/star.svg" alt="star" className="w-4 invert" />}
      className={`h-min sm:w-[350px] ${className}`}
    >
      <div className="p-4">
        <img
          src={image?.url + size.small}
          alt={alt ?? ""}
          className="h-full w-full cursor-zoom-in rounded-md"
          onClick={() => {
            setLightboxImage(image);
            setLightboxOpen(true);
          }}
        />
      </div>
    </DraggableWindow>
  );
}

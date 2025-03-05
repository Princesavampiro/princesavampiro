import useLightbox from "../hooks/useLightbox";

export default function Lightbox() {
  const { lightboxImage, setLightboxOpen, lightboxOpen } = useLightbox();

  if (!lightboxImage || !lightboxOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex h-screen w-screen cursor-zoom-out justify-center bg-[#00000022] backdrop-blur-sm"
      onClick={() => setLightboxOpen(false)}
    >
      <img
        src={lightboxImage.url + "?h=1080&fm=webp"}
        className="h-full w-auto invert saturate-200 sm:invert-0 sm:saturate-100"
      />
    </div>
  );
}

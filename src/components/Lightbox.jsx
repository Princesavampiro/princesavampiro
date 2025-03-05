import useLightbox from "../hooks/useLightbox";
import useIsMobile from "../hooks/useIsMobile";

export default function Lightbox() {
  const { lightboxImage, setLightboxOpen, lightboxOpen } = useLightbox();
  const isMobile = useIsMobile();

  if (!lightboxImage || !lightboxOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex h-screen w-screen cursor-zoom-out items-center justify-center bg-[#00000022] backdrop-blur-sm"
      onClick={() => setLightboxOpen(false)}
    >
      {!isMobile ? (
        <div>
          <img
            src={lightboxImage.url + "?h=1080&fm=webp"}
            className="invert saturate-200 sm:invert-0 sm:saturate-100"
          />
        </div>
      ) : (
        <img
          src={lightboxImage.url + "?h=1080&fm=webp"}
          className="h-full w-full invert saturate-200 sm:invert-0 sm:saturate-100"
        />
      )}
    </div>
  );
}

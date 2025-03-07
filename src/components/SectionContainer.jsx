import { useLocation } from "react-router";
import useLanguage from "../hooks/useLanguage";
import { useConfig, useQuienSoy } from "../hooks/useData";
import { useCurrentSection } from "../hooks/useCurrentSection";
import useIsMobile from "../hooks/useIsMobile";

import SectionInfo from "../components/SectionInfo";
import SectionContent from "../components/SectionContent";
import SectionTitle from "../components/SectionTitle";
import SectionLinks from "../components/SectionLinks";
import SectionImage from "../components/SectionImage";
import Loading from "./Loading";
import LoadToPlayerButton from "./LoadToPlayerButton";
import WebCredits from "./WebCredits";

import Escrito from "./pages/Escrito";
import Sonoro from "./pages/Sonoro";
import Visual from "./pages/Visual";
import QuienSoy from "./pages/QuienSoy";
import EmbedRenderer from "./EmbedRenderer";

export default function SectionContainer() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentSection, error, isLoading } = useCurrentSection();
  const {
    data: quienSoy,
    isLoading: isQuienSoyLoading,
    error: quienSoyError,
  } = useQuienSoy();
  const { language } = useLanguage();

  const {
    data: configData,
    isLoading: isConfigLoading,
    error: configError,
  } = useConfig();

  const sectionTitle =
    currentSection?.titulo[language] || currentSection?.titulo.es;

  const text = currentSection?.texto?.[language] || currentSection?.texto?.es;

  const contact = {
    email: currentSection?.contacto?.email,
    message:
      currentSection?.contacto?.mensaje?.[language] ||
      currentSection?.contacto?.mensaje?.es,
  };

  const content =
    currentSection?._type === "escrito" ? (
      <Escrito />
    ) : currentSection?._type === "visual" ? (
      <Visual />
    ) : currentSection?._type === "sonoro" ? (
      <Sonoro />
    ) : currentSection?._type === "quienSoy" ? (
      <QuienSoy />
    ) : null;

  if (isLoading || isConfigLoading || isQuienSoyLoading)
    return (
      <div className="flex h-screen w-full justify-center">
        <Loading />
      </div>
    );
  if (error || configError || !currentSection || quienSoyError) return null;

  return (
    <div
      className={`h-full overflow-hidden bg-[#000000aa] pb-24 backdrop-blur-xl sm:bg-transparent sm:pb-0 sm:backdrop-blur-none ${location.pathname.split("/").length > 2 ? "max-h-screen" : "min-h-screen"}`}
    >
      {location.pathname === "/visceral" && (
        <SectionTitle
          title="Visceral"
          className={`sm:fixed sm:top-1/3 sm:right-1/8`}
        />
      )}

      {currentSection.texto && (
        <SectionInfo
          windowTitle={
            configData[0]?.tituloDelSitio.replace(" ", "_") +
            "/" +
            location.pathname.split("/")[1]
          }
          sectionTitle={sectionTitle}
          text={text}
          contact={contact}
          className={`sm:fixed sm:top-1/8 sm:left-16`}
        />
      )}

      {currentSection &&
        currentSection._type !== "visceral" &&
        currentSection._type !== "quienSoy" && (
          <SectionContent className={`w-full sm:fixed sm:top-1/5 sm:right-16`}>
            {content}
          </SectionContent>
        )}

      {currentSection &&
        currentSection._type === "quienSoy" &&
        quienSoy?.comentarios?.length > 0 && (
          <SectionContent
            windowTitle={quienSoy?.tituloComentarios?.[language]}
            className={`w-full sm:fixed sm:top-1/5 sm:right-16`}
          >
            {content}
          </SectionContent>
        )}

      {currentSection.links && (
        <SectionLinks
          links={currentSection.links}
          className={`sm:fixed sm:right-1/8 sm:bottom-1/16`}
        />
      )}

      <div className="text-center sm:hidden">✴</div>

      {currentSection.imagen && (
        <SectionImage
          image={currentSection.imagen}
          className={`sm:fixed sm:bottom-32 sm:left-1/3`}
        />
      )}

      {currentSection &&
        currentSection.embed &&
        (isMobile ? (
          <EmbedRenderer value={currentSection.embed} />
        ) : (
          <LoadToPlayerButton
            data={currentSection.embed}
            className="max-w-content fixed bottom-1/8 left-1/4 h-max hover:z-50 active:z-50"
          />
        ))}

      {currentSection && currentSection._type === "quienSoy" && (
        <>
          <div className="pt-4 text-center sm:hidden">❦</div>
          <WebCredits key={"webCredits"} />
        </>
      )}
    </div>
  );
}

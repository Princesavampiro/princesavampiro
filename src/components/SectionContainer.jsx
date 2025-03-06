import { useLocation } from "react-router";
import useLanguage from "../hooks/useLanguage";
import { useConfig, useQuienSoy } from "../hooks/useData";
import { useCurrentSection } from "../hooks/useCurrentSection";
import SectionInfo from "../components/SectionInfo";
import SectionContent from "../components/SectionContent";
import SectionTitle from "../components/SectionTitle";
import HomeButton from "../components/HomeButton";
import SectionLinks from "../components/SectionLinks";
import SectionImage from "../components/SectionImage";
import Escrito from "./pages/Escrito";
import Sonoro from "./pages/Sonoro";
import Visual from "./pages/Visual";
import QuienSoy from "./pages/QuienSoy";
import Loading from "./Loading";
import LoadToPlayerButton from "./LoadToPlayerButton";
import useIsMobile from "../hooks/useIsMobile";
import WebCredits from "./WebCredits";

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

  const contentTitle =
    currentSection?._type === "quienSoy"
      ? language === "es"
        ? "Comentarios"
        : "Comments"
      : null;

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

  if (isLoading || isConfigLoading || isQuienSoyLoading) return <Loading />;
  if (error || configError || !currentSection || quienSoyError) return null;

  return (
    <div className="h-full min-h-screen overflow-hidden">
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

      {currentSection && currentSection.embed && !isMobile && (
        <LoadToPlayerButton
          data={currentSection.embed}
          className="max-w-content fixed bottom-1/8 left-1/4 h-max rounded-full"
        />
      )}

      {currentSection &&
        currentSection._type !== "visceral" &&
        currentSection._type !== "quienSoy" && (
          <SectionContent
            windowTitle={contentTitle}
            className={`w-full sm:fixed sm:top-1/5 sm:right-16`}
          >
            {content}
          </SectionContent>
        )}
      {currentSection &&
        currentSection._type === "quienSoy" &&
        quienSoy?.comentarios?.length > 0 && (
          <SectionContent
            windowTitle={contentTitle}
            className={`w-full sm:fixed sm:top-1/5 sm:right-16`}
          >
            {content}
          </SectionContent>
        )}

      {currentSection && currentSection._type === "quienSoy" && <WebCredits />}
      <SectionLinks
        links={currentSection.links}
        className={`sm:fixed sm:right-1/8 sm:bottom-1/16`}
      />
      <SectionImage
        image={currentSection.imagen}
        className={`sm:fixed sm:bottom-32 sm:left-1/3`}
      />
    </div>
  );
}

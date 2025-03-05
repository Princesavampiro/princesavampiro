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

export default function SectionContainer() {
  const location = useLocation();
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

  const text = currentSection?.texto?.[language] || currentSection?.texto.es;

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
      {location.pathname === "/visceral" && <SectionTitle title="Visceral" />}

      <SectionInfo
        windowTitle={
          configData[0]?.tituloDelSitio.replace(" ", "_") +
          "/" +
          location.pathname.split("/")[1]
        }
        sectionTitle={sectionTitle}
        text={text}
      />

      {currentSection && currentSection.embed && (
        <LoadToPlayerButton
          data={currentSection.embed}
          className="max-w-content fixed bottom-1/8 left-1/4 h-max rounded-full"
        />
      )}

      {currentSection &&
        currentSection._type !== "visceral" &&
        currentSection._type !== "quienSoy" && (
          <SectionContent windowTitle={contentTitle}>{content}</SectionContent>
        )}
      {currentSection &&
        currentSection._type === "quienSoy" &&
        quienSoy?.comentarios?.length > 0 && (
          <SectionContent windowTitle={contentTitle}>{content}</SectionContent>
        )}
      <SectionLinks links={currentSection.links} />
      <SectionImage image={currentSection.imagen} />
      <HomeButton />
    </div>
  );
}

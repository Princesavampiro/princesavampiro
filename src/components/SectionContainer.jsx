import { useLocation } from "react-router";
import useLanguage from "../hooks/useLanguage";
import { useConfig } from "../hooks/useData";
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

export default function SectionContainer() {
  const location = useLocation();
  const { currentSection, error, isLoading } = useCurrentSection();
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

  if (isLoading || isConfigLoading) return <Loading />;
  if (error || configError || !currentSection) return null;

  return (
    <div className="grid h-full min-h-screen grid-cols-2 place-items-center gap-8 p-16">
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

      {currentSection && currentSection._type !== "visceral" && (
        <SectionContent windowTitle={contentTitle}>{content}</SectionContent>
      )}
      <SectionLinks links={currentSection.links} />
      <SectionImage image={currentSection.imagen} />
      <HomeButton />
    </div>
  );
}

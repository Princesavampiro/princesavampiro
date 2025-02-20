import useLanguage from "../hooks/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="fixed top-0 right-0 cursor-pointer"
    >
      {language == "es" ? "English" : "Español"}
    </div>
  );
}

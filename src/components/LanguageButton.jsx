import useLanguage from "../hooks/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="fixed top-8 right-4 flex cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/10 p-3 text-xs backdrop-blur-md select-none hover:bg-white/30 hover:brightness-120 sm:right-8"
    >
      {language == "es" ? "EN" : "ES"}
    </div>
  );
}

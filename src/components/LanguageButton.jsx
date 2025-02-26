import useLanguage from "../hooks/useLanguage";

export default function LanguageButton() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="fixed top-8 right-8 flex h-6 w-12 cursor-pointer items-center justify-center rounded-[50%] bg-[#d7d7d7] text-sm text-black select-none hover:brightness-120"
    >
      {language == "es" ? "EN" : "ES"}
    </div>
  );
}

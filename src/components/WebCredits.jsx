import useLanguage from "../hooks/useLanguage";

export default function WebCredits() {
  const { language } = useLanguage();
  return (
    <div className="right-8 bottom-8 flex w-full justify-center gap-2 py-4 text-sm sm:fixed sm:w-auto">
      <div>
        {language === "es"
          ? "diseño y desarrollo web:"
          : "web design and development:"}
      </div>
      <div>
        <a
          href="https://astrosuka.xyz"
          target="_blank"
          className="animate-pulse hover:animate-none hover:underline"
        >
          Astrosuka
        </a>{" "}
        +{" "}
        <a
          href="https://sofja.dev"
          target="_blank"
          className="animate-pulse hover:animate-none hover:underline"
        >
          Sofja
        </a>
      </div>
    </div>
  );
}

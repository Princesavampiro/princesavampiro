export default function ThemeToggle({ themes, currentTheme, setCurrentTheme }) {
  return (
    <button
      onClick={() =>
        setCurrentTheme(
          themes[(themes.indexOf(currentTheme) + 1) % themes.length],
        )
      }
      className="fixed top-20 right-4 z-70 flex size-5 cursor-pointer items-center justify-center rounded-full border border-white/30 text-xs backdrop-blur-md select-none hover:animate-spin hover:border-0 hover:bg-white/30 hover:bg-conic/decreasing hover:from-violet-700 hover:via-lime-300 hover:to-violet-700 hover:brightness-120 sm:right-4"
    />
  );
}

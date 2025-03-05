import { NavLink, useNavigate } from "react-router";

export default function ActionBar() {
  const navigate = useNavigate();
  const historyIndex = window.history.state?.idx;

  const handleBack = () => {
    if (historyIndex > 0) {
      navigate(-1);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-100 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full border border-white/30 bg-black/5 p-3 text-4xl backdrop-blur-md">
      <NavLink
        onClick={handleBack}
        aria-label="Back"
        className={`flex size-12 items-center justify-center rounded-full pt-1 text-center font-[Crozette] leading-none ${!historyIndex || historyIndex === 0 ? "cursor-default opacity-40" : "cursor-pointer hover:bg-white/20"}`}
      >
        {`<--`}
      </NavLink>
      <NavLink
        to="/"
        aria-label="Home"
        className="flex size-12 cursor-pointer items-center justify-center rounded-full pt-1 pl-0.5 text-center font-[Crozette] leading-none hover:bg-white/20"
      >
        X
      </NavLink>
    </div>
  );
}

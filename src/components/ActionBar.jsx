import { NavLink, useLocation } from "react-router";

export default function ActionBar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-1/2 z-100 flex -translate-x-1/2 items-center justify-center gap-4 rounded-full border border-white/30 bg-black/30 p-3 text-4xl backdrop-blur-md sm:bg-black/5">
      <NavLink
        to={
          location.pathname.split("/").length > 2
            ? "../" + location.pathname.split("/")[1]
            : "/"
        }
        aria-label="Home"
        className="flex size-12 cursor-pointer items-center justify-center rounded-full pt-1 pl-0.5 text-center font-[Crozette] leading-none hover:bg-white/20"
      >
        X
      </NavLink>
    </div>
  );
}

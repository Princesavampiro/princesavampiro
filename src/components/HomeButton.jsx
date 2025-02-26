import { NavLink } from "react-router";

export default function HomeButton() {
  return (
    <div className="fixed bottom-4 flex w-full justify-center">
      <NavLink to="/">
        <div className="font-[Crozette] text-4xl">X</div>
      </NavLink>
    </div>
  );
}

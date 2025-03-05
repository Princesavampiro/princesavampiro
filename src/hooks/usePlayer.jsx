import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export default function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within an PlayerProvider");
  }
  return context;
}

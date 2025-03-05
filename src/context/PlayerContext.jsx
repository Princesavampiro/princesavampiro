import { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [currentEmbed, setCurrentEmbed] = useState(null);
  return (
    <PlayerContext.Provider value={{ currentEmbed, setCurrentEmbed }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };

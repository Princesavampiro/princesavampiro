import { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [currentEmbed, setCurrentEmbed] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <PlayerContext.Provider
      value={{ currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };

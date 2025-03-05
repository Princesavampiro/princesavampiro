import { createContext, useState } from "react";

const LightboxContext = createContext();

const LightboxProvider = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  return (
    <LightboxContext.Provider
      value={{ lightboxImage, setLightboxImage, lightboxOpen, setLightboxOpen }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export { LightboxContext, LightboxProvider };

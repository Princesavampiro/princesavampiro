import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { PlayerProvider } from "./context/PlayerContext.jsx";
import { LightboxProvider } from "./context/LightboxContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 35,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <PlayerProvider>
            <LightboxProvider>
              <App />
            </LightboxProvider>
          </PlayerProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MapProvider } from "./components/Directions/Maps/MapContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MapProvider>
        <App />
      </MapProvider>
    </BrowserRouter>
  </StrictMode>
);

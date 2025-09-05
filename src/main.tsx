import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AluguelProvider } from "../backend/src/context/AluguelContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AluguelProvider>
    <App />
  </AluguelProvider>
);

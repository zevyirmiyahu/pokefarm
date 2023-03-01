import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./routes/providers/AuthProvider";
import { PokemonProvider } from "./routes/providers/PokemonProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </AuthProvider>
  </React.StrictMode>
);

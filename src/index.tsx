import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import './theme.css'

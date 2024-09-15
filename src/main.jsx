import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./services/apliSlice.js";

createRoot(document.getElementById("root")).render(
  <ApiProvider api={api}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);

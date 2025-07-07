import AppRoutes from "./Routes/AppRoutes";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./Store/Store";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);

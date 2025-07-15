import AppRoutes from "./Routes/AppRoutes";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./Store/Store";
import { CssVarsProvider } from "@mui/joy/styles";
import theme from "./Component/Shared/theme";
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/joy";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <Provider store={store}>
      <CssVarsProvider theme={theme} modeStorageKey="my-app-color-scheme">
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <AppRoutes />
        </I18nextProvider>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);

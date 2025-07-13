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
import GlobalCss from "./Component/Shared/GlobalCss";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <GlobalCss />
          <AppRoutes />
        </I18nextProvider>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);

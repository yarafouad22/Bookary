import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#FF4081",
          solidHoverBg: "#e91e63",
          solidActiveBg: "#c2185b",
        },
        background: {
          body: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#c2185b",
          solidHoverBg: "#ad1457",
          solidActiveBg: "#880e4f",
        },
        background: {
          body: "#424242",
        },
      },
    },
  },
});

export default theme;

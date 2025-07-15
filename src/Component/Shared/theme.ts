import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#FF4081",
        },
        background: {
          body: "#ffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#880e4f",
        },
        background: {
          body: "#555",
        },
      },
    },
  },
});

export default theme;

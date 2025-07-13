import { GlobalStyles } from "@mui/system";
import { useTheme } from "@mui/joy/styles";

export default function GlobalCss() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        body: {
          backgroundColor: theme.palette.background.body,
          color: theme.palette.text.primary,
          transition: "background-color 0.3s ease, color 0.3s ease",
        },
      }}
    />
  );
}

import { IconButton } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      color="primary"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

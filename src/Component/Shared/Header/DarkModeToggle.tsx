import { IconButton } from "@mui/joy";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const mode = "dark-mode";
    if (isDark) {
      document.body.classList.add(mode);
    } else {
      document.body.classList.remove(mode);
    }
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  return (
    <IconButton variant="plain" color="neutral" onClick={toggleDarkMode}>
      {isDark ? (
        <LightModeIcon sx={{ color: "orange" }} />
      ) : (
        <DarkModeIcon sx={{ color: "black" }} />
      )}
    </IconButton>
  );
}

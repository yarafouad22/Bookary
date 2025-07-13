import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const menuItems = [
    { lang: "en", label: "English", emoji: "🇬🇧" },
    { lang: "ar", label: "العربية", emoji: "🇸🇦" },
    { lang: "de", label: "Deutsch", emoji: "🇩🇪" },
  ];

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        startDecorator={<LanguageIcon />}
        sx={{
          borderRadius: 20,
          fontWeight: "bold",
          textTransform: "uppercase",
          bgcolor: "#FF4081",
          color: "#fff",
          "&:hover": {
            bgcolor: "#e91e63",
          },
          px: 2,
          py: 1,
        }}
      >
        {i18n.language.toUpperCase()}
      </MenuButton>
      <Menu
        sx={{
          minWidth: 180,
          p: 1,
          borderRadius: 2,
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.lang}
            onClick={() => handleChange(item.lang)}
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              color: "#333",
              "&:hover": {
                bgcolor: "#FFEEF3",
                color: "#FF4081",
              },
            }}
          >
            <span>{item.label}</span>
            <span style={{ fontSize: "18px" }}>{item.emoji}</span>
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}

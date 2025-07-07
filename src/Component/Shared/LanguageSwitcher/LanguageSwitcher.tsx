import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="neutral"
        startDecorator={<LanguageIcon />}
      >
        {i18n.language.toUpperCase()}
      </MenuButton>
      <Menu>
        <MenuItem onClick={() => handleChange("en")}>🇬🇧 English</MenuItem>
        <MenuItem onClick={() => handleChange("ar")}>🇸🇦 العربية</MenuItem>
        <MenuItem onClick={() => handleChange("de")}>🇩🇪 Deutsch</MenuItem>
      </Menu>
    </Dropdown>
  );
}

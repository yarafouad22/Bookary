import { Box, Sheet } from "@mui/joy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import HeaderBasket from "../../e-commerce/HeaderBasket/HeaderBasket";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Sheet
      variant="solid"
      color="primary"
      sx={{
        py: 2,
        px: 3,
        boxShadow: "sm",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 0,
      }}
    >
      <Box
        onClick={() => navigate("/")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: "md",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <MenuBookIcon sx={{ fontSize: 28 }} />
        Bookary
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <LanguageSwitcher />
        <HeaderBasket />
        <DarkModeToggle />
      </Box>
    </Sheet>
  );
};

export default Header;

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeaderBasket from "../../e-commerce/HeaderBasket/HeaderBasket";
import "../global.scss";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#9e9e9e",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: "#ddd",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              color: "#333",
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Bookary
          </Box>
        </Typography>

        <LanguageSwitcher />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <HeaderBasket />
          <DarkModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

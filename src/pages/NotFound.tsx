import { Button, Typography, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography
        level="h1"
        sx={{ fontSize: { xs: "4rem", md: "6rem" }, color: "primary.solidBg" }}
      >
        404
      </Typography>

      <Typography level="h3" sx={{ mb: 2 }}>
        page not found
      </Typography>

      <Button color="primary" size="lg" onClick={() => navigate("/")}>
        العودة إلى الصفحة الرئيسية
      </Button>
    </Box>
  );
}

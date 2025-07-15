import { Typography, Button, Box, Grid } from "@mui/joy";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.vars.palette.primary.softBg
            : theme.vars.palette.background.level1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      })}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 8,
        }}
      >
        <Grid
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <Box
              sx={(theme) => ({
                width: { xs: 60, sm: 100, md: 120 },
                height: { xs: 120, sm: 180, md: 220 },
                backgroundColor: theme.vars.palette.primary.solidBg,
                borderRadius: "4px",
                boxShadow: theme.shadow.lg,
              })}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: 10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Box
              sx={(theme) => ({
                width: { xs: 60, sm: 100, md: 120 },
                height: { xs: 120, sm: 180, md: 220 },
                backgroundColor: theme.vars.palette.primary.solidHoverBg,
                borderRadius: "4px",
                boxShadow: theme.shadow.lg,
              })}
            />
          </motion.div>
        </Grid>

        <Grid xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              level="h1"
              sx={(theme) => ({
                color: theme.vars.palette.text.primary,
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "2rem", md: "3rem" },
              })}
            >
              {t("Welcome to Our Book Store")}
            </Typography>

            <Typography
              level="h3"
              sx={(theme) => ({
                color: theme.vars.palette.text.secondary,
                mt: 2,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              })}
            >
              {t("Find your next favorite book here")}!
            </Typography>

            <Button
              onClick={handleShopNow}
              variant="solid"
              color="primary"
              size="lg"
              sx={{
                mt: 4,
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              {t("Shop Now")}
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

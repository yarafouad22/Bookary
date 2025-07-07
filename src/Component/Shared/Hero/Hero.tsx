import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.scss";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className={styles.hero}>
      <Typography variant="h2" className={styles["hero-title"]}>
        {t(" Welcome to Our Book Store")}
      </Typography>
      <Typography variant="h5" className={styles["hero-subtitle"]}>
        {t("Find your next favorite book here")}!
      </Typography>
      <Button
        variant="contained"
        size="large"
        className={styles["hero-button"]}
        onClick={handleShopNow}
      >
        {t("Shop Now")}
      </Button>
    </div>
  );
}

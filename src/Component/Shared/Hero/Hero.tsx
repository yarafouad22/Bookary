import { Typography, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleShopNow = () => {
    navigate("/products");
  };

  const books = [
    {
      src: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
      top: "20%",
      left: "45%",
      size: 130,
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
      top: "50%",
      left: "60%",
      size: 100,
    },
  ];

  return (
    <motion.div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1512820790803-83ca734da794")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        marginTop: "0",
        paddingTop: 0,
      }}
    >
      <motion.div
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        style={{
          background: "linear-gradient(135deg, #667eea, #FF4081)",
          height: "100vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundColor: "#000",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
            />
          )}
        </AnimatePresence>

        {books.map((book, index) => (
          <motion.img
            key={index}
            src={book.src}
            alt="Book"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, delay: index * 0.3 }}
            style={{
              position: "absolute",
              top: book.top,
              left: book.left,
              width: book.size,
              height: book.size,
              zIndex: 1,
              pointerEvents: "none",
              opacity: 1,
            }}
          />
        ))}

        <motion.div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <Typography
              level="h1"
              sx={{
                color: "#fff",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
              }}
            >
              {t("Welcome to Our Book Store")}
            </Typography>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <Typography
              level="h3"
              sx={{
                color: "#e0e0e0",
                mt: 2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {t("Find your next favorite book here")}!
            </Typography>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{ marginTop: "2rem" }}
          >
            <Button
              variant="solid"
              size="lg"
              color="primary"
              onClick={handleShopNow}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "30px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                backgroundColor: "#FF4081",
                "&:hover": {
                  backgroundColor: "#e91e63",
                },
              }}
            >
              {t("Shop Now")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

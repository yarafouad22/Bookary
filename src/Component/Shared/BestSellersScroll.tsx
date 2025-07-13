import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import type { Book } from "../../Services/books";
import { t } from "i18next";

interface BestSellersScrollProps {
  bestSellers: Book[];
}

export default function BestSellersScroll({
  bestSellers,
}: BestSellersScrollProps) {
  return (
    <Box
      sx={{
        mt: 8,
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#333",
          textAlign: "center",
          mb: 4,
        }}
      >
        {t("Best Sellers")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: 3,
          py: 2,
          pb: 4,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#FF4081",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
        }}
      >
        {bestSellers.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            style={{
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              flex: "0 0 250px",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <img
              src={book.image_url || "/placeholder-book.jpg"}
              alt={book.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-book.jpg";
              }}
            />
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "14px",
                  mb: 1,
                }}
              >
                {book.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#FF4081", fontWeight: "bold", fontSize: "14px" }}
              >
                ${book.price?.toFixed(2) || "0.00"}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

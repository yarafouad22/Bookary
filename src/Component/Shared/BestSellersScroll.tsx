import { motion } from "framer-motion";
import { Box, Typography } from "@mui/joy";
import type { Book } from "../../Services/books";
import { useTheme } from "@mui/joy/styles";
import { t } from "i18next";

interface BestSellersScrollProps {
  bestSellers: Book[];
}

export default function BestSellersScroll({
  bestSellers,
}: BestSellersScrollProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          pl: { xs: 0, md: 8 },
          mb: 4,
        }}
      >
        <Typography
          level="h3"
          sx={{
            color: theme.vars.palette.text.primary,
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {t("Bestselling books")}
        </Typography>

        <Box
          sx={{
            width: { xs: "150px", md: "1000px" },
            height: "1px",
            backgroundColor: theme.vars.palette.divider,
            ml: 2,
            borderRadius: "1px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          gap: 3,
          py: 2,
          pb: 4,
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.vars.palette.neutral.outlinedBorder,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.vars.palette.background.level1,
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
              background: theme.vars.palette.background.surface,
              borderRadius: "12px",
              boxShadow: theme.shadow.lg,
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
                height: "300px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-book.jpg";
              }}
            />
            <Box sx={{ p: 2 }}>
              <Typography
                level="h2"
                sx={{
                  fontWeight: "bold",
                  color: theme.vars.palette.text.primary,
                  fontSize: "14px",
                  mb: 1,
                }}
              >
                {book.title}
              </Typography>
              <Typography
                level="h3"
                sx={{
                  color: theme.vars.palette.primary.solidBg,
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
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

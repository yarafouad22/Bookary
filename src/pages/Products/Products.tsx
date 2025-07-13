import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Sheet,
  CircularProgress,
} from "@mui/joy";
import { useGetBooksByPriceQuery } from "../../Services/books";
import BookProfileModal from "../detalies/BookProfile";
import ScrollToTopButton from "../../Component/Shared/ScrollToTopButton";
import FavoriteButton from "../../Component/Shared/FavoriteButton";
import CartButton from "../../Component/Shared/CartButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Product() {
  const { t } = useTranslation();

  const [maxPrice, setMaxPrice] = useState(30);

  const {
    data: books = [],
    error,
    isLoading,
  } = useGetBooksByPriceQuery(maxPrice);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleCloseModal = () => {
    setSelectedBookId(null);
  };

  if (isLoading)
    return (
      <Sheet
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <CircularProgress />
      </Sheet>
    );

  if (error) return <p>Error</p>;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
          gap: 4,
          mt: 10,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea,#FF4081)",
            p: 1,
            borderRadius: 5,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            height: "10",
          }}
        >
          <Typography
            level="h4"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 500,
              color: "#444",
              mb: 2,
            }}
          >
            <span role="img" aria-label="money">
              💰
            </span>
            {t("Filter by price")}:
          </Typography>

          <Typography
            level="h3"
            sx={{
              color: "#FF4081",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {maxPrice}$
          </Typography>

          <Slider
            color="primary"
            variant="soft"
            value={maxPrice}
            onChange={(_, val) => setMaxPrice(val as number)}
            min={0}
            max={40}
            step={1}
            valueLabelDisplay="on"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 6,
          }}
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",

                  "&:hover": {
                    transform: "scale(1.05)",
                  },

                  "&:hover .overlay": {
                    opacity: 1,
                  },

                  "&:hover .cart-icon": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
                onClick={() => handleBookClick(book.id)}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.7)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 2,
                  }}
                />

                <Box sx={{ width: "100%", height: 200, overflow: "hidden" }}>
                  <img
                    src={book.image_url || "/placeholder-book.jpg"}
                    alt={book.title}
                    width="100%"
                    height={200}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                      display: "block",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-book.jpg";
                    }}
                  />
                </Box>

                <CardContent sx={{ position: "relative", zIndex: 3 }}>
                  <Typography level="title-md">{book.title}</Typography>
                  <Typography level="body-md" textColor="text.secondary">
                    {book.price} $
                  </Typography>
                </CardContent>

                <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 4 }}>
                  <FavoriteButton bookId={book.id} />
                </Box>

                <Box
                  className="cart-icon"
                  sx={{
                    position: "absolute",
                    bottom: 150,
                    left: "45%",
                    transform: "translate(-50%, 20px)",
                    opacity: 0,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    zIndex: 4,
                  }}
                >
                  <CartButton bookId={book.id} />
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      <ScrollToTopButton />

      {selectedBookId && (
        <BookProfileModal
          open={!!selectedBookId}
          bookId={selectedBookId}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Product;

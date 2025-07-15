import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Sheet,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetBooksByPriceQuery } from "../../Services/books";
import BookProfileModal from "../detalies/BookProfile";
import ScrollToTopButton from "../../Component/Shared/ScrollToTopButton";
import FavoriteButton from "../../Component/Shared/FavoriteButton";
import CartButton from "../../Component/Shared/CartButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./Product.scss";

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
      <Box className="page-title">
        <Typography level="h3">{t("Books")}</Typography>

        <Box className="title-divider">
          <Divider />
        </Box>
      </Box>

      <Box
        className="product-layout"
        sx={(theme) => ({
          backgroundColor: theme.vars.palette.background.body,
        })}
      >
        <Box>
          <Box className="books-grid">
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  className="book-card"
                  sx={(theme) => ({
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: theme.vars.palette.background.surface,
                    color: theme.vars.palette.text.primary,
                  })}
                >
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.2)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  />

                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
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

                    <Box
                      className="card-icons"
                      sx={{
                        position: "absolute",
                        top: 75,
                        right: 8,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        zIndex: 5,
                      }}
                    >
                      <FavoriteButton bookId={book.id} />
                      <CartButton bookId={book.id} />
                      <IconButton
                        variant="soft"
                        size="sm"
                        onClick={() => handleBookClick(book.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <CardContent sx={{ position: "relative", zIndex: 3 }}>
                    <Typography level="title-md">{book.title}</Typography>
                    <Typography
                      level="h4"
                      sx={(theme) => ({
                        color: theme.palette.primary.solidBg,
                      })}
                    >
                      {book.price} $
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>

        <Box
          className="price-filter"
          sx={(theme) => ({
            background: theme.palette.primary.solidBg,
            color: "#fff",
            padding: "16px",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          })}
        >
          <Typography level="h4">{t("Filter by price")}:</Typography>

          <Typography level="h3">{maxPrice}$</Typography>

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

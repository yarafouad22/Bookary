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
  Drawer,
} from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGetBooksByPriceQuery } from "../../Services/books";
import { useAddToCartMutation } from "../../Services/books";
import { USER_ID } from "../../Supabase/supabaseClient";
import BookProfileModal from "../detalies/BookProfile";
import ScrollToTopButton from "../../Component/Shared/ScrollToTopButton";
import FavoriteButton from "../../Component/Shared/FavoriteButton";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Product.scss";
import CartPage from "../CartPage";

function Product() {
  const { t } = useTranslation();

  const [addToCart] = useAddToCartMutation();
  const [maxPrice, setMaxPrice] = useState(30);
  const [columns, setColumns] = useState(2);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

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

  const gridColumns =
    columns === 1
      ? {
          xs: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }
      : {
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
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
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          ml: 4,
        }}
      >
        <IconButton
          variant={columns === 1 ? "solid" : "soft"}
          color="primary"
          onClick={() => setColumns(1)}
        >
          <ViewStreamIcon />
        </IconButton>

        <IconButton
          variant={columns === 2 ? "solid" : "soft"}
          color="primary"
          onClick={() => setColumns(2)}
        >
          <ViewModuleIcon />
        </IconButton>
      </Box>
      <Box
        className="product-layout"
        sx={(theme) => ({
          backgroundColor: theme.vars.palette.background.body,
        })}
      >
        <Box>
          <Box
            className="books-grid"
            sx={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: gridColumns,
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
                  <Box />
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
                      <IconButton
                        variant="soft"
                        size="sm"
                        onClick={() => {
                          addToCart({
                            user_id: USER_ID,
                            book_id: book.id,
                            quantity: 1,
                          });
                          setCartDrawerOpen(true);
                        }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>

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
                      level="body-md"
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
      <Drawer
        open={isCartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        anchor="right"
        sx={{
          width: 130,
          maxWidth: "100vw",
          p: 2,
        }}
      >
        <CartPage />
      </Drawer>

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

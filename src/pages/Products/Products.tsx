import { useState } from "react";
import styles from "./BooksList.module.scss";
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
      <h1>{t("Books")}</h1>
      <div style={{ maxWidth: 400, marginBottom: 30 }}>
        <Typography level="h5" gutterBottom>
          💰 {t("Filter by price")} – {maxPrice}$
        </Typography>
        <Slider
          value={maxPrice}
          onChange={(e, val) => setMaxPrice(val as number)}
          min={0}
          max={40}
          step={1}
          valueLabelDisplay="on"
        />
      </div>

      <div className={styles.container}>
        {books.map((book) => (
          <Card
            key={book.id}
            className={styles.bookCard}
            variant="outlined"
            sx={{ cursor: "pointer", width: 250 }}
            onClick={() => handleBookClick(book.id)}
          >
            <img
              src={book.image_url}
              alt={book.title}
              width="100%"
              height={200}
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography level="title-md">{book.title}</Typography>
              <Typography level="body-md" textColor="text.secondary">
                {book.price} $
              </Typography>
              <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}>
                <FavoriteButton bookId={book.id} />
              </Box>
              <CartButton bookId={book.id} />
            </CardContent>
          </Card>
        ))}
      </div>

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

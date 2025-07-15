import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "../Services/books";
import { USER_ID } from "../Supabase/supabaseClient";
import {
  Button,
  Typography,
  Sheet,
  Box,
  CircularProgress,
  Grid,
  Container,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { t } = useTranslation();

  const { data: wishlist = [], isLoading } = useGetWishlistQuery(USER_ID);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleRemoveFromWishlist = async (bookId: string) => {
    await removeFromWishlist({ user_id: USER_ID, book_id: bookId });
    toast.success(t("bookdeletedToWishlist"));
  };

  const handleMoveToCart = async (bookId: string) => {
    await addToCart({ user_id: USER_ID, book_id: bookId, quantity: 1 });
    await removeFromWishlist({ user_id: USER_ID, book_id: bookId });
    toast.success(t("bookAddedToCart"));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (wishlist.length === 0) {
    return (
      <Typography
        level="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        {t("emptyWishlist")}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography
        level="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        {t("wishlist")}
      </Typography>

      <Grid container spacing={2}>
        {wishlist.map((book) => (
          <Grid xs={6} sm={4} md={2} key={book.id}>
            <Sheet
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                mt: 2,
                borderRadius: "md",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={book.image_url || "/placeholder-book.jpg"}
                alt={book.title}
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 1,
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-book.jpg";
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography level="title-md">{book.title}</Typography>
                <Typography level="body-sm" sx={{ mt: 0.5 }}>
                  {t("price")}: {book.price} EGP
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  color="danger"
                  variant="soft"
                  onClick={() => handleRemoveFromWishlist(book.id)}
                  fullWidth
                >
                  {t("Delete")}
                </Button>

                <Button
                  color="primary"
                  onClick={() => handleMoveToCart(book.id)}
                  fullWidth
                >
                  {t("Add to cart")}
                </Button>
              </Box>
            </Sheet>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
} from "@mui/joy";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "../Services/books";
import { USER_ID } from "../Supabase/supabaseClient";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { t } = useTranslation();
  const { data: wishlist = [], isLoading } = useGetWishlistQuery(USER_ID);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCartAndRemove = async (book_id: string) => {
    await addToCart({ user_id: USER_ID, book_id, quantity: 1 });
    toast.success(t("bookdeletedToWishlist"));
    await removeFromWishlist({ user_id: USER_ID, book_id });
    toast.success(t("bookAddedToWishlist"));
  };

  if (isLoading)
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
        Loading...
      </Typography>
    );

  if (wishlist.length === 0)
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
        {t("emptyCart")}
      </Typography>
    );

  return (
    <Container maxWidth="lg">
      <Typography
        level="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: "4",
        }}
      >
        {t("wishlist")}
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {wishlist.map((book) => (
          <Card
            key={book.id}
            variant="outlined"
            sx={{
              width: 200,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <img
              src={book.image_url || "/placeholder-book.jpg"}
              alt={book.title}
              width="100%"
              height={150}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-book.jpg";
              }}
            />

            <CardContent sx={{ p: 1 }}>
              <Typography level="title-md" noWrap>
                {book.title}
              </Typography>
              <Typography level="body-sm">{book.price} EGP</Typography>
            </CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                color="danger"
                variant="soft"
                onClick={() =>
                  removeFromWishlist({ user_id: USER_ID, book_id: book.id })
                }
                fullWidth
              >
                {t("Delete")}
              </Button>
              <Button
                onClick={() => handleAddToCartAndRemove(book.id)}
                color="primary"
                size="sm"
                fullWidth
              >
                {t("addToCart")}
              </Button>
            </Box>
          </Card>
        ))}
      </div>
    </Container>
  );
}

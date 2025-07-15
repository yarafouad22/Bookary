import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../Services/books";
import { USER_ID } from "../Supabase/supabaseClient";
import { Button, Typography, Sheet, CircularProgress, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Grid from "@mui/joy/Grid";
import Container from "@mui/joy/Container";

export default function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: cart = [], isLoading } = useGetCartQuery(USER_ID);
  const [removeFromCart] = useRemoveFromCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [updateQuantity] = useAddToCartMutation();
  const [quantities, setQuantities] = useState<{ [bookId: string]: number }>(
    {}
  );

  useEffect(() => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      cart.forEach((item) => {
        if (updatedQuantities[item.book_id] === undefined) {
          updatedQuantities[item.book_id] = item.quantity;
        }
      });
      return updatedQuantities;
    });
  }, [cart]);

  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [bookId]: newQuantity }));
    updateQuantity({
      user_id: USER_ID,
      book_id: bookId,
      quantity: newQuantity,
    });
  };

  const handleRemoveFromCart = async (bookId: string) => {
    await removeFromCart({ user_id: USER_ID, book_id: bookId });
    toast.success(t("bookdeletedTocart"));
  };

  const handleMoveToWishlist = async (bookId: string) => {
    await addToWishlist({ user_id: USER_ID, book_id: bookId });
    await removeFromCart({ user_id: USER_ID, book_id: bookId });
    toast.success(t("bookAddedToWishlist"));
  };

  const total = cart.reduce((sum, item) => {
    const price = item.books?.price || 0;
    const quantity = quantities[item.book_id] ?? item.quantity;
    return sum + price * quantity;
  }, 0);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (cart.length === 0) {
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
  }

  return (
    <Container maxWidth="lg">
      <Typography
        level="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t("cart")}
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cart.map((item) => {
            if (!item.books) return null;
            return (
              <Grid xs={6} sm={4} md={2} key={item.id}>
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
                    src={item.books.image_url}
                    alt={item.books.title}
                    sx={{
                      width: "100%",
                      height: 200,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography level="title-md">{item.books.title}</Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5 }}>
                      {t("price")}: {item.books.price} ×{" "}
                      {quantities[item.book_id] ?? item.quantity}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.book_id,
                            (quantities[item.book_id] ?? item.quantity) - 1
                          )
                        }
                        disabled={
                          (quantities[item.book_id] ?? item.quantity) <= 1
                        }
                      >
                        –
                      </Button>
                      <Typography
                        level="title-sm"
                        sx={{ minWidth: "32px", textAlign: "center" }}
                      >
                        {quantities[item.book_id] ?? item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.book_id,
                            (quantities[item.book_id] ?? item.quantity) + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Button
                      color="danger"
                      variant="soft"
                      onClick={() => handleRemoveFromCart(item.book_id)}
                      fullWidth
                    >
                      {t("Delete")}
                    </Button>

                    <Button
                      color="primary"
                      onClick={() => handleMoveToWishlist(item.book_id)}
                      fullWidth
                    >
                      {t("Add to wishlist")}
                    </Button>
                  </Box>
                </Sheet>
              </Grid>
            );
          })}
        </Grid>

        <Typography
          level="h4"
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {t("total")}: {total.toFixed(2)} $
        </Typography>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/checkout")}
          color="primary"
          size="lg"
        >
          {t("to Checkout")}
        </Button>
      </Box>
    </Container>
  );
}

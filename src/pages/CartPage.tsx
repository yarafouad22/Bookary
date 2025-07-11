import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../Services/books";
import { USER_ID } from "../Supabase/supabaseClient";
import { Button, Typography, Sheet, Input, CircularProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  };

  const handleMoveToWishlist = async (bookId: string) => {
    await addToWishlist({ user_id: USER_ID, book_id: bookId });
    await removeFromCart({ user_id: USER_ID, book_id: bookId });
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
    <div>
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        level="h3"
        sx={{ mb: 2 }}
      >
        {t("cart")}
      </Typography>

      {cart.map((item) => {
        if (!item.books) return null;
        return (
          <Sheet
            key={item.id}
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              p: 2,
              my: 1,
              borderRadius: "md",
            }}
          >
            <img
              src={item.books.image_url}
              alt={item.books.title}
              width={80}
              height={100}
            />

            <div style={{ flexGrow: 1 }}>
              <Typography level="title-md">{item.books.title}</Typography>
              <Typography level="body-sm" sx={{ mt: 0.5 }}>
                {t("price")}: {item.books.price} ×
                {quantities[item.book_id] ?? item.quantity}
              </Typography>

              <Input
                type="number"
                value={quantities[item.book_id] ?? item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.book_id, Number(e.target.value))
                }
                sx={{ width: 200, mt: 2 }}
                size="sm"
              />
            </div>

            <Button
              color="danger"
              onClick={() => handleRemoveFromCart(item.book_id)}
            >
              {t("Delete")}
            </Button>

            <Button
              color="neutral"
              variant="soft"
              onClick={() => handleMoveToWishlist(item.book_id)}
            >
              {t("Add to wishlist")}
            </Button>
          </Sheet>
        );
      })}

      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        level="h4"
        sx={{ mt: 3 }}
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
    </div>
  );
}

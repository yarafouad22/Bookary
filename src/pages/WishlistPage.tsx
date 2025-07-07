import { Card, CardContent, Typography, IconButton, Button } from "@mui/joy";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useAddToCartMutation,
} from "../Services/books";
import { USER_ID } from "../Supabase/supabaseClient";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from "react-i18next";

export default function WishlistPage() {
  const { t } = useTranslation();
  const { data: wishlist = [], isLoading } = useGetWishlistQuery(USER_ID);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCartAndRemove = async (book_id: string) => {
    await addToCart({ user_id: USER_ID, book_id, quantity: 1 });
    await removeFromWishlist({ user_id: USER_ID, book_id });
  };

  if (isLoading)
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        laoding...
      </p>
    );
  if (wishlist.length === 0)
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        {t("emptyCart")}
      </p>
    );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
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
          <IconButton
            onClick={() =>
              removeFromWishlist({ user_id: USER_ID, book_id: book.id })
            }
            size="sm"
            variant="outlined"
            color="danger"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <DeleteIcon />
          </IconButton>

          <img
            src={book.image_url}
            alt={book.title}
            width="100%"
            height={150}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />

          <CardContent sx={{ p: 1 }}>
            <Typography level="title-md" noWrap>
              {book.title}
            </Typography>
            <Typography level="body-sm">{book.price} EGP</Typography>
          </CardContent>

          <Button
            startDecorator={<ShoppingCartIcon />}
            onClick={() => handleAddToCartAndRemove(book.id)}
            color="primary"
            size="sm"
            fullWidth
            sx={{ mt: 1 }}
          >
            {t("addToCart")}
          </Button>
        </Card>
      ))}
    </div>
  );
}

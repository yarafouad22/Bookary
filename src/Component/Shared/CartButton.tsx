import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import IconButton from "@mui/joy/IconButton";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
} from "../../Services/books";
import { USER_ID } from "../../Supabase/supabaseClient";
import { toast } from "react-toastify";
import { t } from "i18next";

interface CartButtonProps {
  bookId: string;
}

export default function CartButton({ bookId }: CartButtonProps) {
  const { data: cart = [], refetch } = useGetCartQuery(USER_ID);
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const isInCart = cart.some((item) => item.book_id === bookId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isInCart) {
        await removeFromCart({ user_id: USER_ID, book_id: bookId }).unwrap();
        toast.success(t("bookdeletedTocart"));
      } else {
        await addToCart({
          user_id: USER_ID,
          book_id: bookId,
          quantity: 1,
        }).unwrap();
        toast.success(t("bookdeletedTocart"));
      }
      await refetch();
    } catch (error) {
      console.error("Error toggling cart item:", error);
    }
  };

  return (
    <IconButton
      variant="soft"
      color={isInCart ? "primary" : "neutral"}
      onClick={handleToggle}
    >
      {isInCart ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
    </IconButton>
  );
}

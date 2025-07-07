import { IconButton, Badge } from "@mui/joy";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useGetWishlistQuery, useGetCartQuery } from "../../../Services/books";
import { USER_ID } from "../../../Supabase/supabaseClient";

export default function HeaderBasket() {
  const { data: wishlist = [] } = useGetWishlistQuery(USER_ID);
  const { data: cart = [] } = useGetCartQuery(USER_ID);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <IconButton component={RouterLink} to="/wishlist" color="danger">
        <Badge badgeContent={wishlist.length} color="danger">
          <Favorite />
        </Badge>
      </IconButton>

      <IconButton component={RouterLink} to="/cart" color="primary">
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  );
}

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/joy/IconButton";

import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from "../../Services/books";
import { USER_ID } from "../../Supabase/supabaseClient";

interface FavoriteButtonProps {
  bookId: string;
}

export default function FavoriteButton({ bookId }: FavoriteButtonProps) {
  const { data: wishlist = [] } = useGetWishlistQuery(USER_ID);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isInWishlist = wishlist.some((book) => book.id === bookId);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist({ user_id: USER_ID, book_id: bookId });
    } else {
      addToWishlist({ user_id: USER_ID, book_id: bookId });
    }
  };

  return (
    <IconButton
      variant="soft"
      color={isInWishlist ? "danger" : "neutral"}
      onClick={toggleFavorite}
    >
      {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

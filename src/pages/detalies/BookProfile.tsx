import Typography from "@mui/joy/Typography";
import { useGetBookDetailsQuery } from "../../Services/books";
import SharedModalWrapper from "../../Component/Shared/SharedModalWrapper";
import { Box, CircularProgress } from "@mui/joy";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  bookId: string;
  onClose: () => void;
};

const BookProfileModal = ({ open, bookId, onClose }: Props) => {
  const { data: book, error, isLoading } = useGetBookDetailsQuery(bookId);

  return (
    <SharedModalWrapper open={open} onClose={onClose}>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="danger" level="h4">
          Error loading book details
        </Typography>
      )}

      {book && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography level="h3">{book.title}</Typography>
          <Box
            component="img"
            src={book.image_url || "/placeholder-book.jpg"}
            alt={book.title}
            sx={{
              width: "80%",
              borderRadius: "12px",
              mb: 3,
              objectFit: "cover",
              maxHeight: "300px",
            }}
            onError={(e) => {
              e.currentTarget.src = "/placeholder-book.jpg";
            }}
          />

          <Typography
            level="body-lg"
            sx={(theme) => ({
              mb: 2,
              color: theme.vars.palette.text.primary,
            })}
          >
            {book.description}
          </Typography>

          <Typography
            level="title-md"
            sx={(theme) => ({
              backgroundColor: theme.vars.palette.primary.softBg,
              display: "inline-block",
              px: 2,
              py: 1,
              borderRadius: "8px",
              color: "primary",
              fontWeight: "bold",
            })}
          >
            {`Price: $${book.price}`}
          </Typography>
        </motion.div>
      )}
    </SharedModalWrapper>
  );
};

export default BookProfileModal;

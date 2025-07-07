import Typography from "@mui/joy/Typography";
import { useGetBookDetailsQuery } from "../../Services/books";
import SharedModalWrapper from "../../Component/Shared/SharedModalWrapper";

type Props = {
  open: boolean;
  bookId: string;
  onClose: () => void;
};

const BookProfileModal = ({ open, bookId, onClose }: Props) => {
  const { data: book, error, isLoading } = useGetBookDetailsQuery(bookId);

  return (
    <SharedModalWrapper open={open} onClose={onClose}>
      {isLoading && <Typography>loading...</Typography>}
      {error && <Typography color="danger">Error</Typography>}

      {book && (
        <>
          <Typography level="h3" sx={{ mb: 2 }}>
            {book.title}
          </Typography>
          <img
            src={book.image_url}
            alt={book.title}
            style={{
              width: "80%",
              borderRadius: "12px",
              marginBottom: "1.5rem",
            }}
          />
          <Typography level="body-lg" sx={{ mb: 2 }}>
            {book.description}
          </Typography>
          <Typography
            level="title-md"
            sx={{
              backgroundColor: "#e3f2fd",
              display: "inline-block",
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            price: ${book.price}
          </Typography>
        </>
      )}
    </SharedModalWrapper>
  );
};

export default BookProfileModal;

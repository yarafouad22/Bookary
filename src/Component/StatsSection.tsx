import { Box, Typography, Card } from "@mui/joy";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function StatsSection() {
  const stats = [
    {
      value: "20",
      label: "total books",
      icon: <BookIcon sx={{ fontSize: 40, color: "primary.500" }} />,
    },
    {
      value: "1,287",
      label: "authors",
      icon: <PersonIcon sx={{ fontSize: 40, color: "primary.500" }} />,
    },
    {
      value: "7,589",
      label: "books sold",
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "primary.500" }} />,
    },
    {
      value: "97%",
      label: "happy customer",
      icon: <EmojiEmotionsIcon sx={{ fontSize: 40, color: "primary.500" }} />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 3,
        mt: 5,
        px: { xs: 2, md: 8 },
      }}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            textAlign: "center",
            py: 3,
            boxShadow: "md",
            borderRadius: 4,
            "&:hover": {
              boxShadow: "lg",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            {stat.icon}
          </Box>
          <Typography
            level="h2"
            sx={{
              fontWeight: "bold",
              color: "primary.600",
              fontSize: { xs: "24px", md: "32px" },
            }}
          >
            {stat.value}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              color: "#555",
              mt: 1,
              textTransform: "capitalize",
            }}
          >
            {stat.label}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

export default StatsSection;

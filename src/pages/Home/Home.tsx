import Slider from "react-slick";
import { Box, Typography, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetBestSellersQuery } from "../../Services/books";
import Products from "../Products/Products";
import ScrollToTopButton from "../../Component/Shared/ScrollToTopButton";
import { useTranslation } from "react-i18next";
import Hero from "../../Component/Shared/Hero/Hero";

const Home = () => {
  const { t } = useTranslation();
  const {
    data: bestSellers = [],
    isLoading,
    isError,
  } = useGetBestSellersQuery();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, bestSellers.length),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, bestSellers.length),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Hero />
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {t("Best Sellers")}
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", gap: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ p: 2, textAlign: "center" }}>
              <Skeleton
                variant="rectangular"
                width={150}
                height={200}
                sx={{ mx: "auto", borderRadius: 2 }}
              />
              <Skeleton width="80%" sx={{ mx: "auto", mt: 1 }} />
              <Skeleton width="40%" sx={{ mx: "auto" }} />
            </Box>
          ))}
        </Box>
      ) : isError ? (
        <Typography color="error">
          Error loading best sellers. Please try again later.
        </Typography>
      ) : bestSellers.length === 0 ? (
        <Typography>No best sellers available at the moment.</Typography>
      ) : (
        <Slider {...sliderSettings}>
          {bestSellers.map((book) => (
            <Box
              key={book.id}
              sx={{
                p: 2,
                textAlign: "center",
                outline: "none",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              <img
                src={book.image_url || "/placeholder-book.jpg"}
                alt={book.title}
                width={150}
                height={200}
                style={{
                  margin: "0 auto",
                  borderRadius: 8,
                  objectFit: "cover",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-book.jpg";
                }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {book.title}
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "primary.main" }}>
                ${book.price?.toFixed(2) || "0.00"}
              </Typography>
            </Box>
          ))}
        </Slider>
      )}

      <Products />
      <ScrollToTopButton />
    </Box>
  );
};

export default Home;

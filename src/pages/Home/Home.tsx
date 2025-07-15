import { Box, Typography, Sheet, Skeleton } from "@mui/joy";
import { useGetBestSellersQuery } from "../../Services/books";
import Products from "../Products/Products";
import ScrollToTopButton from "../../Component/Shared/ScrollToTopButton";
import Hero from "../../Component/Shared/Hero/Hero";
import { useTranslation } from "react-i18next";
import BestSellersScroll from "../../Component/Shared/BestSellersScroll";
import CategoriesGrid from "../../Component/CategoriesGrid";
import StatsSection from "../../Component/StatsSection";

const Home = () => {
  const { t } = useTranslation();
  const {
    data: bestSellers = [],
    isLoading,
    isError,
  } = useGetBestSellersQuery();

  return (
    <Box>
      <Hero />
      {isLoading ? (
        <Box sx={{ display: "flex", gap: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Sheet
              key={index}
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: 130 },
                p: 2,
                borderRadius: "md",
                textAlign: "center",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                sx={{ borderRadius: "md" }}
              />
              <Skeleton width="80%" sx={{ mt: 1 }} />
              <Skeleton width="40%" />
            </Sheet>
          ))}
        </Box>
      ) : isError ? (
        <Typography color="danger" level="body-md">
          {t("Error loading best sellers. Please try again later.")}
        </Typography>
      ) : bestSellers.length === 0 ? (
        <Typography level="body-md">
          {t("No best sellers available at the moment.")}
        </Typography>
      ) : (
        <BestSellersScroll bestSellers={bestSellers} />
      )}

      <Products />
      <CategoriesGrid />
      <StatsSection />
      <ScrollToTopButton />
    </Box>
  );
};

export default Home;

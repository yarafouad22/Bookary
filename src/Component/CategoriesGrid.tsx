import { Box, Typography, Card, IconButton } from "@mui/joy";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import categories from "../data/categories.ts";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CategoriesSlider() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    const container = scrollRef.current;
    const scrollAmount = 250;

    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (_name?: string) => {
    navigate(`/products`);
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        mt: 5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          pl: { xs: 0, md: 8 },
          mb: 4,
        }}
      >
        <Box
          sx={(theme) => ({
            width: { xs: "130px", md: "1000px" },
            height: "1px",
            backgroundColor: theme.vars.palette.divider,
            ml: 2,
            borderRadius: "1px",
          })}
        />
      </Box>

      <IconButton
        color="primary"
        onClick={() => handleScroll("left")}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          left: -10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
          px: 2,
          py: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((cat) => (
          <Card
            key={cat.id}
            onClick={() => handleClick(cat.name)}
            sx={(theme) => ({
              width: { xs: 120, sm: 160, md: 200 },
              height: { xs: 120, sm: 160, md: 200 },
              minWidth: { xs: 120, sm: 160, md: 200 },
              minHeight: { xs: 120, sm: 160, md: 200 },
              flex: "0 0 auto",
              cursor: "pointer",
              borderRadius: "50%",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
              backgroundColor: theme.vars.palette.background.surface,
              boxShadow: theme.shadow.lg,
            })}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1,
              }}
            >
              <Typography
                level="body-sm"
                sx={(theme) => ({
                  color: theme.vars.palette.common.white,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "12px",
                })}
              >
                {cat.name}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CategoriesSlider;

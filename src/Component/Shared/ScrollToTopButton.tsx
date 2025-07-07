import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="medium"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: "#1976d2",
          "&:hover": { bgcolor: "#115293" },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}

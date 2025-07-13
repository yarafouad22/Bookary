import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/joy";

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

  return show ? (
    <Button
      variant="solid"
      color="primary"
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        borderRadius: "50%",
        minWidth: 56,
        height: 56,
        p: 0,
        boxShadow: "md",
        "& svg": {
          fontSize: "24px",
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Button>
  ) : null;
}

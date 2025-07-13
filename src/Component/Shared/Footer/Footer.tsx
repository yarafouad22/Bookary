import { Box, Typography, Link, Stack } from "@mui/joy";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f1f1f1",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        mt: 10,
        py: 4,
        px: 2,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, 1fr)",
        },
        gap: 3,
        textAlign: { xs: "center", sm: "left" },
      })}
    >
      <Box>
        <Stack
          direction="row"
          spacing={1}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          alignItems="center"
        >
          <MenuBookIcon
            sx={(theme) => ({
              fontSize: 28,
              color: theme.palette.mode === "dark" ? "#1976d2" : "#1976d2",
            })}
          />
          <Typography
            level="h4"
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "#fff" : "#5556",
            })}
          >
            Bookary
          </Typography>
        </Stack>
        <Typography
          sx={(theme) => ({
            color: theme.palette.mode === "dark" ? "#ccc" : "#555",
            mt: 1,
          })}
        >
          © 2025 All rights reserved.
        </Typography>
      </Box>

      <Box>
        <Stack spacing={1}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "#ccc" : "#555",
            })}
          >
            Contact us:
          </Typography>
          {["About Us", "Contact", "Privacy Policy"].map((text, i) => (
            <Link
              key={i}
              href="#"
              underline="hover"
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
              })}
            >
              {text}
            </Link>
          ))}
        </Stack>
      </Box>

      <Box>
        <Stack spacing={1}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "#ccc" : "#555",
            })}
          >
            Follow us:
          </Typography>
          {["Facebook", "Twitter", "Instagram"].map((platform, i) => (
            <Link
              key={i}
              href="#"
              underline="hover"
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
              })}
            >
              {platform}
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;

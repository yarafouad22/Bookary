import { Box, Typography, Link, Grid } from "@mui/joy";

export default function Footer() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.vars.palette.background.surface,
        mt: 8,
        py: 4,
        px: { xs: 2, md: 8 },
        color: theme.vars.palette.text.primary,
      })}
    >
      <Grid container spacing={4}>
        <Grid xs={12} md={3}>
          <Typography
            level="h4"
            sx={(theme) => ({
              fontWeight: "bold",
              mb: 2,
              color: theme.vars.palette.text.primary,
            })}
          >
            Bookary
          </Typography>
        </Grid>

        <Grid xs={12} md={3}>
          <Typography
            level="h4"
            sx={(theme) => ({
              fontWeight: "bold",
              mb: 2,
              color: theme.vars.palette.text.primary,
            })}
          >
            Need Help
          </Typography>
          <Typography
            level="body-sm"
            sx={(theme) => ({
              color: theme.vars.palette.text.secondary,
            })}
          >
            +(84) - 1800 - 4635
            <br />
            Monday – Friday: 9:00-20:00
            <br />
            Saturday: 11:00 – 15:00
          </Typography>
          <Link
            href="mailto:contact@example.com"
            underline="always"
            sx={(theme) => ({
              display: "block",
              mt: 1,
              color: theme.vars.palette.primary.solidBg,
              fontWeight: "bold",
            })}
          >
            contact@example.com
          </Link>
        </Grid>

        <Grid xs={12} md={3}>
          <Typography
            level="h4"
            sx={(theme) => ({
              fontWeight: "bold",
              mb: 2,
              color: theme.vars.palette.text.primary,
            })}
          >
            Explore
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {["About us", "Sitemap", "Bookmarks", "Sign in/Join"].map(
              (text) => (
                <Link
                  key={text}
                  href="#"
                  sx={(theme) => ({
                    color: theme.vars.palette.text.secondary,
                  })}
                >
                  {text}
                </Link>
              )
            )}
          </Box>
        </Grid>

        <Grid xs={12} md={3}>
          <Typography
            level="h4"
            sx={(theme) => ({
              fontWeight: "bold",
              mb: 2,
              color: theme.vars.palette.text.primary,
            })}
          >
            Our Service
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              "Help Center",
              "Returns",
              "Product Recalls",
              "Accessibility",
              "Contact Us",
              "Store Pickup",
            ].map((text) => (
              <Link
                key={text}
                href="#"
                sx={(theme) => ({
                  color: theme.vars.palette.text.secondary,
                })}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={(theme) => ({
          height: "1px",
          backgroundColor: theme.vars.palette.divider,
          my: 3,
          width: "100%",
        })}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          level="body-xs"
          sx={(theme) => ({
            color: theme.vars.palette.text.tertiary,
            textAlign: "center",
          })}
        >
          Copyright © {new Date().getFullYear()} Bookary. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

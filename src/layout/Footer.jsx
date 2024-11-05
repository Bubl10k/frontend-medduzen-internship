import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </Typography>
        <Box>
          <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>
            About
          </Link>
          <Link
            href="/privacy"
            color="inherit"
            underline="hover"
            sx={{ mx: 1 }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            color="inherit"
            underline="hover"
            sx={{ mx: 1 }}
          >
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

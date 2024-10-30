import { Button, Container, Typography } from "@mui/material";

const StartPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Quiz App
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        This is the starting page of quiz application.
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>
  );
};
  
export default StartPage;
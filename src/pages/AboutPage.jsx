import { Box, Card, CardContent, Typography } from "@mui/material";

const AboutPage = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              About Our Platform
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to our platform! This application is designed to help users connect with others, 
              discover various companies, and find profiles of users and organizations. 
              Whether you`re here to browse profiles, explore companies, or connect with other users, 
              we aim to provide a seamless and engaging experience.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  };

export default AboutPage;
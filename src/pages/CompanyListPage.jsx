import { Container, Typography } from "@mui/material";
import Companies from "../components/CompaniesList";

const CompanyListPage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Company List
      </Typography>
      <Companies />
    </Container>
  );
};

export default CompanyListPage;

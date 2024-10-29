import { Avatar, Box, Card, Typography } from "@mui/material";
import { companies } from "../pages/MockedData";
import { Link } from "react-router-dom";

const Companies = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 3,
        padding: 4,
      }}
    >
      {companies.map((company) => (
        <Card key={company.id} sx={{ padding: 5, marginRight: 2 }}>
          <Avatar
            src={company.logo}
            alt={company.name}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Link to={`/companies/${company.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h5">{company.name}</Typography>
          </Link>
          <Typography variant="body1">{company.description}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Companies;

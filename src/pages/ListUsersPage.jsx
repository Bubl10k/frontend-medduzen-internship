import { Container, Typography } from "@mui/material";
import Users from "../components/UsersList";
import { users } from "./MockedData";

const ListUsersPage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        User List
      </Typography>
      <Users users={users} />
    </Container>
  );
};

export default ListUsersPage;

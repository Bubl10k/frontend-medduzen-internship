import { Avatar, Box, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 3,
        padding: 4,
      }}
    >
      {users.map((user) => (
        <Card key={user.id} sx={{ padding: 5, marginRight: 2, width: 200 }}>
          <Avatar
            src={user.profilePicture}
            alt={user.name}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Link
            to={`/users/${user.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h5">{user.name}</Typography>
          </Link>
          <Typography variant="body1">{user.email}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Users;

import { Avatar, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const navigate = useNavigate();
  
    const handleViewProfile = () => {
      navigate(`/users/${user.id}`);
    };
  
    return (
      <Card sx={{ marginBottom: 2, padding: 2, borderRadius: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={user.image_path || '/path/to/default-avatar.jpg'}
            alt={user.username}
            sx={{ width: 60, height: 60, marginRight: 2 }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{user.username}</Typography>
            <Typography color="textSecondary">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography color="textSecondary">{user.email}</Typography>
          </CardContent>
          <Button variant="outlined" onClick={handleViewProfile}>
            Learn More
          </Button>
        </Box>
      </Card>
    );
}

export default UserCard
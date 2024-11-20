import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '../store/auth/auth.slice';
import UniversalModal from './UniversalModal';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const currUser = useSelector(currentUser);

  const handleViewProfile = () => {
    navigate(`/users/${user.id}`);
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    try {
      const data = await CompanyService.getCompanies(1, currUser);
      setCompanies(data.results || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSentInvitation = async companyId => {
    try {
      await CompanyService.sendInvitation({
        company: companyId,
        receiver: user.id,
        sender: currUser
      });
      toast.success('Invitation sent!');
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <Button
          variant="outlined"
          sx={{ marginLeft: 2 }}
          onClick={handleOpenModal}
        >
          Sent Invite
        </Button>
      </Box>
      <UniversalModal
        open={openModal}
        onClose={handleCloseModal}
        title="Select a Company"
        actions={
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        }
      >
        {companies.length > 0 ? (
          companies.map(company => (
            <Box
              key={company.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 2,
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 1,
              }}
            >
              <Typography>{company.name}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSentInvitation(company.id)}
              >
                Invite
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No companies available</Typography>
        )}
      </UniversalModal>
    </Card>
  );
};

export default UserCard;

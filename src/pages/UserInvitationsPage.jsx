import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../store/auth/auth.selectors';
import { useEffect, useState } from 'react';
import { Box, List, Typography } from '@mui/material';

import UserInvitationCard from '../components/UserInvitationCard';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';

const UserInvitationsPage = () => {
  const currentUser = useSelector(selectCurrentUserId);
  const [invitations, setInvitations] = useState([]);

  const fetchInvitations = async () => {
    try {
      const data = await CompanyService.getInvitations(currentUser);
      setInvitations(data);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchInvitations();
  }, [currentUser]);

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Invitations
      </Typography>
      {invitations.length > 0 ? (
        <List>
          {invitations.map(invitation => (
              <UserInvitationCard
                key={invitation.id}
                invitation={invitation}
              />
            ))}
        </List>
      ) : (
        <Typography variant="body1">No invitations found.</Typography>
      )}
    </Box>
  );
};

export default UserInvitationsPage;

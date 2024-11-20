import { useSelector } from 'react-redux';
import CompanyService from '../services/company.service';
import { useEffect, useState } from 'react';
import { selectCurrentUserId } from '../store/auth/auth.selectors';
import { toast } from 'react-toastify';
import { Box, List, Typography } from '@mui/material';
import CompanyInvitationCard from '../components/CompanyInvitationCard';

const CompanyInvitationsPage = () => {
  const currentUser = useSelector(selectCurrentUserId);
  const [invitations, setInvitations] = useState([]);

  const fetchInvitations = async () => {
    try {
      const data = await CompanyService.getInvitations(null, currentUser);
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
        Company Invitations
      </Typography>
      {invitations.length > 0 ? (
        <List>
          {invitations.map(invitation => (
              <CompanyInvitationCard
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

export default CompanyInvitationsPage;

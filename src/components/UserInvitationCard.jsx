import { Button, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState, useTransition } from 'react';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ROUTES from '../utils/routes';

const UserInvitationCard = ({ invitation }) => {
  const { t } = useTransition();
  const [currentInvitation, setCurrentInvitation] = useState(invitation);
  const [company, setCompany] = useState({});

  const fetchCompany = async () => {
    try {
      const data = await CompanyService.getCompanyById(invitation.company);
      setCompany(data);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const acceptInvitation = async invitationId => {
    try {
      const response = await CompanyService.acceptInvitation(invitationId);
      toast.success('Invitation accepted');
      setCurrentInvitation(prev => ({
        ...prev,
        status: response.status,
      }));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const declineInvitation = async invitationId => {
    try {
      const response = await CompanyService.cancelInvitation(invitationId);
      toast.success('Invitation declined');
      setCurrentInvitation(prev => ({
        ...prev,
        status: response.status,
      }));
    } catch (error) {
      console.error('Error canceling invitation:', error);
      toast.error('Failed to decline invitation');
    }
  };

  useEffect(() => {
    if (!invitation) return;
    fetchCompany();
  }, [invitation]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {t('invitations.company')}{' '}
          <Link
            to={ROUTES.COMPANY_PROFILE(currentInvitation.company)}
            style={{ color: 'inherit' }}
          >
            {company.name}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('invitations.status')}{' '}
          {currentInvitation.status === 'P'
            ? 'Pending'
            : currentInvitation.status === 'A'
            ? 'Accepted'
            : 'Declined'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('invitations.sent')} {new Date(currentInvitation.created_at).toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={currentInvitation.status !== 'P'}
          onClick={() => acceptInvitation(currentInvitation.id)}
        >
          {t('invitations.accept')}
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2, ml: 2 }}
          disabled={currentInvitation.status !== 'P'}
          onClick={() => declineInvitation(currentInvitation.id)}
        >
          {t('invitations.decline')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserInvitationCard;

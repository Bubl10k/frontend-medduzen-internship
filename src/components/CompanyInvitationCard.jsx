import { toast } from 'react-toastify';
import CompanyService from '../services/company.service';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserById,
  selectUserState,
} from '../store/users/users.selectors';
import { useEffect, useState } from 'react';
import { fetchUserById } from '../store/users/users.actions';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import ROUTES from '../utils/routes';
import { useTranslation } from 'react-i18next';

const CompanyInvitationCard = ({ invitation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectUserState);
  const user = useSelector(selectUserById);
  const [currentInvitation, setCurrentInvitation] = useState(invitation);

  useEffect(() => {
    dispatch(fetchUserById(currentInvitation.receiver));
  }, [currentInvitation, dispatch]);

  const revokeInvitation = async invitationId => {
    try {
      const response = await CompanyService.revokeInvitation(invitationId);
      toast.success('Invitation revoked');
      setCurrentInvitation(prev => ({
        ...prev,
        status: response.status,
      }));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1">
          {t('invitations.receiver')}{' '}
          <Link
            to={`${ROUTES.USERS}/${currentInvitation.receiver}`}
            style={{ color: 'inherit' }}
          >
            {user.username}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('invitations.status')}{' '}
          {currentInvitation.status === 'P'
            ? 'Pending'
            : currentInvitation.status === 'R'
            ? 'Revoked'
            : currentInvitation.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('invitations.sent')} {new Date(currentInvitation.created_at).toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          disabled={currentInvitation.status !== 'P'}
          onClick={() => revokeInvitation(currentInvitation.id)}
        >
          {t('invitations.revoke')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyInvitationCard;

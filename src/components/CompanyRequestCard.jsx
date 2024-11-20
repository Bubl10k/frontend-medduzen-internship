import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CompanyService from '../services/company.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserById,
  selectUserState,
} from '../store/users/users.selectors';
import { fetchUserById } from '../store/users/users.actions';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTES from '../utils/routes';
import Loading from './Loading';
import { useTranslation } from 'react-i18next';

const CompanyRequestCard = ({ request }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectUserState);
  const user = useSelector(selectUserById);
  const [currentRequest, setCurrentRequest] = useState(request);

  useEffect(() => {
    dispatch(fetchUserById(request.sender));
  }, [request, dispatch]);

  const approveRequest = async requestId => {
    try {
      const response = await CompanyService.approveRequest(requestId);
      toast.success('Request approved');
      setCurrentRequest(prevRequest => ({
        ...prevRequest,
        status: response.status,
      }));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const rejectRequest = async requestId => {
    try {
      const response = await CompanyService.rejectRequest(requestId);
      toast.success('Request rejected');
      setCurrentRequest(prevRequest => ({
        ...prevRequest,
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
          {t('requests.sender')}{' '}
          <Link
            to={`${ROUTES.USERS}/${currentRequest.sender}`}
            style={{ color: 'inherit' }}
          >
            {user.username}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('requests.status')}{' '}
          {currentRequest.status === 'P'
            ? 'Pending'
            : currentRequest.status === 'R'
            ? 'Rejected'
            : currentRequest.status === 'A'
            ? 'Accepted'
            : currentRequest.status === 'C'
            ? 'Canceled'
            : currentRequest.status
            }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('requests.sent')} {new Date(currentRequest.created_at).toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={currentRequest.status !== 'P'}
          onClick={() => approveRequest(currentRequest.id)}
        >
          {t('requests.accept')}
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, ml: 2 }}
          disabled={currentRequest.status !== 'P'}
          onClick={() => rejectRequest(currentRequest.id)}
          >
            {t('requests.reject')}
          </Button>
      </CardContent>
    </Card>
  );;
};

export default CompanyRequestCard;

import { useEffect, useState } from 'react';
import CompanyService from '../services/company.service';
import { useSelector } from 'react-redux';
import { currentUser } from '../store/auth/auth.slice';
import { Box, List, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import UserRequestCard from '../components/UserRequestCard';
import { useTranslation } from 'react-i18next';

const UserRequestsPage = () => {
  const { t } = useTranslation();
  const currUser = useSelector(currentUser);
  const [requests, setUserRequests] = useState([]);

  const fetchUserRequests = async () => {
    try {
      const data = await CompanyService.getRequests(currUser);
      setUserRequests(data);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  useEffect(() => {
    if (!currUser) return;
    fetchUserRequests();
  }, [currUser]);

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("requests.requests")}
      </Typography>
      {requests.length > 0 ? (
        <List>
          {requests.map(request => (
            <UserRequestCard key={request.id} request={request} />
          ))}
        </List>
      ) : (
        <Typography variant="body1">{t("requests.nofound")}</Typography>
      )}
    </Box>
  );
};

export default UserRequestsPage;

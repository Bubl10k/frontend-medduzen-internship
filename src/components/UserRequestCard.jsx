import { toast } from 'react-toastify';
import CompanyService from '../services/company.service';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserRequestCard = ({ request }) => {
  const { t } = useTranslation();
  const [currentRequest, setCurrentRequest] = useState(request);
  
  const cancelRequest = async requestId => {
    try {
      const response = await CompanyService.cancelRequest(requestId);
      toast.success('Request cancel');
      setCurrentRequest(prevRequest => ({
        ...prevRequest,
        status: response.status,
      }));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>Company: {currentRequest.company_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('requests.status')} {currentRequest.status_display}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('requests.sent')}{' '}
          {new Date(currentRequest.created_at).toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          disabled={currentRequest.status !== 'P'}
          onClick={() => cancelRequest(currentRequest.id)}
        >
          {t('requests.cancel')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserRequestCard;

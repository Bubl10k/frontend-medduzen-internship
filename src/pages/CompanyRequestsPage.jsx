import { useEffect, useState } from 'react';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';
import { Box, List, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CompanyRequestCard from '../components/CompanyRequestCard';
import { useTranslation } from 'react-i18next';

const CompanyRequestsPage = () => {
  const { t } = useTranslation();
  const companyId = useParams();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await CompanyService.getRequestsCompany(null, companyId);
      setRequests(data);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  useEffect(() => {
    if (!companyId) return;
    fetchRequests();
  }, [companyId]);

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('requests.companyTitle')}
      </Typography>
      {requests.length > 0 ? (
        <List>
          {requests.map(request => (
            <CompanyRequestCard key={request.id} request={request} />
          ))}
        </List>
      ) : (
        <Typography variant="body1">{t('requests.nofound')}</Typography>
      )}
    </Box>
  );
};

export default CompanyRequestsPage;

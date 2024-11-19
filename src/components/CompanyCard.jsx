import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UniversalModal from './UniversalModal';
import CompanyService from '../services/company.service';
import { useTranslation } from 'react-i18next';
import ROUTES from '../utils/routes';
import { toast } from 'react-toastify';

const CompanyCard = ({ company, isCompanyMember }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleCompanyPage = () => {
    navigate(ROUTES.COMPANY_PROFILE(company.id));
  };

  const handleLeaveCompany = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmLeave = () => {
    try {
      CompanyService.companyLeave(company.id);
      toast.success('You have successfully left the company!');
    } catch (err) {
      toast.error('Failed to leave the company. Please try again.');
    }
    setModalOpen(false);
  };

  const handleCancelLeave = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              {company.name}
            </Typography>
            {isCompanyMember ? (
              <>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleCompanyPage}>{t('companyListPage.learnMore')}</MenuItem>
                  <MenuItem onClick={handleLeaveCompany}>
                    {t('companyListPage.leave')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color={company.visible ? 'primary' : 'secondary'}
                onClick={handleCompanyPage}
              >
                {t("companyListPage.learnMore")}
              </Button>
            )}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            {t('companyListPage.companyDescription')} {company.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('companyListPage.created')} {new Date(company.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      <UniversalModal
        open={modalOpen}
        onClose={handleCancelLeave}
        title={t('companyListPage.leaveTitle')}
        actions={
          <>
            <Button variant="contained" onClick={handleConfirmLeave}>
              {t('companyListPage.leave')}
            </Button>
            <Button onClick={handleCancelLeave}>{t('companyListPage.cancel')}</Button>
          </>
        }
      >
        <Typography variant="body1">
          {t('companyListPage.leaveConfirmation')}
        </Typography>
      </UniversalModal>
    </>
  );
};

export default CompanyCard;

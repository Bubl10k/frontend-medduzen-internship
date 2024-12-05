import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';
import { fetchCompanyById } from '../store/companies/companies.actions';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { selectUser } from '../store/users/users.selectors';
import { fetchUsers } from '../store/users/users.actions';
import { useTranslation } from 'react-i18next';
import downloadResults from '../utils/downloadResults';

const CompanyProfileUser = ({
  userId,
  isOwner,
  isAdmin,
  companyId,
  lastTestTaken,
  handleShowChart,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(state => selectUser(state, userId));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveMember = async () => {
    try {
      await CompanyService.companyRemoveMember(companyId, userId);
      toast.success('User removed successfully!');
      dispatch(fetchCompanyById(companyId));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
    handleClose();
  };

  const handleAppointAdmin = async () => {
    try {
      await CompanyService.appointAdmin({
        company_id: companyId,
        user_id: userId,
      });
      toast.success('User appointed as admin successfully!');
      dispatch(fetchCompanyById(companyId));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      await CompanyService.removeAdmin({
        company_id: companyId,
        user_id: userId,
      });
      toast.success('User removed as admin successfully!');
      dispatch(fetchCompanyById(companyId));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleDownloadResults = async (companyId, userId, format) => {
    try {
      const response = await CompanyService.geCompanyUsersResults(
        format,
        companyId,
        userId,
      );
      downloadResults(response, format);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '8px',
        mb: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user?.avatar || '/path/to/default/avatar.png'}
          alt={`${user?.name} avatar`}
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="body2">{user?.username}</Typography>
        {lastTestTaken && (
          <Typography variant="body2">
            {t('companyProfilePage.lastTimeTaken')}{' '}
            {new Date(lastTestTaken).toLocaleString()}
          </Typography>
        )}
      </Box>
      {isOwner && (
        <>
          <Button
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ color: 'inherit', width: 32, height: 32 }}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleRemoveMember}>
              {t('companyProfilePage.userRemove')}
            </MenuItem>
            {isAdmin ? (
              <>
                <MenuItem onClick={handleRemoveAdmin}>
                  {t('companyProfilePage.adminRemove')}
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleAppointAdmin}>
                {t('companyProfilePage.adminAppoint')}
              </MenuItem>
            )}
            <MenuItem onClick={handleShowChart}>
              {t('companyProfilePage.show')} {user?.username}{' '}
              {t('companyProfilePage.analytics')}
            </MenuItem>
            <MenuItem
              onClick={() => handleDownloadResults(companyId, userId, 'csv')}
            >
              {t('companyProfilePage.exportCsv')}
            </MenuItem>
            <MenuItem
              onClick={() => handleDownloadResults(companyId, userId, 'json')}
            >
              {t('companyProfilePage.exportJson')}
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default CompanyProfileUser;

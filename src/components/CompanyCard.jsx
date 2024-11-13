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
import { useDispatch } from 'react-redux';
import { leaveCompany } from '../store/companies/companies.actions';
import UniversalModal from './UniversalModal';

const CompanyCard = ({ company, isUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleCompanyPage = () => {
    navigate(`/companies/${company.id}`);
  };

  const handleLeaveCompany = () => {
    setModalOpen(true);
    dispatch(leaveCompany(company.id));
    handleMenuClose();
  };

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmLeave = () => {
    console.log('User left the company');
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
            {isUser ? (
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
                  <MenuItem onClick={handleCompanyPage}>Learn More</MenuItem>
                  <MenuItem onClick={handleLeaveCompany}>
                    Leave Company
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color={company.visible ? 'primary' : 'secondary'}
                onClick={handleCompanyPage}
              >
                Learn More
              </Button>
            )}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            Description: {company.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created at: {new Date(company.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      <UniversalModal
        open={modalOpen}
        onClose={handleCancelLeave}
        title="Leave Company"
        actions={
          <>
            <Button variant="contained" onClick={handleConfirmLeave}>
              Confirm Leave
            </Button>
            <Button onClick={handleCancelLeave}>Cancel</Button>
          </>
        }
      >
        <Typography variant="body1">
          Are you sure you want to leave this company?
        </Typography>
      </UniversalModal>
    </>
  );
};

export default CompanyCard;

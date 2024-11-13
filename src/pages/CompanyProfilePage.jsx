import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCompanyById } from '../store/companies/companies.selectors';
import {
  deleteCompany,
  fetchCompanyById,
  updateCompany,
} from '../store/companies/companies.actions';
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { selectLoading } from '../store/users/users.selectors';
import Loading from '../components/Loading';
import { currentUser } from '../store/auth/auth.slice';
import UniversalModal from '../components/UniversalModal';
import CompanyForm from '../components/CompanyForm';

const CompanyProfilePage = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const company = useSelector(selectCompanyById);
  const loading = useSelector(selectLoading);
  const currUser = useSelector(currentUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCompanyById(companyId));
  }, [dispatch, companyId]);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteCompany = () => {
    dispatch(deleteCompany(companyId));
    handleCloseDeleteModal();
  };

  const handleEditCompany = updatedData => {
    dispatch(updateCompany({ id: companyId, ...updatedData }));
    handleCloseEditModal();
  };

  if (loading || !company) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '2rem',
        mt: 4,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.members.length} members
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {company.description || 'No description available'}
          </Typography>
        </Box>
        {currUser === company.owner && (
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleOpenEditModal}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteModal}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Founded: {new Date(company.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visibility: {company.visible ? 'Public' : 'Private'}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Team Members
        </Typography>
        {company.members.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {company.members.map((member, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Avatar
                  src="/path/to/member/avatar.png"
                  alt={`${member.name} avatar`}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {member.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No members yet
          </Typography>
        )}
      </Box>

      {company.members.includes(currUser) === false ? (
        <Button variant="contained" color="primary" fullWidth>
          Request to Join
        </Button>
      ) : null}
      <UniversalModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Company"
      >
        <CompanyForm
          onSubmit={handleEditCompany}
          company={company}
          onClose={handleCloseEditModal}
        />
      </UniversalModal>
      <UniversalModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Company"
        actions={
          <>
            <Button onClick={handleCloseDeleteModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteCompany} color="error">
              Confirm Delete
            </Button>
          </>
        }
      >
        <Typography>
          Are you sure you want to delete this company? This action cannot be
          undone.
        </Typography>
      </UniversalModal>
    </Box>
  );
};

export default CompanyProfilePage;

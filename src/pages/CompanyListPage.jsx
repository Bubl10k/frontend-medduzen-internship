import { Box, Button, Container, Pagination, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import UniversalModal from '../components/UniversalModal';
import CompanyForm from '../components/CompanyForm';
import CompanyCard from '../components/CompanyCard';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCompany,
  fetchCompanies,
} from '../store/companies/companies.actions';
import {
  selectCompaniesState,
} from '../store/companies/companies.selectors';

const CompanyListPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, companies, count } = useSelector(selectCompaniesState);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const companiesPerPage = 5;

  useEffect(() => {
    dispatch(fetchCompanies(page));
  }, [dispatch, page]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateCompany = async data => {
    await dispatch(createCompany(data));
    handleCloseModal();
  };

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('companyListPage.title')}
      </Typography>
      <Typography
        variant="h6"
        sx={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        {t('companyListPage.description')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          {t('companyListPage.create')}
        </Button>
      </Box>
      {companies
        .filter(company => company.visible)
        .map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      <UniversalModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={t('companyForm.create')}
      >
        <CompanyForm
          onSubmit={handleCreateCompany}
          onClose={handleCloseModal}
        />
      </UniversalModal>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <Pagination
          count={Math.ceil(count / companiesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default CompanyListPage;

import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { currentUser } from '../store/auth/auth.slice';
import { useTranslation } from 'react-i18next';

const CompanyForm = ({ onSubmit, company }) => {
  const { t } = useTranslation();
  const currUser = useSelector(currentUser);
  const [formData, setFormData] = useState({
    name: company ? company.name : '',
    description: company ? company.description : '',
    owner: currUser,
    visible: company ? company.visible : true,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'visible' ? value === 'true' : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...formData,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label={t("companyForm.companyName")}
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="description"
        label={t("companyForm.companyDescription")}
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t("companyForm.visibilityMode")}</InputLabel>
        <Select
          name="visible"
          value={formData.visible.toString()}
          onChange={handleChange}
          label="Visibility Mode"
        >
          <MenuItem value="true">{t("companyForm.public")}</MenuItem>
          <MenuItem value="false">{t("companyForm.private")}</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {company ? t("companyForm.update") : t("companyForm.create")}
      </Button>
    </form>
  );
};

export default CompanyForm;

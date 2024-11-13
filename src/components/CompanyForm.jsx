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

const CompanyForm = ({ onSubmit, company }) => {
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
        label="Company Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Visibility Mode</InputLabel>
        <Select
          name="visible"
          value={formData.visible.toString()}
          onChange={handleChange}
          label="Visibility Mode"
        >
          <MenuItem value="true">Public</MenuItem>
          <MenuItem value="false">Private</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {company ? 'Update Company' : 'Create Company'}
      </Button>
    </form>
  );
};

export default CompanyForm;

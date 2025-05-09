import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setText } from '../store/text/text.slice';
import { Box, Button, TextField } from '@mui/material';

const UpdateText = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleUpdateText = () => {
    dispatch(setText(inputValue));
    setInputValue('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 2,
      }}
    >
      <TextField
        label="Update Text"
        value={inputValue}
        onChange={handleInputChange}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleUpdateText}>
        Update Text
      </Button>
    </Box>
  );
};

export default UpdateText;

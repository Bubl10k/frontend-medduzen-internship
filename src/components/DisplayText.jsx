import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const DisplayText = () => {
  const text = useSelector(state => state.text.text);

  return <Typography sx={{ marginTop: 2 }} variant="h5">{text}</Typography>;
};

export default DisplayText;

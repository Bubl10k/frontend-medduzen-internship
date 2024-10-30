import { Box, CircularProgress } from '@mui/material';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const Loading = () => {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;

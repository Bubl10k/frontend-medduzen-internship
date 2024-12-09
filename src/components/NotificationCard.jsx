import { useDispatch } from 'react-redux';
import { markAsRead } from '../store/notifications/notifications.actions';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NotificationCard = ({ notification }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    dispatch(markAsRead(notification.id));
  };

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
      }}
    >
      <Typography variant="body1">{notification.text}</Typography>
      <Button variant="contained" onClick={handleMarkAsRead} color="primary">
        {t('notifications.markAsRead')}
      </Button>
    </Box>
  );
};

export default NotificationCard;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNotifications } from '../store/notifications/notifications.actions';
import Loading from '../components/Loading';
import { Box, Container, Typography } from '@mui/material';
import { selectNotificationsState } from '../store/notifications/notifications.slice';
import NotificationCard from '../components/NotificationCard';
import { useTranslation } from 'react-i18next';

const NotificationsPage = () => {
  const { t } = useTranslation();
  const { notifications, loading } = useSelector(selectNotificationsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('notifications.title')}
      </Typography>

      {notifications.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>{t('notifications.noNotifications')}</Typography>
      )}
      <Box sx={{ mt: 5 }}>
        {!loading &&
          notifications.length > 0 &&
          notifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
      </Box>
    </Container>
  );
};

export default NotificationsPage;

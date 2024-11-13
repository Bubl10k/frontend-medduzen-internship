import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UniversalModal = ({ open, onClose, title, children, actions }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        {title && (
          <DialogTitle id="modal-title">
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          </DialogTitle>
        )}

        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {actions ? (
            actions
          ) : (
            <Button onClick={onClose} color="primary">
              {t('modal.close')}
            </Button>
          )}
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default UniversalModal;

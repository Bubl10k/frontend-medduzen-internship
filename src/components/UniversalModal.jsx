import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UniversalModal = ({ open, onClose, title, children, actions }) => {
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

        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          {actions ? (
            actions
          ) : (
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default UniversalModal;
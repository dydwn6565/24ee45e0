import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackBar = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Snackbar 자동으로 6초 후 사라짐
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity || 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
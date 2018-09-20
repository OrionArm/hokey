import React, { SFC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

type Props = { open: boolean, close(): void, confirm(): void };
const ConfirmDeleteModal: SFC<Props> = ({ open, close, confirm }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Attention'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete logo? All existing drills will use this
          logo until you'll generate them again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        variant="contained"
        <Button
          onClick={confirm}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Ok
        </Button>
        <Button
          onClick={close}
          variant="contained"
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;

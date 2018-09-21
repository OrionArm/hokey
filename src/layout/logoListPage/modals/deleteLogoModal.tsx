import React, { SFC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

type Props = {
  open: boolean;
  modalName: string,
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
};
const DeleteLogoModal: SFC<Props> = ({ open, modalName, item, close, confirm }) => {
  const onClose = () => close(modalName);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Attention</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete logo? All existing drills will use
          this logo until you'll generate them again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={confirm}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Ok
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLogoModal;

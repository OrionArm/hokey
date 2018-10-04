import React, { SFC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

type Props = {
  open: boolean;
  modalName: string;
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
};
const DeleteLogoModal: SFC<Props> = ({
  open,
  modalName,
  item,
  close,
  confirm,
}) => {
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
        Are you sure you want to delete logo? All existing drills will use this
        logo until you'll generate them again.
      </DialogContent>
      <DialogActions>
        <Button onClick={confirm} variant="contained" color="primary" autoFocus>
          Delete
        </Button>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLogoModal;

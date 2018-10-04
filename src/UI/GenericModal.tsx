import React, { SFC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

type Props = {
  modalName: string;
  open: boolean;
  close(modalName: string): void;
  title: string;
  buttons: any;
};

export const GenericModal: SFC<Props> = ({
  open,
  close,
  modalName,
  title,
  buttons: Buttons,
  children,
}) => {
  const onClose = (): void => close(modalName);
  return (
    <Dialog
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Buttons />
      </DialogActions>
    </Dialog>
  );
};

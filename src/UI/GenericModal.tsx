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
      <DialogTitle
        style={{ padding: 20, fontWeight: 400 }}
        id="form-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent
        style={{
          padding: 20,
          paddingBottom: 30,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {children}
      </DialogContent>
      <DialogActions style={{ padding: 20, margin: 0 }}>
        <Buttons />
      </DialogActions>
    </Dialog>
  );
};

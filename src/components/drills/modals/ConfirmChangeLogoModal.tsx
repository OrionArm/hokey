import React, { SFC } from 'react';
import { Button, withStyles, Typography, Theme } from '@material-ui/core';
import { GenericModal } from 'src/UI';

type Props = {
  open: boolean;
  close(modalName: string): void;
  confirm(): void;
  classes?: any;
  modalName: string;
};

const ConfirmChangeLogoModal: SFC<Props> = ({ open, confirm, close, modalName }) => {
  const handleClose = () => close(modalName);
  const Buttons     = () => (
    <>
      <Button
        onClick={confirm}
        variant="contained"
        color="primary"
        autoFocus
        style={{ marginRight: 16 }}
      >
        Generate
      </Button>
      <Button onClick={handleClose} variant="contained">
        Cancel
      </Button>
    </>
  );
  const Content     = () => (
    <Typography variant="subheading">
      Logo will be changed after video generation. Generate video?
    </Typography>
  );

  return (
    <GenericModal
      modalName={modalName}
      open={open}
      close={close}
      title="Attention"
      buttons={Buttons}
    >
      <Content/>
    </GenericModal>
  );
};

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: '15px 0',
  },
});

export default withStyles(styles)(ConfirmChangeLogoModal);

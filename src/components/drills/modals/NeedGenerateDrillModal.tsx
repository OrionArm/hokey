import React, { SFC } from 'react';
import { Button, withStyles, Typography, Theme } from '@material-ui/core';
import { GenericModal } from 'src/UI';

type Props = {
  open: boolean;
  close(modalName: string): void;
  classes?: any;
  modalName: string;
};

const NeedGenerateDrillModal: SFC<Props> = ({ open, close, modalName }) => {
  const handleClose = () => close(modalName);
  const Buttons     = () => (
      <Button
        onClick={handleClose}
        variant="contained"
        color="primary"
        autoFocus
        style={{ marginRight: 16 }}
      >
        Ok
      </Button>
  );
  const Content     = () => (
    <Typography variant="subheading">
      At first you need create animation!
    </Typography>
  );

  return (
    <GenericModal
      modalName={modalName}
      open={open}
      close={close}
      title="You can't add logo on this drill"
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

export default withStyles(styles)(NeedGenerateDrillModal);

import React, { Component } from 'react';
import { Button, withStyles, Typography, Theme } from '@material-ui/core';
import { GenericModal } from 'src/UI';

type Props = {
  open: boolean;
  close(): void;
  confirm(): void;
  classes?: any;
};
class ConfirmChangeLogoModal extends Component<Props, object> {
  render() {
    const { open, confirm, close } = this.props;
    const Buttons = () => (
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
        <Button onClick={close} variant="contained">
          Cancel
        </Button>
      </>
    );
    const Content = () => (
      <Typography variant="subheading">
        Logo will be changed after video generation. Generate video?
      </Typography>
    );

    return (
      <GenericModal
        modalName="ConfirmChangeLogoModal"
        open={open}
        close={close}
        title="Attention"
        buttons={Buttons}
      >
        <Content />
      </GenericModal>
    );
  }
}

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: '15px 0',
  },
});

export default withStyles(styles)(ConfirmChangeLogoModal);

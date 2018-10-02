import React, { Component } from 'react';
import {
  Button, withStyles, Typography, Theme,
} from '@material-ui/core';
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
    const Buttons  = () =>
      <>
        <Button
          onClick={confirm}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Ok
        </Button>
        <Button onClick={close} variant="contained" color="primary">
          Cancel
        </Button>
      </>;
    const Content  = () =>
      <Typography variant="subheading" gutterBottom align="center" color={'error'}>
        For use this logo need regenerate drill!
      </Typography>;

    return (
      <GenericModal
        modalName="ConfirmChangeLogoModal"
        open={open}
        close={close}
        title="Regenerate this drill?"
        buttons={Buttons}
      >
        <Content/>
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

import React, { Component } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

type Props = { addLogo(): void };
class HeaderLogo extends Component<Props> {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <>
        <Typography variant="headline">My Logos</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          new logos
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            variant="contained"
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default HeaderLogo;

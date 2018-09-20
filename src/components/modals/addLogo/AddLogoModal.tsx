import React, { ChangeEvent, Component } from 'react';
import ModalJuggler from 'src/UI/modal-juggler/ModalJuggler';
import { ModalNames } from 'src/modal-juggler/interface';
import { hideAllModal } from 'src/modal-juggler/modalTriggers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, Input, InputLabel, withStyles, Paper, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from 'src/store/rootReducers';
import { compose, Dispatch } from 'redux';
import { logosActions } from 'src/logos/actions';
import InCenter from 'src/UI/InCenter';

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  uploadInput: {
    display: 'none',
  },
  input: {
    margin: '15px 0',
  },
});
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;
type Props = { classes?: any; } & injectDispatchProps & injectStateProps;
type State = Readonly<{ file?: File, logoName: string }>;
const initialState = { file: undefined, logoName: '' };

class AddLogoModal extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { classes } = this.props;
    return (
      <ModalJuggler
        name={ModalNames.addLogo}
        useOnRequestClose={true}
      >
        <Dialog
          fullWidth
          open={true}
          maxWidth={'sm'}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{'Upload logo'}</DialogTitle>
          <DialogContent>
            <Paper elevation={4}>
              <Typography variant="subheading" gutterBottom align="center">
                Use only *.png files 610*360px max size
              </Typography>
              <InCenter>
                <input
                  accept="image/*"
                  className={classes.uploadInput}
                  id="outlined-button-file"
                  type="file"
                  onChange={this.onUploadFiles}
                />
                <label htmlFor="outlined-button-file">
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    className={classes.button}
                  >
                    Upload
                  </Button>
                </label>
              </InCenter>
            </Paper>
            <FormControl
              className={classes.spacing}
              fullWidth
            >
              <InputLabel
                FormLabelClasses={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
                htmlFor="LogoName-input"
              >
                Enter logo name
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                id="LogoName-input"
                onChange={this.onChangeName}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.button}
              onClick={this.onSubmit}
              disabled={!this.state.file}
            >
              Add this logo
            </Button>

            <Button onClick={this.onClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ModalJuggler>
    );
  }

  onClose = () => {
    hideAllModal();
  }
  onUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      this.setState({ file, logoName: file.name });
    }
  }
  onChangeName  = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ logoName: e.currentTarget.value });
  }
  onSubmit = () => {
    const { file } = this.state;
    if (file) {
      this.props.addLogo(file);
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLogo: (file: File) => dispatch(logosActions.addLogosRequest({ image: file })),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AddLogoModal);

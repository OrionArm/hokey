import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import {
Button,
Dialog,
DialogActions,
DialogContent,
DialogTitle, FormControl, Input, InputLabel, withStyles, Paper, Typography,
} from '@material-ui/core';

import ModalJuggler from 'src/UI/modal-juggler/ModalJuggler';
import { ModalNames } from 'src/modal-juggler/interface';
import { hideAllModal } from 'src/modal-juggler/modalTriggers';
import { RootState } from 'src/store/rootReducers';
import { logosActions } from 'src/logos/actions';
import InCenter from 'src/UI/InCenter';
import FileLoadButton from 'src/UI/FileLoadButton';

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: '15px 0',
  },
});

enum fileError {
  notChecked         = 0,
  incorrectExtension = 1,
  correctExtension   = 2,
}

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;
type Props = { classes?: any; } & injectDispatchProps & injectStateProps;
type State = Readonly<{ file?: File | null, fileValid: fileError, logoName: string, preview: any }>;
const initialState: State = {
  file: null,
  fileValid: fileError.notChecked,
  logoName: '',
  preview: null,
};

class AddLogoModal extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { classes }                  = this.props;
    const { preview, file, fileValid } = this.state;
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
              {
                fileValid === fileError.incorrectExtension
                  ? <Typography variant="subheading" gutterBottom align="center" color={'error'}>
                    You can load only PNG file
                  </Typography>
                  : null
              }
              <InCenter>
                {
                  file && preview
                    ?
                    <img src={preview} height={200}/>
                    :
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                      <FileLoadButton onClick={this.onUploadFiles}/>
                    </div>
                }
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
                value={this.state.logoName}
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

  onClose       = (): void => {
    this.setState({ file: undefined, preview: undefined, logoName: '' });
    hideAllModal();
  }
  onUploadFiles = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      const preview            = URL.createObjectURL(file);
      const logoName           = file.name;
      const validateExtensions = logoName.endsWith('.png');
      if (validateExtensions) {
        this.setState({
          file, preview, logoName,
          fileValid: fileError.correctExtension,
        });
      } else {
        this.setState({ fileValid: fileError.incorrectExtension });
      }
    }
  }
  onChangeName  = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ logoName: e.currentTarget.value });
  }
  onSubmit  = (): void => {
    const { file } = this.state;
    if (file) {
      this.props.addLogo(file);
      setTimeout(() => this.onClose(), 500);
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

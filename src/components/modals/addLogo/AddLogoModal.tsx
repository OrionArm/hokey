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
import FileLoadButton from 'src/UI/FileLoadButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

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

// TODO: handle closing modal by escape click
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
          className={'modal-dialog'}
        >
          <DialogTitle
            className={'modal-dialog__title'}
            id="form-dialog-title"
          >
            {'Upload logo'}
          </DialogTitle>
          <DialogContent className={'modal-dialog__body'}>
            <Paper elevation={4} className={'img-uploader'}>

              {
                fileValid === fileError.incorrectExtension
                  ? <Typography variant="subheading" gutterBottom align="center" color={'error'}>
                    You can load only PNG file
                  </Typography>
                  : null
              }
              {
                file && preview
                  ?
                  <>
                    <img className={'img-uploader__preview'} src={preview} height={200}/>
                    {/*TODO: clear img input by click*/}
                    <div className={'img-uploader__remove'}>
                      <FontAwesomeIcon icon={faTimes} className={'img-uploader__icon'}/>
                    </div>
                  </>
                  :
                  <div className={'img-uploader__hint uploader-hint'}>
                    {/*<span className={'uploader-hint__picture'}  />*/}
                    <FontAwesomeIcon icon={faCloudUploadAlt} className={'uploader-hint__picture'}/>
                    <span className={'uploader-hint__text'}>
                      Use only *.png files 610*360px max size
                    </span>
                    <FileLoadButton onClick={this.onUploadFiles}/>
                  </div>
              }
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
                className={'img-uploader__label'}
                htmlFor="LogoName-input"
              >
                Enter logo name
              </InputLabel>
              <Input
                classes={{
                  underline: classes.cssUnderline,
                }}
                className={'img-uploader__name-input'}
                value={this.state.logoName}
                id="LogoName-input"
                onChange={this.onChangeName}
              />
            </FormControl>
          </DialogContent>
          <DialogActions className={'modal-dialog__footer'}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={'modal-btn'}
              onClick={this.onSubmit}
              disabled={!this.state.file}
            >
              Upload
            </Button>

            <Button className={'modal-btn'} onClick={this.onClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ModalJuggler>
    );
  }

  onClose = (): void => {
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
  onSubmit      = (): void => {
    const { file, logoName } = this.state;

    if (file) {
      this.props.addLogo({ image: file, name: logoName });
      setTimeout(() => this.onClose(), 500);
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLogo: (payload: { image: File, name: string }) => dispatch(
    logosActions.addLogosRequest({ image: payload.image, name: payload.name }),
  ),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AddLogoModal);

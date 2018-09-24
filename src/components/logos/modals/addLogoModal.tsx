import React, { ChangeEvent, Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Paper, FormControl, InputLabel, Input, withStyles, Typography,
} from '@material-ui/core';
import { LogoModel } from 'src/components/logos/store/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import FileLoadButton from 'src/UI/FileLoadButton';
enum fileError {
  notChecked         = 0,
  incorrectExtension = 1,
  correctExtension   = 2,
}

type Props = {
  open: boolean;
  modalName: string,
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
  classes?: any;
};
type State = Readonly<{
  file?: File | null,
  fileValid: fileError,
  logoName: string,
  preview: any,
  logo: LogoModel | null,
}>;

const initialState: State = {
  file: null,
  fileValid: fileError.notChecked,
  logoName: '',
  preview: null,
  logo: null,
};

class AddLogoModal extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { open, classes }            = this.props;
    const { preview, file, fileValid } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
    );
  }

  onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.currentTarget.value;
    this.setState({ logoName: name });
  }

  onClose       = (): void => {
    this.setState({ file: undefined, preview: undefined, logoName: '' });
    this.props.close(this.props.modalName);
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

  onSubmit      = (): void => {
    const { file, logoName } = this.state;

    if (file) {
      this.props.confirm({ image: file, name: logoName });
      setTimeout(() => this.onClose(), 500);
    }
  }
}

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: '15px 0',
  },
});

export default withStyles(styles)(AddLogoModal);

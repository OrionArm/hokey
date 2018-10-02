import React, { ChangeEvent, Component } from 'react';
import {
  Button, Paper, FormControl,
  InputLabel, Input, withStyles, Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

import { LogoModel } from 'src/store/logos/model';
import FileLoadButton from 'src/UI/FileLoadButton';
import { GenericModal } from 'src/UI';

enum fileError {
  notChecked         = 0,
  valid              = 1,
  incorrectExtension = 2,
  incorrectImageSize = 3,
}

type Props = {
  open: boolean;
  modalName: string;
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
  classes?: any;
};
type State = Readonly<{
  file?: File | null;
  fileValid: fileError;
  logoName: string;
  preview: any;
  logo: LogoModel | null;
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
    const { open, classes, modalName } = this.props;
    const { preview, file, fileValid } = this.state;
    const Buttons                      = () => <>
      <Button
        variant="contained"
        color="primary"
        component="span"
        className="modal-btn"
        onClick={this.onSubmit}
        disabled={!this.state.file}
      >
        Upload
      </Button>
      <Button className="modal-btn" onClick={this.onClose}>
        Close
      </Button>
    </>;
    const Content                      = () => <>
      <Paper elevation={4} className={'img-uploader'}>
        {
          fileValid === fileError.incorrectExtension
            ? <Typography variant="subheading" gutterBottom align="center" color={'error'}>
              You can load only PNG file
            </Typography>
            : null
        }
        {
          fileValid === fileError.incorrectImageSize
            ? <Typography variant="subheading" gutterBottom align="center" color={'error'}>
              You can load files 610*360px max size
            </Typography>
            : null
        }
        {
          file && preview
            ?
            <>
              <img className={'img-uploader__preview'} src={preview} height={200}/>
              {/*TODO: clear img input by click*/}
            </>
            :
            <div className={'img-uploader__hint uploader-hint'} style={{ height: 200, width: 338 }}>
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
        style={{ marginTop: 8 }}
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
          autoFocus
        />
      </FormControl>
    </>;
    return (
      <GenericModal
        modalName={modalName}
        open={open}
        close={this.onClose}
        title="Upload logo"
        buttons={Buttons}
      >
        <Content/>
      </GenericModal>
    );
  }

  onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.currentTarget.value;
    this.setState({ logoName: name });
  }

  onClose = (): void => {
    this.setState({ file: undefined, preview: undefined, logoName: '' });
    this.props.close(this.props.modalName);
  }

  onUploadFiles = (e: ChangeEvent<HTMLInputElement>): void => {
    const file          = e.currentTarget.files && e.currentTarget.files[0];
    const allowableSize = { width: 610, height: 360 };
    if (file) {
      const preview            = URL.createObjectURL(file);
      const logoName           = file.name;
      const validateExtensions = logoName.endsWith('.png');
      const validateSize       = validateImage(file, allowableSize);
      validateSize.then(validSize => {
        if (!validSize) this.setState({ fileValid: fileError.incorrectImageSize });
        if (!validateExtensions) this.setState({ fileValid: fileError.incorrectExtension });
        if (validateExtensions && validSize) {
          this.setState({
            file,
            preview,
            logoName,
            fileValid: fileError.valid,
          });
        }
      });
    }
  }

  onSubmit = (): void => {
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

async function validateImage(file: File, options: ImageSettings): Promise<boolean> {
  const imageOptions = await getImageSize(file);
  if ((options.width >= imageOptions.width)
    && (options.height >= imageOptions.height)
    && imageOptions.width !== 0 && imageOptions.height !== 0) {
    return true;
  }
  return false;
}

type ImageSettings = { width: number, height: number };

function getImageSize(file: File): Promise<ImageSettings> {
  return new Promise((res, rej) => {
    if (file) {
      const img = new Image();
      try {
        img.onload = () => {
          const width  = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;

          return res({ width, height });
        };
        img.src    = URL.createObjectURL(file);
      } catch (err) {
        return rej(err);
      }
    } else {
      const error = new Error('You must load file');
      return rej(error);
    }
  });

}

export default withStyles(styles)(AddLogoModal);

import React, { ChangeEvent, Component } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  withStyles,
  Typography,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

import { LogoModel } from 'src/store/logos/model';
import FileLoadButton from 'src/UI/FileLoadButton';
import { GenericModal } from 'src/UI';

enum fileError {
  notChecked = 0,
  valid = 1,
  incorrectExtension = 2,
  incorrectImageSize = 3,
}

type Props = {
  theme: Theme;
  open: boolean;
  modalName: string;
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
} & WithStyles<typeof styles>;

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
    const { open, classes, theme, modalName } = this.props;
    const { preview, file, fileValid } = this.state;
    const Buttons = () => (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={this.onSubmit}
          disabled={!this.state.file}
          style={{ marginRight: 8 }}
        >
          Upload
        </Button>
        <Button variant="contained" onClick={this.onClose}>
          Cancel
        </Button>
      </>
    );
    const Content = () => (
      <>
        <div style={{ border: theme.custom.border }}>
          {fileValid === fileError.incorrectExtension ? (
            <Typography variant="subheading" align="center" color={'error'}>
              You can load only PNG file
            </Typography>
          ) : null}
          {fileValid === fileError.incorrectImageSize ? (
            <Typography variant="subheading" align="center" color={'error'}>
              You can load files 610*360px max size
            </Typography>
          ) : null}
          {file && preview ? (
            <>
              <img style={{ maxWidth: '100%', height: 'auto' }} src={preview} />
            </>
          ) : (
            <div className={classes.wrapperUpload}>
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className={classes.icon}
              />
              <p className={classes.text}>
                Use only *.png files 610*360px max size
              </p>
              <FileLoadButton onClick={this.onUploadFiles} />
            </div>
          )}
        </div>
        <FormControl className={classes.spacing} fullWidth>
          <InputLabel htmlFor="LogoName-input">Logo title</InputLabel>
          <Input
            value={this.state.logoName}
            id="LogoName-input"
            onChange={this.onChangeName}
            autoFocus
          />
        </FormControl>
      </>
    );
    return (
      <GenericModal
        modalName={modalName}
        open={open}
        close={this.onClose}
        title="Upload logo"
        buttons={Buttons}
      >
        <Content />
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
    const file = e.currentTarget.files && e.currentTarget.files[0];
    const allowableSize = { width: 610, height: 360 };
    if (file) {
      const preview = URL.createObjectURL(file);
      const logoName = file.name;
      const validateExtensions = logoName.endsWith('.png');
      const validateSize = validateImage(file, allowableSize);
      validateSize.then(validSize => {
        if (!validSize) {
          this.setState({ fileValid: fileError.incorrectImageSize });
        }
        if (!validateExtensions) {
          this.setState({ fileValid: fileError.incorrectExtension });
        }
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

async function validateImage(
  file: File,
  options: ImageSettings,
): Promise<boolean> {
  const imageOptions = await getImageSize(file);
  if (
    options.width >= imageOptions.width &&
    options.height >= imageOptions.height &&
    imageOptions.width !== 0 &&
    imageOptions.height !== 0
  ) {
    return true;
  }
  return false;
}

type ImageSettings = { width: number; height: number };

function getImageSize(file: File): Promise<ImageSettings> {
  return new Promise((res, rej) => {
    if (file) {
      const img = new Image();
      try {
        img.onload = () => {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;

          return res({ width, height });
        };
        img.src = URL.createObjectURL(file);
      } catch (err) {
        return rej(err);
      }
    } else {
      const error = new Error('You must load file');
      return rej(error);
    }
  });
}

const styles = (theme: Theme) =>
  createStyles({
    wrapperUpload: {
      height: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    icon: {
      height: 50,
      width: '80px !important',
      color: '#DEE2E6',
    },
    text: {
      fontFamily: 'Poppins,sans-serif',
      fontSize: 12,
      lineHeight: ' 18px',
      fontWeight: 300,
      margin: 0,
    },
    spacing: {
      marginTop: theme.spacing.unit,
    },
  });

export default withStyles(styles, { withTheme: true })(AddLogoModal);

import React, { ChangeEvent } from 'react';
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

const AddLogoModal: React.SFC<Props> = ({ addLogo, classes }) => {
  const onClose       = () => {
    hideAllModal();
  };
  const onUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      console.log('file', file);
      addLogo(file);
    }
  };
  const onChangeName  = () => {

  };

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
              onChange={onChangeName}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <input
            accept="image/*"
            className={classes.uploadInput}
            id="outlined-button-file"
            type="file"
            onChange={onUploadFiles}
          />
          <label htmlFor="outlined-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.button}
            >
              Upload
            </Button>
          </label>

          <Button onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ModalJuggler>
  );
};

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

import React, { ChangeEvent } from 'react';
import ModalJuggler from 'src/UI/modal-juggler/ModalJuggler';
import { ModalNames } from 'src/modal-juggler/interface';
import { hideAllModal } from 'src/modal-juggler/modalTriggers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper, withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from 'src/store/rootReducers';
import { compose, Dispatch } from 'redux';
import { logosActions } from 'src/logos/actions';

const styles = (theme: any) => {
  uploadInput: {
    opacity: 0;
    visibility: 'hidden';
  }
};
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;
type Props = { classes?: any; } & injectDispatchProps & injectStateProps;

const AddLogoModal: React.SFC<Props> = ({ addLogo }) => {
  const onClose       = () => {
    hideAllModal();
  };
  const onUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('file', e.target.files);
      addLogo(e.target.files);
      // let files = [];
      // // tslint:disable-next-line
      // for (let i = 0; i < e.target.files.length; i++) {
      //   files = files.concat(e.target.files[i]);
      // }
      // if (files.length) {
      //   this.props.actions.uploadImagesRequest(files);
      // }
    }
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
        <Paper elevation={4}>
          <DialogContent>
            {/*{children}*/} КОНТЕНТ
          </DialogContent>
          <DialogActions>
            {/*{*/}
            {/*actions.map((action, index) => (*/}
            {/*<Button key={index} onClick={action.onClick} color={action.color}>*/}
            {/*{action.title}*/}
            {/*</Button>*/}
            {/*))*/}
            {/*}*/}
            <Button
              color="primary"
              variant="contained"
            >
              Upload
              <input
                style={{ opacity: 0 }}
                id="upload"
                type="file"
                multiple
                onChange={onUploadFiles}
              />
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </ModalJuggler>
  );
};

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addLogo: (file: FileList) => dispatch(logosActions.addLogosRequest({ images: file })),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AddLogoModal);

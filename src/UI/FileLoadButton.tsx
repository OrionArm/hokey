import React, { ChangeEvent } from 'react';
import {
  Button,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    uploadInput: {
      display: 'none',
    },
    uploadBtn: {
      fontSize: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
  });

interface IFileLoadButton extends WithStyles<typeof styles> {
  onClick(e: ChangeEvent<HTMLInputElement>): void;
}

const FileLoadButton: React.SFC<IFileLoadButton> = ({ classes, onClick }) => {
  return (
    <>
      <input
        accept="image/*"
        className={classes.uploadInput}
        id="outlined-button-file"
        type="file"
        onChange={onClick}
      />
      <label htmlFor="outlined-button-file">
        <Button disableRipple component="span" className={classes.uploadBtn}>
          Upload
        </Button>
      </label>
    </>
  );
};

export default withStyles(styles)(FileLoadButton);

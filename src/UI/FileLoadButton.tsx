import React, { ChangeEvent } from 'react';
import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  uploadInput: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
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
        <Button
          variant="contained"
          color="secondary"
          component="span"
          className={'uploader-hint__button'}
        >
          Upload
        </Button>
      </label>
    </>
  );
};

export default withStyles(styles)(FileLoadButton);

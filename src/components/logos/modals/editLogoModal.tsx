import React, { ChangeEvent, Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Paper, FormControl, InputLabel, Input, withStyles,
} from '@material-ui/core';
import { LogoModel } from 'src/store/logos/model';

type Props = {
  open: boolean;
  modalName: string,
  item: any;
  close(modalName: string): void;
  confirm(item: any): void;
  classes?: any;
};
type State = Readonly<{ logo: LogoModel, preview: string | null, newName: string | null }>;

class EditLogoModal extends Component<Props, State> {
  readonly state: State = {
    logo: this.props.item,
    preview: null,
    newName: null,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.item) {
      const preview = props.item.url;
      return { ...state, preview, logo: props.item };
    }
    return state;
  }

  render() {
    const { open, classes } = this.props;
    const { preview }       = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">{'Edit logo'}</DialogTitle>
        <DialogContent>
          <Paper elevation={4}>
            {preview && <img src={preview} height={200}/>}
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
              defaultValue={this.state.logo && this.state.logo.name && this.state.logo.name}
              id="LogoName-input"
              onChange={this.onChangeName}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onConfirm}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Ok
          </Button>
          <Button onClick={this.onClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  onConfirm = () => this.props.confirm({ logo: this.state.logo, newName: this.state.newName });

  onClose = () => this.props.close(this.props.modalName);

  onChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.currentTarget.value;
    this.setState({ ...this.state, newName: name });
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

export default withStyles(styles)(EditLogoModal);

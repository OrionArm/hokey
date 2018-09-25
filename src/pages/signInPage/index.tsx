// tslint:disable-next-line:max-line-length
import { Button, FormControl, Grid, Input, InputLabel, Typography, withStyles } from '@material-ui/core';
import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import userActions from 'src/store/user/store/actions';

type State = Readonly<typeof initialState>;
type Props = { classes?: any } & injectProps;
const initialState = { username: '', password: '' };

class SignInPage extends Component<Props, State> {
  readonly state: State = initialState;

  public render() {
    const { classes } = this.props;
    return (
      <Grid
        classes={{ container: classes.formStyle }}
        container
        direction="column"
        component="form"
        onSubmit={this.handleSubmit}
      >
        <Typography variant="title">Sign In</Typography>
        <FormControl margin="dense">
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            htmlFor="UserName-input"
          >
            User name
          </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            id="UserName-input"
            value={this.state.username}
            onChange={this.handleNameChange}
          />
        </FormControl>
        <FormControl margin="dense">
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            htmlFor="custom-css-input"
          >
            Password
          </InputLabel>
          <Input
            classes={{
              underline: classes.cssUnderline,
            }}
            type="password"
            id="password-input"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormControl>
        <Button
          variant="extendedFab"
          color="secondary"
          type="submit"
          style={{ marginTop: 24 }}
        >
          Log in
        </Button>
      </Grid>
    );
  }

  private handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const loginData: ILoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginRequest(loginData);
  }
  private handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, username: event.target.value });
  }
  private handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, password: event.target.value });
  }
}

const styles = (theme: any) => {
  return {
    formStyle: {
      width: 400,
      padding: theme.spacing.unit * 4,
      margin: ' 0 auto',
      transform: 'translateY(50%)',
      boxShadow: theme.shadows[2],
      backgroundColor: '#fff',
    },
    cssLabel: {
      '&$cssFocused': {
        color: theme.palette.secondary.main,
      },
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: theme.palette.secondary.main,
      },
    },
  };
};

type injectProps = ReturnType<typeof mapDispatchToProps>;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginRequest: (userData: ILoginRequest) =>
    dispatch(userActions.loginRequest(userData)),
});

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(SignInPage),
);
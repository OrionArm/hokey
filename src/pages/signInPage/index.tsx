import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  withStyles,
  WithStyles,
  Theme,
} from '@material-ui/core';
import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import userActions from 'src/store/user/store/actions';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginRequest: (userData: ILoginRequest) =>
    dispatch(userActions.loginRequest(userData)),
});

type State = Readonly<typeof initialState>;
type Props = WithStyles<typeof styles> & injectProps;
const initialState = { username: '', password: '' };

class SignInPage extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { classes } = this.props;
    return (
      <Grid
        classes={{ container: classes.formStyle }}
        container
        direction="column"
        component="form"
        onSubmit={this.handleSubmit}
      >
        <Typography
          style={{ fontSize: '1.8rem', fontWeight: 300 }}
          variant="title"
        >
          Sign In
        </Typography>
        <FormControl margin="dense">
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            htmlFor="UserName-input"
          >
            Username
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
          style={{
            marginTop: 24,
            fontWeight: 300,
            fontSize: '1.2rem',
          }}
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

type injectProps = ReturnType<typeof mapDispatchToProps>;

const styles = (theme: Theme) => {
  return {
    formStyle: {
      width: 400,
      padding: theme.spacing.unit * 3,
      margin: '200px auto 0',
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.common.white,
    },

    cssLabel: {
      fontSize: '1rem',
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(SignInPage),
);

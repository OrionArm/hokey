import React, { ChangeEvent, Component } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Button,
  Input,
  withStyles,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { connect } from 'react-redux';
import userActions from 'src/user/actions';
import { Dispatch } from 'redux';

const fromStyle = {
  width: 400,
  padding: 30,
  margin: '200px auto 0',
};

const spacing = {
  margin: '15px 0',
};
const styles  = (theme: any) => {
  console.log(theme.palette);

  return {
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

type State = Readonly<typeof initialState>;
type Props = { classes?: any; };
type injectProps = ReturnType<typeof mapDispatchToProps>;
const initialState = { username: 'asdfasdf', password: '123456' };

class SignInPage extends Component<Props & injectProps, State> {
  readonly state: State = initialState;

  public render() {
    const { classes } = this.props;
    return (
      <Paper style={fromStyle}>
        <Grid container direction="column" component="form" onSubmit={this.handleSubmit}>
          <Typography variant="title">Sign In</Typography>
          <FormControl style={spacing}>
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
          <FormControl style={spacing}>
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
            variant="contained"
            color="secondary"
            type="submit"
            style={{ marginTop: 20 }}
          >
            Log in
          </Button>
        </Grid>
      </Paper>
    );
  }

  private handleSubmit         = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const loginData: ILoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.loginRequest(loginData);
  }
  private handleNameChange     = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, username: event.target.value });
  }
  private handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, password: event.target.value });
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginRequest: (userData: ILoginRequest) => dispatch(userActions.loginRequest(userData)),
});

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(SignInPage),
);

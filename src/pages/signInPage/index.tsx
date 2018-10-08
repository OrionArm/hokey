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
import { RootState } from 'src/store/rootReducers';

import userActions from 'src/store/user/store/actions';
import { Loading } from 'src/UI';
import InCenter from 'src/UI/InCenter';

const mapStateToProps = (state: RootState) => ({
  loading: state.user && state.user.loading,
  error: state.user.error,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginRequest: (userData: ILoginRequest) =>
    dispatch(userActions.loginRequest(userData)),
});

type State = Readonly<typeof initialState>;
type Props = WithStyles<typeof styles> & injectProps & injectStateProps;
const initialState = { username: '', password: '' };

class SignInPage extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { classes, loading } = this.props;
    const spinner = (
      <InCenter>
        <Loading />
      </InCenter>
    );

    const content = (
      <>
        <Typography
          style={{ fontSize: '1.8rem', fontWeight: 300 }}
          variant="title"
        >
          Sign In
        </Typography>
        <FormControl margin="dense">
          <InputLabel
            error={this.props.error}
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
            error={this.props.error}
            id="UserName-input"
            value={this.state.username}
            onChange={this.handleNameChange}
          />
        </FormControl>
        <FormControl margin="dense">
          <InputLabel
            error={this.props.error}
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
            error={this.props.error}
            id="password-input"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </FormControl>
        <Button
          variant="extendedFab"
          color="secondary"
          type="submit"
          disabled={
            this.state.password.length === 0 || this.state.username.length === 0
          }
          style={{
            marginTop: 24,
            fontWeight: 300,
            fontSize: '1.2rem',
          }}
          classes={{
            label: classes.textBtn,
          }}
        >
          Log in
        </Button>
      </>
    );

    return (
      <Grid
        classes={{ container: classes.formStyle }}
        container
        direction="column"
        component="form"
        onSubmit={this.handleSubmit}
      >
        {loading ? spinner : content}
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

const styles = (theme: Theme) => {
  return {
    formStyle: {
      width: 400,
      height: 280,
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
    textBtn: {
      fontFamily: 'Poppins,sans-serif',
    },
  };
};

type injectProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SignInPage),
);

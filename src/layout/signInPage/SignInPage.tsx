import React, { Component } from 'react';
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

export interface SignInProps {
  classes?: any;
}

const fromStyle = {
  width: 400,
  padding: 30,
  margin: '200px auto 0',
};
const spacing = {
  margin: '15px 0',
};

const styles = (theme: any) => {
  console.log(theme);

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

class SignInPage extends Component<SignInProps, any> {
  public render() {
    const { classes } = this.props;
    return (
      <Paper style={fromStyle}>
        <Grid container direction="column" component="form">
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
            />
          </FormControl>
          <Button
            variant="extendedFab"
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
}

export default withStyles(styles, { withTheme: true })(SignInPage);

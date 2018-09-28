import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Toast from 'src/components/toast/Toast';
import PrivateRoute from 'src/pages/privateRoute';
import ProtectedContent from 'src/pages/protectedContent';
import SignInPage from 'src/pages/signInPage';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Toast />
        <Switch>
          <Redirect from="/" to="/drills" exact />
          <Route path="/login" component={SignInPage} />
          <PrivateRoute path="/" component={ProtectedContent} />
        </Switch>
      </>
    );
  }
}

export default App;

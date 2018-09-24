import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router';
import PrivateRoute from 'src/pages/privateRoute';
import ProtectedContent from 'src/pages/protectedContent';
import SignInPage from 'src/pages/signInPage/SignInPage';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
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

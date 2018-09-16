import React, { Component } from 'react';
import { Header } from 'src/layout/header';
import { SignInPage } from 'src/layout/signInPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';
import PrivateRoute from 'src/components/privateRoute/PrivateRoute';
import ProtectedContent from 'src/components/protectedContent/ProtectedContent';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline/>
        <Header/>
        <Switch>
          <Route path="/login" component={SignInPage} />
          <PrivateRoute path="/" component={ProtectedContent} />
        </Switch>
      </>
    );
  }
}

export default App;

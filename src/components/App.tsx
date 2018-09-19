import React, { Component } from 'react';
import { SignInPage } from 'src/layout/signInPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router';
import PrivateRoute from 'src/components/privateRoute/PrivateRoute';
import ProtectedContent from 'src/components/protectedContent/ProtectedContent';
import AddLogoModal from 'src/components/modals/addLogo/AddLogoModal';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <AddLogoModal />
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

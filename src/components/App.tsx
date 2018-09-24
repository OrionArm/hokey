import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router';
import PrivateRoute from 'src/pages/privateRoute';
import ProtectedContent from 'src/pages/protectedContent';
import AddLogoModal2 from 'src/components/logos/modals/AddLogoModal2';
import SignInPage from 'src/pages/signInPage/SignInPage';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <AddLogoModal2 />
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

import React, { Component } from 'react';
import { Header } from 'src/layout/header';
import { SignInPage } from 'src/layout/signInPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';
import LogoListPage from 'src/layout/logoListPage';
import DrillsPage from 'src/layout/drillsPage';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline/>
        <Header/>
        <Switch>
          <Route exact path="/" component={DrillsPage} />
          <Route path="/login" component={SignInPage} />
          <Route path="/logos" component={LogoListPage} />
        </Switch>
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Header } from 'src/layout/header';
import { Main } from 'src/layout/main';
import { SignInPage } from 'src/layout/signInPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline/>
        <Header/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={SignInPage} />
        </Switch>
      </>
    );
  }
}

export default App;

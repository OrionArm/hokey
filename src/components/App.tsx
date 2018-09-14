import React, { Component } from 'react';
import { Header } from 'src/layout/header';
import Main from 'src/layout/Main';
import { SignInPage } from 'src/layout/signInPage';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Header />
        <Main />
        <SignInPage />
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Header } from 'src/layout/header';
import { Main } from 'src/layout/main';
import { SignInPage } from 'src/layout/signInPage';

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
        <SignInPage/>
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Header from '../layout/Header';
import Main from '../layout/Main';
import SignInPage from '../layout/SignInPage';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <SignInPage />
      </>
    );
  }
}

export default App;

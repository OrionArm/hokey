import { AppBar, Toolbar } from '@material-ui/core';
import React, { Component } from 'react';
import { Logo } from 'src/UI';
import MainManu from '../mainMenu';
import Profile from './Profile';

type Props = {};

// ToDo(): connect to store, add user to button
class Header extends Component<Props, any> {
  public render() {
    return (
      <AppBar position="static">
        <Toolbar className={'app-toolbar'}>
          <Logo/>
          <Profile/>
        </Toolbar>
        <MainManu/>
      </AppBar>
    );
  }
}

export default Header;

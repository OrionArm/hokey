import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import Profile from './Profile';
import Logo from 'src/UI/Logo';
import MainManu from '../mainMenu/MainMenu';
interface HeaderProps {}

// ToDo(): connect to store, add user to button
class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <AppBar position="static">
        <Toolbar className={'app-toolbar'}>
          <Logo />
          <Profile />
        </Toolbar>
        <MainManu />
      </AppBar>
    );
  }
}

export default Header;

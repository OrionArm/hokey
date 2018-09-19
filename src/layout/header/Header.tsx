import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import Profile from './Profile';
import Logo from 'src/UI/Logo';
import MainManu from '../../components/MainMenu';
interface HeaderProps {}

// ToDo(): connect to store, add user to button
class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#4F5467' }}>
          <Logo />
          <Profile />
        </Toolbar>
        <MainManu />
      </AppBar>
    );
  }
}

export default Header;

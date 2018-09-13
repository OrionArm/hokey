import React, { Component } from 'react';

import Profile from './Profile';
import Logo from 'src/UI/Logo';
import MainMenu from 'src/components/mainMenu/MainMenu';
import { AppBar, Toolbar } from '@material-ui/core';
export interface HeaderProps {}

class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <AppBar position="static" style={{ backgroundColor: '#4F5467' }}>
        <Toolbar>
          <Logo />
          <Profile />
        </Toolbar>
        <MainMenu />
      </AppBar>
    );
  }
}

export default Header;

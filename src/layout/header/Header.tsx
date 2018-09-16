import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import Profile from './Profile';
import Logo from 'src/UI/Logo';
interface HeaderProps {}

class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <AppBar position="static" style={{ backgroundColor: '#4F5467' }}>
        <Toolbar>
          <Logo />
          <Profile />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;

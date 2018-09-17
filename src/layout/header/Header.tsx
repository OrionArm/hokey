import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import Profile from './Profile';
import Logo from 'src/UI/Logo';
import MainManu from '../../components/MainMenu';
interface HeaderProps {}

class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <AppBar position="static" style={{ backgroundColor: '#4F5467' }}>
        <Toolbar
          style={{
            flexWrap: 'wrap',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo />
          <Profile />
        </Toolbar>
        <MainManu />
      </AppBar>
    );
  }
}

export default Header;

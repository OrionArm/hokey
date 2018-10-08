import { AppBar, Toolbar } from '@material-ui/core';
import React, { Component } from 'react';
import { Logo } from 'src/UI';
import Profile from './Profile';
import LogoImg from 'src/assets/hockeyshare-logo.png';

type Props = {};

// ToDo(): connect to store, add user to button
class Header extends Component<Props, any> {
  public render() {
    return (
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: '#4F5467',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo LogoImg={LogoImg} />
          <Profile />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;

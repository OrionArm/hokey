import * as React from 'react';
import { HeaderWrapper, HeaderTop, HeaderBottom } from './styled';
import MainMenu from '../../components/MainMenu';
import Logo from '../../components/Logo';
import Profile from '../../components/Profile';

export interface HeaderProps {}

export default class Header extends React.Component<HeaderProps, any> {
  public render() {
    return (
      <HeaderWrapper>
        <HeaderTop>
          <Logo />
          <Profile />
        </HeaderTop>
        <HeaderBottom>
          <MainMenu />
        </HeaderBottom>
      </HeaderWrapper>
    );
  }
}

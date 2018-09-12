import React, { Component } from 'react';

import Profile from './Profile';
import styled from 'styled-components';
import Logo from 'src/UI/Logo';
import MainMenu from 'src/components/mainMenu/MainMenu';

export interface HeaderProps {
}

export default class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <HeaderWrapper>
        <HeaderTop>
          <Logo/>
          <Profile/>
        </HeaderTop>
        <HeaderBottom>
          <MainMenu/>
        </HeaderBottom>
      </HeaderWrapper>
    );
  }
}

export const HeaderWrapper = styled.header``;

export const HeaderTop = styled.div`
  background-color: ${props => props.theme.topHeaderColor};
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

export const HeaderBottom = styled.div`
  background-color: white;
  padding: 0 25px;
  height: 70px;
  display: flex;
  align-items: center;
`;

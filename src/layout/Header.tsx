import React, { Component } from 'react';
import { HeaderTop } from './Header.style';
export interface HeaderProps {}

export default class Header extends Component<HeaderProps, any> {
  public render() {
    return (
      <header>
        <HeaderTop>qwe</HeaderTop>
      </header>
    );
  }
}

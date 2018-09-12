import React, { Component } from 'react';
import { Input, BtnLogin, FormLogin, Caption } from './styled';

export interface SignInProps {
}

export default class SignInPage extends Component<SignInProps, any> {
  public render() {
    return (
      <FormLogin>
        <Caption>Sign In</Caption>
        <Input type="text" placeholder="User name"/>
        <Input type="password" placeholder="Password"/>
        <BtnLogin type="submit">Log in</BtnLogin>
      </FormLogin>
    );
  }
}

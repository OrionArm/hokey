import * as React from 'react';
// import { Typography } from '@material-ui/core';

export interface LogoProps {}

export default class Logo extends React.Component<LogoProps, any> {
  public render() {
    return (
      <div className={'app-toolbar__title'}>
        <div className={'app-toolbar__logo'} />
      </div>
    );
  }
}

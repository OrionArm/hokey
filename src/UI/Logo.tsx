import * as React from 'react';
import LogoImg from 'src/assets/hockeyshare-logo.png';
export interface LogoProps {}

export class Logo extends React.Component<LogoProps, any> {
  public render() {
    return <img src={LogoImg} title="logo image" width={250} />;
  }
}

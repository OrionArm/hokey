import * as React from 'react';
import LogoImg from 'src/assets/hockeyshare-logo.png';
export interface Props {
  LogoImg: React.ReactNode;
}

export class Logo extends React.Component<Props> {
  public render() {
    return <img src={LogoImg} title="logo image" width={250} />;
  }
}

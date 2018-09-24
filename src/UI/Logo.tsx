import * as React from 'react';

export interface LogoProps {}

export class Logo extends React.Component<LogoProps, any> {
  public render() {
    return (
      <div className={'app-toolbar__title'}>
        <div className={'app-toolbar__logo'} />
      </div>
    );
  }
}

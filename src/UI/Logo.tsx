import * as React from 'react';
import { Typography } from '@material-ui/core';

export interface LogoProps {}

export default class Logo extends React.Component<LogoProps, any> {
  public render() {
    return (
      <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
        Hokey Share
      </Typography>
    );
  }
}

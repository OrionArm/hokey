import * as React from 'react';
import { Button } from '@material-ui/core';
export interface ProfileProps {}

export default class Profile extends React.Component<ProfileProps, any> {
  public render() {
    return <Button>Kevin Muller</Button>;
  }
}

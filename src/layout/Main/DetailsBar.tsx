import * as React from 'react';
import { Details } from './styled';

export interface DetailsProps {}

export default class DetailsBar extends React.Component<DetailsProps, any> {
  public render() {
    return <Details>Details</Details>;
  }
}

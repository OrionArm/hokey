import React, { Component } from 'react';
import { Details } from './styled';

export interface DetailsProps {}

export default class DetailsBar extends Component<DetailsProps, any> {
  public render() {
    return <Details>Details</Details>;
  }
}

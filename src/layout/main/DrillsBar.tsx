import React, { Component } from 'react';
import { Drills } from './styled';

export interface DrillsProps {}

export default class DrillsBar extends Component<DrillsProps, any> {
  public render() {
    return <Drills>Drills</Drills>;
  }
}

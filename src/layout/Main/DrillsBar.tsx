import * as React from 'react';
import { Drills } from './styled';

export interface DrillsProps {}

export default class DrillsBar extends React.Component<DrillsProps, any> {
  public render() {
    return <Drills>Drills</Drills>;
  }
}

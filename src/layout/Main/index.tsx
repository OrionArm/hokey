import * as React from 'react';
import { MainContainer } from './styled';
import Categories from './CategoriesBar';
import Drills from './DrillsBar';
import Details from './DetailsBar';
export interface MainProps {}

export default class Main extends React.Component<MainProps, any> {
  public render() {
    return (
      <MainContainer>
        <Categories />
        <Drills />
        <Details />
      </MainContainer>
    );
  }
}

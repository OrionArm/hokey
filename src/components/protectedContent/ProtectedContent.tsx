import React, { SFC } from 'react';
import DrillsPage from 'src/layout/drillsPage';
import LogoListPage from 'src/layout/logoListPage';
import { Route, Switch } from 'react-router';
import MainContainer from '../../layout/MainContainer';
import { Header } from '../../layout/header';

const ProtectedContent: SFC<any> = () => {
  return (
    <>
      <Route component={Header} />
      <MainContainer>
        <Switch>
          <Route path="/logos" component={LogoListPage} />
          <Route exect path="/drills" component={DrillsPage} />
        </Switch>
      </MainContainer>
    </>
  );
};

export default ProtectedContent;

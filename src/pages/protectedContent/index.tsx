import React, { SFC } from 'react';
import { Route, Switch } from 'react-router';
import DrillsPage from 'src/components/drills/DrillsPage';
import LogoListPage from 'src/components/logos/LogoListPage';
import { Main } from 'src/UI';
import { Header } from '../../components/header/index';

const ProtectedContent: SFC<any> = () => {
  return (
    <>
      <Header/>
      <Main>
        <Switch>
          <Route path="/logos" component={LogoListPage}/>
          <Route exect path="/drills" component={DrillsPage}/>
        </Switch>
      </Main>
    </>
  );
};

export default ProtectedContent;

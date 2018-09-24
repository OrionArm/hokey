import React, { SFC } from 'react';
import DrillsPage from 'src/components/drills/index';
import LogoListPage from 'src/components/logos/index';
import { Route, Switch } from 'react-router';
import { Header } from '../../components/header/index';
import Main from 'src/UI/main';

const ProtectedContent: SFC<any> = () => {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route path="/logos" component={LogoListPage} />
          <Route exect path="/drills" component={DrillsPage} />
        </Switch>
      </Main>
    </>
  );
};

export default ProtectedContent;

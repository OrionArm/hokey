import React, { SFC } from 'react';
import DrillsPage from 'src/layout/drillsPage';
import LogoListPage from 'src/layout/logoListPage';
import { Route, Switch } from 'react-router';

const ProtectedContent: SFC<any> = () => {
  return (
      <Switch>
        <Route path="/logos" component={LogoListPage}/>
        <Route exect path="/" component={DrillsPage}/>
      </Switch>
  );
};

export default ProtectedContent;

import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import { compose } from 'redux';

import DrillsPage from 'src/components/drills/DrillsPage';
import Header from 'src/components/header/Header';
import LogoListPage from 'src/components/logos/LogoListPage';
import { RootState } from 'src/store/rootReducers';
import { isLogosAvailableSelector } from 'src/store/user/store/selectors';
import { Main } from 'src/UI';
import MainMenu from 'src/components/mainMenu';

const mapStateToProps    = (state: RootState) => ({
  access: isLogosAvailableSelector(state),
});
type Props = injectStateProps;

const ProtectedContent: SFC<Props> = ({ access }) => {
  return (
    <>
      <Header/>
      <MainMenu />
      <Main>
        <Switch>
          {access && <Route path="/logos" component={LogoListPage}/>}
          <Route exect path="/drills" component={DrillsPage}/>
        </Switch>
      </Main>
    </>
  );
};

type injectStateProps = ReturnType<typeof mapStateToProps>;

export default compose(
  withRouter,
  connect(mapStateToProps),
)(ProtectedContent);

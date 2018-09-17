import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { Dispatch } from 'redux';

import { RootState } from 'src/store/rootReducers';
import * as fromUserActions from 'src/user/actions';
import { customStorage } from 'src/utils/customStorage';

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateToProps = ReturnType<typeof mapStateToProps>;
type Props = { path: string, component: React.ReactType }
  & injectDispatchProps
  & injectStateToProps;

const PrivateRoute: React.SFC<Props> = (
  { logout, path, component: Component, ...rest }) => {
  const token: string | null = customStorage.getToken() || null;
  console.log('token', token);

  if (!token) {
    return <Redirect to="/login"/>;
  }
  const check = () => <Component />;

  return <Route {...rest} render={check} />;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(fromUserActions.userActions.logoutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

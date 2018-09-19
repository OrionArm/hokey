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
  { component: Component, logout, tokenLogin, path, user, ...rest }) => {
  const token: string | null = customStorage.getToken() || null;
  if (!token) {
    return <Redirect to="/login"/>;
  }
  const privateComponent = () => <Component/>;

  if (user.userid === '') {
    tokenLogin({ token });
  }
  return <Route {...rest} render={privateComponent}/>;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(fromUserActions.userActions.logoutRequest()),
  tokenLogin: (token: { token: string }) => dispatch(fromUserActions.userActions.tokenLogin(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

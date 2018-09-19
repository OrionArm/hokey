import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import userAPI from 'src/user/api';
import * as fromActions from './actions';
import * as fromTokenActions from './token/actions';
import { errorHandler } from 'src/utils/errorHandler';

function* watcher() {
  yield takeLatest(fromActions.LOGIN_REQUEST, logIn);
  yield takeLatest(fromActions.LOGOUT_REQUEST, logOut);
  yield takeLatest(fromActions.TOKEN_LOGIN, tokenLogin);
}

function* tokenLogin(action: fromActions.tokenLogin) {
  yield put(fromTokenActions.tokenActions.setToResponse(action.payload.token));
  try {
    const response                 = yield call(userAPI.loginWithToken);
    const user: IUser              = response.data.user;
    const userData: ILoginResponse = { user, jwt: action.payload.token };
    yield call(loginSuccess, userData);
  } catch (error) {
    yield call(errorHandler, error);
    yield put(fromTokenActions.tokenActions.clearToken());
  }

}

/*function* loadingUserIfHasToken() {
  const token = customStorage.getToken();

  if (token) {
    yield put(fromTokenActions.tokenActions.setToResponse(token));
  }
}*/
function* loginSuccess(userData: ILoginResponse) {
  const token: string = userData.jwt;
  const user: IUser   = userData.user;
  try {
    yield put(fromTokenActions.tokenActions.setToState(token));
    yield put(fromTokenActions.tokenActions.setToResponse(token));
    yield put(fromActions.userActions.loginSuccess(user));
    yield put(push('/'));
  } catch (error) {
    yield call(errorHandler, error);
  }
  // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
}

function* logIn(action: fromActions.loginRequest) {
  try {
    const response                 = yield call(userAPI.login, action.payload);
    const userData: ILoginResponse = response.data;
    yield call(loginSuccess, userData);
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* logOut() {
  yield put(fromTokenActions.tokenActions.clearToken());
  yield put(push('/login'));
  // Toasts.info('Logout');
}

export default watcher;

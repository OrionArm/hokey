import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import userAPI from 'src/user/api';
import * as fromActions from './actions';
import * as fromTokenActions from './token/actions';
import { errorHandler } from 'src/utils/errorHandler';

function* watcher() {
  yield takeLatest(fromActions.LOGIN_REQUEST, logInSaga);
  yield takeLatest(fromActions.LOGOUT_REQUEST, logOut);
}

/*function* loadingUserIfHasToken() {
  const token = customStorage.getToken();

  if (token) {
    yield put(fromTokenActions.tokenActions.setToResponse(token));
  }
}*/

function* logInSaga(action: fromActions.loginRequest) {
  try {
    const response = yield call(userAPI.login, action.payload);
    const userData: ILoginResponse = response.data;
    const token: string            = userData.jwt;
    const user: IUser              = userData.user;

    yield put(fromTokenActions.tokenActions.setToState(token));
    yield put(fromActions.userActions.loginSuccess(user));
    yield put(push('/'));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
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

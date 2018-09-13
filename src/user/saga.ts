import { call, put, takeLatest } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import { errorHandler } from 'src/utils/errorHandler';
import userAPI from 'src/user/api';
import * as fromActions from './actions';

function* loginSaga(action: fromActions.loginRequest) {
  try {
    const response    = yield call(userAPI.login, action.payload);
    const userData: ILoginResponse = response.data;
    yield put(fromActions.userActions.loginSuccess(userData));
    // yield put(push('/'));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* watcher() {
  yield takeLatest(fromActions.LOGIN_SUCCESS, loginSaga);
}

export default watcher;

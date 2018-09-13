import { call, put } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import { errorHandler } from 'src/utils/errorHandler';
import userActions, { loginRequest } from 'src/user/actions';
import userAPI from 'src/user/api';
import { takeEvery } from 'redux-saga';

function* loginSaga(action: loginRequest) {
  try {
    const { data }  = yield call(userAPI.login, action.payload);
    const token: string = data.token;
    yield put(userActions.loginSuccess(token));
    // yield put(push('/'));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* watcher() {
  while (true) {
    yield takeEvery(userActions.loginRequest, loginSaga);
  }
}

export default watcher;

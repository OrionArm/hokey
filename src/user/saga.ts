import { call, fork, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
// import { Action } from 'redux-act';

// import userActions from './actions';
import { errorHandler } from 'src/utils/errorHandler';

// import userSagaAPI from './api';

function* loginSaga() {
  // const action = take(userActions.setTokenToStorage.REQUEST);
  try {
    // yield call(userAPI);
    yield put(push('/emails'));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* watcher() {
  while (true) {
    yield fork(loginSaga);
  }
}

export default watcher;

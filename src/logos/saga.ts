import { call, takeEvery, takeLatest } from 'redux-saga/effects';

import * as fromActions from './actions';
import { errorHandler } from 'src/utils/errorHandler';
import logosAPI from 'src/logos/api';

function* watcher() {
  yield takeLatest(fromActions.GET_LOGOS_REQUEST, getLogos);
  yield takeEvery(fromActions.SET_LOGOS_REQUEST, setLogos);
  yield takeEvery(fromActions.DELETE_LOGOS_REQUEST, deleteLogos);
  yield takeLatest(fromActions.CHANGE_DEFAULT_LOGOS_REQUEST, changeDefaultLogo);
}

function* getLogos(action: fromActions.getLogosRequest) {
  try {
    const response = yield call(logosAPI.getLogos);
    const data: any[] = response.data;
    console.log('getLogosSaga response.data', data);
    // yield put(fromActions.logosActions.getLogosSuccess, data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* setLogos(action: fromActions.setLogosRequest) {
  try {
    const response = yield call(logosAPI.setLogo, action.payload);

    console.log('setLogosSaga response.data', response.data);

    // yield put(fromActions.logosActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* deleteLogos(action: fromActions.deleteLogosRequest) {
  try {
    const response = yield call(logosAPI.deleteLogos, action.payload);
    console.log('deleteLogosSaga response.data', response.data);

    // yield put(fromActions.logosActions.deleteLogosSuccess);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* changeDefaultLogo(action: fromActions.changeDefaultLogoRequest) {
  try {
    const response = yield call(logosAPI.changeDefaultLogo, action.payload);
    console.log('changeDefaultLogoSaga response.data', response.data);

    // yield put(fromActions.logosActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

export default watcher;

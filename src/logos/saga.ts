import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import * as fromActions from './actions';
import { errorHandler } from 'src/utils/errorHandler';
import logosAPI from 'src/logos/api';
import { LogoModel } from 'src/logos/model';
import { getUserId } from 'src/store/selectors';

function* watcher() {
  yield takeLatest(fromActions.GET_LOGOS_REQUEST, getLogos);
  yield takeEvery(fromActions.ADD_LOGO_REQUEST, addLogo);
  yield takeEvery(fromActions.DELETE_LOGOS_REQUEST, deleteLogos);
  yield takeEvery(fromActions.EDIT_LOGO_REQUEST, editLogo);
  yield takeLatest(fromActions.CHANGE_DEFAULT_LOGOS_REQUEST, changeDefaultLogo);
}

function* getLogos(action: fromActions.getLogosRequest) {
  const userId: string = yield select(getUserId);
  try {
    const logos: LogoModel[] = yield call(logosAPI.getLogos, { userId });
    yield put(fromActions.logosActions.getLogosSuccess({ logos }));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* addLogo(action: fromActions.addLogosRequest) {
  const userId: string = yield select(getUserId);
  const { image, name }       = action.payload;
  try {
    const response = yield call(logosAPI.addLogo, { image, userId, name });

    console.log('setLogosSaga response.data', response.data);
    yield put(fromActions.logosActions.getLogosRequest());
    // yield put(fromActions.logosActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* deleteLogos(action: fromActions.deleteLogosRequest) {
  const userId: string = yield select(getUserId);
  const logosIds       = action.payload.logosIds;
  try {
    yield call(logosAPI.deleteLogos, { userId, logosIds });
    // ToDo(@Roman): Change behavior, need remove from store instead of send new request
    yield put(fromActions.logosActions.getLogosRequest());
    // yield put(fromActions.logosActions.deleteLogosSuccess(logosIds));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* editLogo(action: fromActions.editLogoRequest) {
  const userId: string = yield select(getUserId);
  const name           = action.payload.name;
  const logoId         = action.payload.logoId;
  try {
    yield call(logosAPI.editLogo, { name, userId, logoId });
    yield put(fromActions.logosActions.getLogosRequest());
    yield put(fromActions.logosActions.editLogoSuccess());
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* changeDefaultLogo(action: fromActions.changeDefaultLogoRequest) {
  const userId: string = yield select(getUserId);
  const logoId         = action.payload.logoId;
  try {
    const response = yield call(logosAPI.changeDefaultLogo, { userId, logoId });
    console.log('changeDefaultLogoSaga response.data', response.data);
    yield put(fromActions.logosActions.getLogosRequest());
    // yield put(fromActions.logosActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

export default watcher;

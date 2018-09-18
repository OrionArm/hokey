import { call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';

import * as fromActions from './actions';
import { errorHandler } from 'src/utils/errorHandler';
import logosAPI from 'src/logos/api';
import { RootState } from 'src/store/rootReducers';

function* watcher() {
  yield takeLatest(fromActions.GET_LOGOS_REQUEST, getLogos);
  yield takeEvery(fromActions.SET_LOGOS_REQUEST, setLogos);
  yield takeEvery(fromActions.DELETE_LOGOS_REQUEST, deleteLogos);
  yield takeLatest(fromActions.CHANGE_DEFAULT_LOGOS_REQUEST, changeDefaultLogo);
}

const getState  = (state: RootState) => state;
const getUserId = createSelector(getState, state => state.user.profile.userid);

function* getLogos(action: fromActions.getLogosRequest) {
  const userId: string = yield select(getUserId);
  try {
    const response    = yield call(logosAPI.getLogos, { userId });
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
  const userId: string = yield select(getUserId);
  const images         = action.payload.images;
  try {
    const response = yield call(logosAPI.setLogo, { images, userId });

    console.log('setLogosSaga response.data', response.data);

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
    const response = yield call(logosAPI.deleteLogos, { userId, logosIds });
    console.log('deleteLogosSaga response.data', response.data);

    // yield put(fromActions.logosActions.deleteLogosSuccess);
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

    // yield put(fromActions.logosActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

export default watcher;

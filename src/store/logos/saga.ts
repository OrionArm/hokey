import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import * as fromToast from 'src/store/toast/actions';
import * as fromActions from './actions';
import { logoIdList, LogoResponse, NormLogos } from 'src/store/logos/interface';
import { LogoModel } from 'src/store/logos/model';
import { errorHandler } from 'src/utils/errorHandler';
import logosAPI, { ICheckDeleted } from 'src/store/logos/api';
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
    const logos: NormLogos = yield call(logosAPI.getLogos, { userId });
    yield put(fromActions.logosActions.getLogosSuccess({ logos }));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* addLogo(action: fromActions.addLogosRequest) {
  const userId: string  = yield select(getUserId);
  const { image, name } = action.payload;
  try {
    const logo: LogoModel = yield call(logosAPI.addLogo, { image, userId, name });

    yield put(fromActions.logosActions.addLogosSuccess({ logo }));
    // yield put(fromActions.toastActions.getLogosSuccess, response.data);
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* deleteLogos(action: fromActions.deleteLogosRequest) {
  const userId: string           = yield select(getUserId);
  const { logosIds }: logoIdList = action.payload;
  try {
    const response: ICheckDeleted  = yield call(logosAPI.deleteLogos, { userId, logosIds });
    const { failDeletedLogos, successDeletedLogos } = response;
    if (failDeletedLogos.length !== 0) {
      yield put(fromActions.logosActions.deleteLogosFail({ logosIds: successDeletedLogos }));
      yield put(fromToast.toastActions.showToast('Deleted failed', fromToast.ToastType.Error));
    }
    if (successDeletedLogos.length !== 0) {
      yield put(fromActions.logosActions.deleteLogosSuccess({ logosIds: successDeletedLogos }));
      yield put(fromToast.toastActions.showToast('Success deleted', fromToast.ToastType.Success));
    }
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
    const request: LogoResponse = yield call(logosAPI.editLogo, { name, userId, logoId });
    yield put(fromActions.logosActions.editLogoSuccess({ logoId: request.id, name: request.name }));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* changeDefaultLogo(action: fromActions.changeDefaultLogoRequest) {
  const userId: string = yield select(getUserId);
  const logoId: string = action.payload.logoId;
  try {
    const response: LogoResponse = yield call(logosAPI.changeDefaultLogo, { userId, logoId });
    yield put(fromActions.logosActions.changeDefaultLogoSuccess({ logoId: response.id }));
    // yield put(fromActions.toastActions.getLogosSuccess, response.data);
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

export default watcher;

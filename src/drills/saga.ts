
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import userAPI from 'src/drills/api';
import { DrillCategoriesGroupped } from 'src/drills/model';
import * as fromActions from './actions';
import { errorHandler } from 'src/utils/errorHandler';

function* watcher() {
  yield takeLatest(fromActions.GET_DRILLS_REQUEST, getDrillsSaga);
}

function* getDrillsSaga(action: fromActions.getDrillsByCategoryIdRequest) {
  try {
    const response = yield call(userAPI.getDrillsByCategoryId, action.payload);
    const drills: DrillCategoriesGroupped = response.data;

    yield put(fromActions.getDrillsByCategoryIdSuccess(drills));
    yield put(push('/'));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

export default watcher;

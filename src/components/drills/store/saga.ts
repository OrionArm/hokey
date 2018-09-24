
import { call, put, takeLatest, select } from 'redux-saga/effects';

import api from 'src/components/drills/store/api';
import {
  Drill,
  DrillDetailed,
  DrillCategoriesGroupped,
  DrillCategoryType,
} from 'src/components/drills/store/model';
import * as actions from './actions';
import { errorHandler } from 'src/utils/errorHandler';
import { getUserId } from 'src/store/selectors';

function* watcher() {
  yield [
    takeLatest(actions.GET_DRILLS_REQUEST, getDrillsListSaga),
    takeLatest(actions.GET_CATEGORIES_REQUEST, getCategoriesSaga),
    takeLatest(actions.GET_DRILL_REQUEST, getDrillSaga),
    takeLatest(actions.SEARCH_DRILLS_REQUEST, searchDrillsListSaga),
  ];
}

function* searchDrillsListSaga(action: actions.searchDrillsByIdRequest) {
  try {
    const response = yield call(api.searchDrills, action.payload.id);
    const drills: Drill[] = [response.data];

    yield put(actions.searchDrillsByIdSuccess(drills));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield put(actions.searchDrillsByIdFail(error));
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* getDrillsListSaga(action: actions.getDrillsByCategoryIdRequest) {
  try {
    const userId = yield select(getUserId);
    const response = yield call(api.getDrillsByCategoryId, { ...action.payload, userId });
    const drills: Drill[] = response.data;

    yield put(actions.getDrillsByCategoryIdSuccess(drills));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield put(actions.getDrillsByCategoryIdFail(error));
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* getCategoriesSaga(action: actions.getDrillsCategoriesRequest) {
  try {
    const userId = yield select(getUserId);
    const response = yield call(api.getCategories, userId);
    const categories: DrillCategoriesGroupped = response.data;
    yield put(actions.getDrillsCategoriesSuccess(categories));
    const firstCategory = categories[DrillCategoryType.Public][0];
    yield put(actions.getDrillsByCategoryIdRequest(firstCategory.id, DrillCategoryType.Public));
  } catch (error) {
    yield put(actions.getDrillsCategoriesFail(error));
    yield call(errorHandler, error);
  }
}

function* getDrillSaga(action: actions.getDrillRequest) {
  try {
    const response = yield call(api.getDrill, action.payload.id, action.payload.userId);
    const drill: DrillDetailed = response.data;
    yield put(actions.getDrillSuccess(drill));
  }  catch (error) {
    yield call(errorHandler, error);
  }
}

export default watcher;

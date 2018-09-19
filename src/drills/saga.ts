
import { call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/drills/api';
import { Drill, DrillDetailed, DrillCategoriesGroupped, DrillCategoryType } from 'src/drills/model';
import * as actions from './actions';
import { errorHandler } from 'src/utils/errorHandler';

function* watcher() {
  yield [
    takeLatest(actions.GET_DRILLS_REQUEST, getDrillsListSaga),
    takeLatest(actions.GET_CATEGORIES_REQUEST, getCategoriesSaga),
    takeLatest(actions.GET_DRILL_REQUEST, getDrillSaga),
  ];
}

function* getDrillsListSaga(action: actions.getDrillsByCategoryIdRequest) {
  try {
    const response = yield call(api.getDrillsByCategoryId, action.payload);
    const drills: Drill[] = response.data;

    yield put(actions.getDrillsByCategoryIdSuccess(drills));
    // yield put(FluxToast.Actions.showToast('Success', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    // yield put(FluxToast.Actions.showToast('Failed', ToastType.Error));
  }
}

function* getCategoriesSaga(action: actions.getDrillsCategoriesRequest) {
  try {
    const response = yield call(api.getCategories, action.payload);
    const categories: DrillCategoriesGroupped = response.data;
    yield put(actions.getDrillsCategoriesSuccess(categories));
    const firstCategory = categories[DrillCategoryType.Public][0];
    yield put(actions.getDrillsByCategoryIdRequest(firstCategory.id));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

function* getDrillSaga(action: actions.getDrillRequest) {
  try {
    const response = yield call(api.getDrill, action.payload.id);
    const drill: DrillDetailed = response.data;
    yield put(actions.getDrillSuccess(drill));
  }  catch (error) {
    yield call(errorHandler, error);
  }
}

export default watcher;

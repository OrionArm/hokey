
import { eventChannel } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import api from 'src/store/drils/api';
// tslint:disable-next-line:max-line-length
import { Drill, DrillCategoriesGroupped, DrillCategoryType, DrillDetailed } from 'src/store/drils/model';
import { getUserId } from 'src/store/selectors';
import { errorHandler } from 'src/utils/errorHandler';
import * as actions from './actions';
import { getGenerationStatusSelector } from './selectors';

function timer() {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter({});
    },                     5000);
    return () => {
      clearInterval(iv);
    };
  });
}

function* watcher() {
  yield [
    takeLatest(actions.GET_DRILLS_REQUEST, getDrillsListSaga),
    takeLatest(actions.GET_CATEGORIES_REQUEST, getCategoriesSaga),
    takeLatest(actions.GET_DRILL_REQUEST, getDrillSaga),
    takeLatest(actions.SEARCH_DRILLS_REQUEST, searchDrillsListSaga),
    takeLatest(actions.REGENERATE_DRILLS_REQUEST, regenerateDrillsSaga),
    takeEvery(yield call(timer), checkGenerationStatus),
  ];
}

function* checkGenerationStatus() {
  const currentStatus = yield select(getGenerationStatusSelector);
  const pendingGenerationIds = Object.values(currentStatus);
  if (pendingGenerationIds.length === 0) {
    return;
  }
  const userId = yield select(getUserId);
  try {
    const response = yield call(
      api.checkGenerationStatus as any, userId, pendingGenerationIds,
    );
    const generationIds = response.data;
    const newStatus = Object.keys(currentStatus)
      .filter(drillId => generationIds.includes(currentStatus[drillId]))
      .reduce((a, drillId) => ({ ...a, [drillId]: currentStatus[drillId] }), {});
    localStorage.setItem('generation_status', JSON.stringify(newStatus));
    yield put(actions.updateGenerationStatus(newStatus));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

function* regenerateDrillsSaga(action: actions.regenerateDrillsRequest) {
  try {
    const request = action.payload.logoId
      ? api.regenerateWithNewLogo
      : api.regenerate;
    const response = yield call(request as any, action.payload);
    const status: { [drillId: string]: string } = action.payload.drill_ids
      .reduce((a, id, i) => ({ ...a, [id]: response.data[i] }), {});
    localStorage.setItem('generation_status', JSON.stringify(status));
    yield put(actions.regenerateDrillsSuccess(status));
  } catch (error) {
    yield put(actions.regenerateDrillsFail(error));
    yield call(errorHandler, error);
  }
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
  } catch (error) {
    yield call(errorHandler, error);
  }
}

export default watcher;

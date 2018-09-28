import { eventChannel } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import api from 'src/store/drils/api';
import {
  Drill,
  DrillCategoriesGroupped,
  DrillCategoryType,
  DrillDetailed,
  DrillStatus,
} from 'src/store/drils/model';
import { getUserId } from 'src/store/selectors';
import { errorHandler } from 'src/utils/errorHandler';
import * as actions from './actions';
import {
  getGenerationStatusSelector,
  getSelectedDrillSelector,
} from './selectors';

function timer() {
  return eventChannel(emitter => {
    const iv = setInterval(() => emitter({}), 3000);
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
    takeEvery(actions.DOWNLOAD_DRILLS_REQUEST, downloadDrillsSaga),
    takeEvery(yield call(timer), checkGenerationStatus),
  ];
}

function* checkGenerationStatus() {
  const currentStatus = yield select(getGenerationStatusSelector);
  const pendingGenerationIds = Object.values(currentStatus);
  const userId = yield select(getUserId);
  if (pendingGenerationIds.length === 0) {
    return;
  }
  try {
    const response = yield call(
      api.checkGenerationStatus as any,
      userId,
      pendingGenerationIds,
    );
    const generationIds = response.data;
    const newStatus = Object.keys(currentStatus)
      .filter(drillId => generationIds.includes(currentStatus[drillId]))
      .reduce(
        (a, drillId) => ({ ...a, [drillId]: currentStatus[drillId] }),
        {},
      );
    localStorage.setItem('generation_status', JSON.stringify(newStatus));
    if (!generationIds[0]) {
      const selectedDrill: DrillDetailed = yield select(
        getSelectedDrillSelector,
      );
      if (selectedDrill && selectedDrill.id) {
        const id = selectedDrill.id;
        yield put(actions.getDrillRequest(id, userId));
      }
    }
    yield put(actions.updateGenerationStatus(newStatus));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

function* regenerateDrillsSaga(action: actions.regenerateDrillsRequest) {
  const userId = yield select(getUserId);
  try {
    const id = action.payload.drill_ids[0];
    const request = action.payload.logoId
      ? api.regenerateWithNewLogo
      : api.regenerate;
    const response = yield call(request as any, action.payload);
    const status: DrillStatus = action.payload.drill_ids.reduce(
      (a, id, i) => ({ ...a, [id]: response.data[i] }),
      {},
    );
    localStorage.setItem('generation_status', JSON.stringify(status));
    yield put(actions.regenerateDrillsSuccess(status));
    yield put(actions.getDrillRequest(id, userId));
  } catch (error) {
    yield put(actions.regenerateDrillsFail(error));
    yield call(errorHandler, error);
  }
}

function* downloadDrillsSaga({ payload }: actions.downloadDrillsRequest) {
  const keyPayload = Object.keys(payload.loading);
  const swipeLoad = changer =>
    keyPayload.map(item => ({
      [item]: changer,
    }))[0];

  let chooseApi;
  switch (keyPayload[0]) {
    case 'allVideo':
      chooseApi = 'downloadMultipleVideos';
      break;
    case 'allPdf':
      chooseApi = 'downloadMultiplePdfs';
      break;
    case 'selfVideo':
      chooseApi = 'downloadVideo';
      break;
    case 'selfPdf':
      chooseApi = 'downloadPdf';
      break;

    default:
      return '';
  }

  try {
    yield call(api[chooseApi], payload.checkedIds, payload.selectedUserId);
    yield put(actions.downloadDrillsSuccess({ loading: swipeLoad(false) }));
  } catch (error) {
    yield put(actions.downloadDrillsFail(swipeLoad('error')));
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
    const response = yield call(api.getDrillsByCategoryId, {
      ...action.payload,
      userId,
    });
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
    yield put(
      actions.getDrillsByCategoryIdRequest(
        firstCategory.id,
        DrillCategoryType.Public,
      ),
    );
  } catch (error) {
    yield put(actions.getDrillsCategoriesFail(error));
    yield call(errorHandler, error);
  }
}

function* getDrillSaga(action: actions.getDrillRequest) {
  try {
    const response = yield call(
      api.getDrill,
      action.payload.id,
      action.payload.userId,
    );
    const drill: DrillDetailed = response.data;
    yield put(actions.getDrillSuccess(drill));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

export default watcher;

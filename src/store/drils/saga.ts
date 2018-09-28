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
import { toastActions, ToastType } from 'src/store/toast/actions';
import { errorHandler } from 'src/utils/errorHandler';
import * as actions from './actions';
import {
  getDrillsSelector,
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
    takeLatest(actions.DRILL_GENERATION_STATUS_ERROR, drillGenerationStatusError),
    takeEvery(yield call(timer), checkGenerationStatus),
  ];
}

function* checkGenerationStatus() {
  const userId: string | 'me'      = yield select(getUserId);
  const currentStatus: DrillStatus = yield select(getGenerationStatusSelector);
  const drillIds: string[]         = Object.keys(currentStatus);
  const pendingGenerationIds       = Object.values(currentStatus); // DrillStatusType
  if (pendingGenerationIds.length === 0) {
    return;
  }
  try {
    const { generatedIds, generatedErrorIds } = yield call(
      api.checkGenerationStatus as any, userId, pendingGenerationIds,
    );
    if (generatedErrorIds !== []) {
      let errorDrillId: string = '';
      generatedErrorIds.forEach(errorId => {
        errorDrillId = drillIds.filter(drillId => currentStatus[drillId] === errorId)[0];
      });
      if (errorDrillId) {
        yield put(actions.drillGenerationStatusError({ errorDrillId }));
      }
    }
    const newStatus = drillIds.filter(drillId =>
      generatedIds.includes(currentStatus[drillId]),
    )
      .reduce((a, drillId) => ({ ...a, [drillId]: currentStatus[drillId] }), {});
    localStorage.setItem('generation_status', JSON.stringify(newStatus));
    if (!generatedIds[0]) {
      const selectedDrill: DrillDetailed = yield select(getSelectedDrillSelector);
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
    const id      = action.payload.drill_ids[0];
    const request = action.payload.logoId
      ? api.regenerateWithNewLogo
      : api.regenerate;
    yield call(request as any, action.payload);

    const { data: response }  = yield call(request as any, action.payload);
    const status: DrillStatus = action.payload.drill_ids.reduce(
      (acc, drillId, i) => ({ ...acc, [drillId]: response[i] }), {},
    );

    localStorage.setItem('generation_status', JSON.stringify(status));
    yield put(actions.regenerateDrillsSuccess(status));
    yield put(actions.getDrillRequest(id, userId));
  } catch (error) {
    yield put(actions.regenerateDrillsFail(error));
    yield call(errorHandler, error);
  }
}

function* searchDrillsListSaga(action: actions.searchDrillsByIdRequest) {
  try {
    const response        = yield call(api.searchDrills, action.payload.id);
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
    const userId          = yield select(getUserId);
    const response        = yield call(api.getDrillsByCategoryId, { ...action.payload, userId });
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
    const userId                              = yield select(getUserId);
    const response                            = yield call(api.getCategories, userId);
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
    const response             = yield call(api.getDrill, action.payload.id, action.payload.userId);
    const drill: DrillDetailed = response.data;
    yield put(actions.getDrillSuccess(drill));
  } catch (error) {
    yield call(errorHandler, error);
  }
}

function* drillGenerationStatusError(action: actions.drillGenerationStatusError) {
  try {
    const errorDrillId: string = action.payload.errorDrillId;
    const allDrills: Drill[] = yield select(getDrillsSelector);
    let drillName;
    for (const drill of allDrills) {
      if (drill.id === errorDrillId) {
        drillName = drill.name;
      }
    }
    if (drillName) {
      const message = `Drill ${drillName} was not generated!`;
      console.log(message);
      yield put(toastActions.showToast(message, ToastType.Error));
    }
    // yield put();
  } catch (error) {
    yield call(errorHandler, error);
  }
}
export default watcher;

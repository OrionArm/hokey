import { combineReducers } from 'redux';

import * as fromActions from './actions';
import {
  DrillCategoryType, DrillDetailed, DownloadDrill,
  DrillCategoriesGrouped, DrillStatus, NormDrills,
} from './model';

export interface DrillsState {
  categories: {
    data: DrillCategoriesGrouped;
    loading: boolean;
  };
  drills: {
    loading: boolean;
    data: NormDrills;
  };
  selectedDrill: DrillDetailed | null;

  downloadDrill: DownloadDrill;
  generationStatus: DrillStatus;
}

const initStateCategories = {
  loading: false,
  data: {
    [DrillCategoryType.Custom]: [],
    [DrillCategoryType.Public]: [],
  },
};

const categories = (
  state = initStateCategories,
  action: fromActions.drillActions,
): DrillsState['categories'] => {
  switch (action.type) {
    case fromActions.GET_CATEGORIES_REQUEST:
      return { ...initStateCategories, loading: true };
    case fromActions.GET_CATEGORIES_SUCCESS:
      return { data: action.payload.categories, loading: false };
    case fromActions.GET_CATEGORIES_FAIL:
      return { ...initStateCategories, loading: false };
    default:
      return state;
  }
};

const drills = (
  state: DrillsState['drills'] = { data: {}, loading: false },
  action: fromActions.drillActions,
): DrillsState['drills'] => {
  switch (action.type) {
    case fromActions.SEARCH_DRILLS_REQUEST:
    case fromActions.GET_DRILLS_REQUEST:
      return { data: {}, loading: true };
    case fromActions.SEARCH_DRILLS_SUCCESS:
    case fromActions.GET_DRILLS_SUCCESS:
      return { data: action.payload.drills, loading: false };
    case fromActions.SEARCH_DRILLS_FAIL:
    case fromActions.GET_DRILLS_FAIL:
      return { data: {}, loading: false };
    default:
      return state;
  }
};

const selectedDrill = (
  state: DrillsState['selectedDrill'] = null,
  action: fromActions.drillActions,
): DrillsState['selectedDrill'] => {
  switch (action.type) {
    case fromActions.GET_DRILL_SUCCESS:
      return action.payload.drill;
    case fromActions.GET_DRILLS_FAIL:
      return null;
    default:
      return state;
  }
};

export const generationStatus = (
  state: DrillsState['generationStatus'] = getGenerationStatusInitialState(),
  action: fromActions.drillActions,
): DrillsState['generationStatus'] => {
  switch (action.type) {
    case fromActions.REGENERATE_DRILLS_SUCCESS:
      return { ...state, ...action.payload.status };
    case fromActions.UPDATE_GENERATION_STATUS:
      return action.payload.status;
    default:
      return state;
  }
};

const getGenerationStatusInitialState = () => {
  try {
    const status = localStorage.getItem('generation_status');
    return status ? JSON.parse(status) : {};
  } catch (e) {
    return {};
  }
};

const downloadDrill = (
  state: DrillsState['downloadDrill'] = {
    loading: {
      allVideo: false,
      allPdf: false,
      selfVideo: false,
      selfPdf: false,
    },
  },
  action: fromActions.drillActions,
): DrillsState['downloadDrill'] => {
  switch (action.type) {
    case fromActions.DOWNLOAD_DRILLS_REQUEST:
      return { loading: { ...state.loading, ...action.payload.loading } };
    case fromActions.DOWNLOAD_DRILLS_SUCCESS:
      return { loading: { ...state.loading, ...action.payload.loading } };
    case fromActions.DOWNLOAD_DRILLS_FAIL:
      return { loading: { ...state.loading, ...action.payload.error } };
    default:
      return state;
  }
};

export const reducer = combineReducers<DrillsState, fromActions.drillActions>({
  categories,
  drills,
  selectedDrill,
  generationStatus,
  downloadDrill,
});

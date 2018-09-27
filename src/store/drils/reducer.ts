import { combineReducers } from 'redux';
import { DrillStatus } from 'src/store/drils/model';
import {
  DrillCategoryType,
  Drill,
  DrillDetailed,
  DrillCategoriesGroupped,
} from './model';
import {
  drillActions, GET_DRILL_SUCCESS,
  GET_DRILLS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_FAIL, GET_DRILLS_REQUEST, GET_DRILLS_FAIL,
  SEARCH_DRILLS_REQUEST, SEARCH_DRILLS_SUCCESS, SEARCH_DRILLS_FAIL,
  REGENERATE_DRILLS_SUCCESS, UPDATE_GENERATION_STATUS,
} from './actions';

export interface DrillsState {
  categories: {
    data: DrillCategoriesGroupped;
    loading: boolean;
  };
  drills: {
    loading: boolean;
    data: Drill[];
  };
  selectedDrill: DrillDetailed | null;
  generationStatus: DrillStatus;
}

const initStateCategories = {
  loading: false,
  data: {
    [DrillCategoryType.Custom]: [],
    [DrillCategoryType.Public]: [],
  },
};

const categories = (state = initStateCategories,
                    action: drillActions): DrillsState['categories'] => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...initStateCategories, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { data: action.payload.categories, loading: false };
    case GET_CATEGORIES_FAIL:
      return { ...initStateCategories, loading: false };
    default:
      return state;
  }
};

// tslint:disable-next-line:max-line-length
const drills = (state = { data: [], loading: false },
                action: drillActions): DrillsState['drills'] => {
  switch (action.type) {
    case SEARCH_DRILLS_REQUEST:
    case GET_DRILLS_REQUEST:
      return { data: [], loading: true };
    case SEARCH_DRILLS_SUCCESS:
    case GET_DRILLS_SUCCESS:
      return { data: action.payload.drills, loading: false };
    case SEARCH_DRILLS_FAIL:
    case GET_DRILLS_FAIL:
      return { data: [], loading: false };
    default:
      return state;
  }
};

const selectedDrill = (state = null, action: drillActions): DrillDetailed | null => {
  switch (action.type) {
    case GET_DRILL_SUCCESS:
      return action.payload.drill;
    case GET_DRILLS_SUCCESS:
      return null;
    default:
      return state;
  }
};

export const generationStatus = (
  state = getGenerationStatusInitialState(),
  action: drillActions,
): DrillsState['generationStatus'] => {
  switch (action.type) {
    case REGENERATE_DRILLS_SUCCESS:
      return { ...state, ...action.payload.status };
    case UPDATE_GENERATION_STATUS:
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

export const reducer = combineReducers<DrillsState, drillActions>({
  categories,
  drills,
  selectedDrill,
  generationStatus,
});

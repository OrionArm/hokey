import { combineReducers } from 'redux';
import { DrillCategoryType, Drill, DrillDetailed, DrillCategoriesGroupped } from './model';
import {
  drillActions, GET_DRILL_SUCCESS,
  GET_DRILLS_SUCCESS, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_REQUEST,
   GET_CATEGORIES_FAIL, GET_DRILLS_REQUEST, GET_DRILLS_FAIL,
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
}

const initialState = {
  loading: false,
  data: {
    [DrillCategoryType.Custom]: [],
    [DrillCategoryType.Public]: [],
  },
};

const categories = (state = initialState, action: drillActions): DrillsState['categories'] => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...initialState, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { data: action.payload.categories, loading: false };
    case GET_CATEGORIES_FAIL:
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

// tslint:disable-next-line:max-line-length
const drills = (state = { data: [], loading: false }, action: drillActions): DrillsState['drills'] => {
  switch (action.type) {
    case GET_DRILLS_REQUEST:
      return { data: [], loading: true };
    case GET_DRILLS_SUCCESS:
      return { data: action.payload.drills, loading: false };
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
    default:
      return state;
  }
};

export const reducer = combineReducers<DrillsState, drillActions>({
  categories,
  drills,
  selectedDrill,
});

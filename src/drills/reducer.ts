import { combineReducers } from 'redux';
import { DrillCategoryType, Drill, DrillCategoriesGroupped } from './model';
import { drillActions, GET_DRILLS_SUCCESS, GET_CATEGORIES_SUCCESS } from './actions';

export interface DrillsState {
  categories: DrillCategoriesGroupped;
  drills: Drill[];
}

const initialState: DrillCategoriesGroupped = {
  [DrillCategoryType.Custom]: [],
  [DrillCategoryType.Public]: [],
};

const categories = (state = initialState, action: drillActions): DrillCategoriesGroupped => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.payload.categories;
    default:
      return state;
  }
};

const drills = (state: Drill[] = [], action: drillActions): Drill[] => {
  switch (action.type) {
    case GET_DRILLS_SUCCESS:
      return action.payload.drills;
    default:
      return state;
  }
};

export const reducer = combineReducers<DrillsState, drillActions>({
  categories,
  drills,
});

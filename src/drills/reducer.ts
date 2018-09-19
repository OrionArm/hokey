import { combineReducers } from 'redux';
import { DrillCategoryType, Drill, DrillDetailed, DrillCategoriesGroupped } from './model';
import {
  drillActions, GET_DRILL_SUCCESS,
  GET_DRILLS_SUCCESS, GET_CATEGORIES_SUCCESS,
} from './actions';

export interface DrillsState {
  categories: DrillCategoriesGroupped;
  drills: Drill[];
  selectedDrill: DrillDetailed | null;
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

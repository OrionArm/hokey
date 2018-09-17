import { combineReducers } from 'redux';
import { DrillCategoryType } from './model';
import { drillActions, GET_DRILLS_SUCCESS } from './actions';

const initialState = {
  [DrillCategoryType.Custom]: [],
  [DrillCategoryType.Public]: [],
};

const categories = (state = initialState, action: drillActions) => {
  switch (action.type) {
    case GET_DRILLS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const drillReducer = combineReducers({
  categories,
});

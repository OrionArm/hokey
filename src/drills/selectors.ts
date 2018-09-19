import { RootState } from '../store/rootReducers';
// import { DrillCategoryType } from 'src/drills/model';

// TODO: add reselect
export const getGrouppedCategoriesSelector = (state: RootState) => {
  // return {
  //   [DrillCategoryType.Custom]: [{ id: 1, name: 'Sample custom category', count: 10 }],
  //   [DrillCategoryType.Public]: [{ id: 2, name: 'Sample public category', count: 22 }],
  // };
  return state.drills.categories;
};

export const getDrillsSelector = (state: RootState) => {
  return state.drills.drills;
};

export const getSelectedDrillSelector = (state: RootState) => {
  return state.drills.selectedDrill;
};

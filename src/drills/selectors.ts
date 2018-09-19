import { RootState } from '../store/rootReducers';
import { DrillDetailed } from 'src/drills/model';

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

export const getSelectedDrillSelector = (state: RootState): DrillDetailed | null => {
  return state.drills.selectedDrill;
};

export const getSelectedDrillPreviewSelector = (state: RootState): string | null => {
  const drill = getSelectedDrillSelector(state);
  return drill ? drill.preview : null;
};

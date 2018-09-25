import { RootState } from '../rootReducers';
import { DrillDetailed } from 'src/store/drils/model';

// TODO: add reselect
export const getGrouppedCategoriesSelector = (state: RootState) => {
  // return {
  //   [DrillCategoryType.Custom]: [{ id: 1, name: 'Sample custom category', count: 10 }],
  //   [DrillCategoryType.Public]: [{ id: 2, name: 'Sample public category', count: 22 }],
  // };
  return state.drills.categories.data;
};
export const getCategoriesRequestStatusSelector = (state: RootState) => {
  return state.drills.categories.loading;
};

export const getDrillsSelector = (state: RootState) => {
  return state.drills.drills.data;
};

export const getDrillsRequestStatusSelector = (state: RootState) => {
  return state.drills.drills.loading;
};

export const getSelectedDrillSelector = (state: RootState): DrillDetailed | null => {
  return state.drills.selectedDrill;
};

export const getSelectedDrillPreviewSelector = (state: RootState): string => {
  const drill = getSelectedDrillSelector(state);
  return drill ? drill.preview : '';
};

export const getSelectedDrillAnimationSelector = (state: RootState): string => {
  const drill = getSelectedDrillSelector(state);
  return drill ? drill.animation : '';
};

export const getSelectedDrillLogoSelector = (state: RootState): string => {
  const drill = getSelectedDrillSelector(state);
  return drill ? drill.logo_url : '';
};

export const getGenerationStatusSelector = (state: RootState) => {
  return state.drills.generationStatus;
};

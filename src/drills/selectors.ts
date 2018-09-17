import { RootState } from '../store/rootReducers';
import { DrillCategoryType } from 'src/drills/model';

// TODO: add reselect
export const getGrouppedDrillsSelector = (state: RootState) => {
  return {
    [DrillCategoryType.Custom]: [{ id: 1, name: 'Sample custom category', count: 10 }],
    [DrillCategoryType.Public]: [{ id: 2, name: 'Sample public category', count: 22 }],
  };
  // return state.drills.categories;
};

import { DrillCategoriesGroupped, Drill, DrillDetailed, DrillCategoryType } from './model';
import { createAction } from '../../../utils/typedAction/createAction';
import { ActionsUnion } from '../../../utils/typedAction/action';

export const GET_DRILLS_REQUEST = '[drills] GET_DRILLS_REQUEST';
export const GET_DRILLS_SUCCESS = '[drills] GET_DRILLS_SUCCESS';
export const GET_DRILLS_FAIL = '[drills] GET_DRILLS_FAIL';
// tslint:disable-next-line:max-line-length
export const getDrillsByCategoryIdRequest = (id: string, categoryType: DrillCategoryType) =>
  createAction(GET_DRILLS_REQUEST, { id, categoryType });
export type getDrillsByCategoryIdRequest = ReturnType<typeof getDrillsByCategoryIdRequest>;
export const getDrillsByCategoryIdSuccess = (drills: Drill[]) =>
  createAction(GET_DRILLS_SUCCESS, { drills });
export const getDrillsByCategoryIdFail = (error: any) => createAction(GET_DRILLS_FAIL, { error });

export const GET_CATEGORIES_REQUEST = '[drills] GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = '[drills] GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = '[drills] GET_CATEGORIES_FAIL';
export const getDrillsCategoriesRequest = () => createAction(GET_CATEGORIES_REQUEST, {});
export type getDrillsCategoriesRequest = ReturnType<typeof getDrillsCategoriesRequest>;
export const getDrillsCategoriesSuccess =
  (categories: DrillCategoriesGroupped) => createAction(GET_CATEGORIES_SUCCESS, { categories });
export const getDrillsCategoriesFail = (error: any) => createAction(GET_CATEGORIES_FAIL, { error });

export const GET_DRILL_REQUEST = '[drills] GET_DRILL_REQUEST';
export const GET_DRILL_SUCCESS = '[drills] GET_DRILL_SUCCESS';
export const GET_DRILL_FAIL = '[drills] GET_DRILL_FAIL';
export const getDrillRequest = (id: string, userId: string) =>
  createAction(GET_DRILL_REQUEST, { id, userId });
export type getDrillRequest = ReturnType<typeof getDrillRequest>;
export const getDrillSuccess = (drill: DrillDetailed) => createAction(GET_DRILL_SUCCESS, { drill });
export const getDrillFail = (error: any) => createAction(GET_DRILL_FAIL, { error });

export const SEARCH_DRILLS_REQUEST = '[drills] SEARCH_DRILLS_REQUEST';
export const SEARCH_DRILLS_SUCCESS = '[drills] SEARCH_DRILLS_SUCCESS';
export const SEARCH_DRILLS_FAIL = '[drills] GET_DRILLS_FAIL';
export const searchDrillsByIdRequest = (id: string) =>
  createAction(SEARCH_DRILLS_REQUEST, { id });
export type searchDrillsByIdRequest = ReturnType<typeof searchDrillsByIdRequest>;
export const searchDrillsByIdSuccess = (drills: Drill[]) =>
  createAction(SEARCH_DRILLS_SUCCESS, { drills });
export const searchDrillsByIdFail = (error: any) => createAction(SEARCH_DRILLS_FAIL, { error });

export const drillActions = {
  getDrillsByCategoryIdRequest,
  getDrillsByCategoryIdSuccess,
  getDrillsByCategoryIdFail,
  getDrillsCategoriesRequest,
  getDrillsCategoriesSuccess,
  getDrillsCategoriesFail,
  getDrillRequest,
  getDrillSuccess,
  getDrillFail,

  searchDrillsByIdRequest,
  searchDrillsByIdSuccess,
  searchDrillsByIdFail,
};

export type drillActions = ActionsUnion<typeof drillActions>;

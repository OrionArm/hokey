import { DrillCategoriesGroupped, Drill } from '../drills/model';
import { createAction } from '../utils/typedAction/createAction';
import { ActionsUnion } from '../utils/typedAction/action';

export const GET_DRILLS_REQUEST = '[drills] GET_DRILLS_REQUEST';
export const GET_DRILLS_SUCCESS = '[drills] GET_DRILLS_SUCCESS';
export const GET_DRILLS_FAIL = '[drills] GET_DRILLS_FAIL';

// tslint:disable-next-line:max-line-length
export const getDrillsByCategoryIdRequest = (id: number) => createAction(GET_DRILLS_REQUEST, { id });
export type getDrillsByCategoryIdRequest = ReturnType<typeof getDrillsByCategoryIdRequest>;
export const getDrillsByCategoryIdSuccess = (drills: Drill[]) =>
  createAction(GET_DRILLS_SUCCESS, { drills });
export const getDrillsByCategoryIdFail = (error: any) => createAction(GET_DRILLS_FAIL, { error });

export const GET_CATEGORIES_REQUEST = '[drills] GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = '[drills] GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL    = '[drills] GET_CATEGORIES_FAIL';

export const getDrillsCategoriesRequest = () => createAction(GET_CATEGORIES_REQUEST, {});
export type getDrillsCategoriesRequest = ReturnType<typeof getDrillsCategoriesRequest>;
export const getDrillsCategoriesSuccess =
  (categories: DrillCategoriesGroupped) => createAction(GET_CATEGORIES_SUCCESS, { categories });
export const getDrillsCategoriesFail = (error: any) => createAction(GET_CATEGORIES_FAIL, { error });

export const drillActions = {
  getDrillsByCategoryIdRequest,
  getDrillsByCategoryIdSuccess,
  getDrillsByCategoryIdFail,
  getDrillsCategoriesRequest,
  getDrillsCategoriesSuccess,
  getDrillsCategoriesFail,
};

export type drillActions = ActionsUnion<typeof drillActions>;

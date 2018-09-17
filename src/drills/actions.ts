import { DrillCategoriesGroupped } from '../drills/model';
import { createAction } from '../utils/typedAction/createAction';
import { ActionsUnion } from '../utils/typedAction/action';

export const GET_DRILLS_REQUEST = '[drills] GET_LIST_REQUEST';
export const GET_DRILLS_SUCCESS = '[drills] GET_LIST_SUCCESS';
export const GET_DRILLS_FAIL = '[drills] GET_LIST_FAIL';

// tslint:disable-next-line:max-line-length
export const getDrillsByCategoryIdRequest = (id: number) => createAction(GET_DRILLS_REQUEST, { id });
export type getDrillsByCategoryIdRequest = ReturnType<typeof getDrillsByCategoryIdRequest>;
export const getDrillsByCategoryIdSuccess = (drills: DrillCategoriesGroupped) =>
  createAction(GET_DRILLS_SUCCESS, { drills });
export const getDrillsByCategoryIdFail = (error: any) => createAction(GET_DRILLS_FAIL, { error });

const drillActions = {
  getDrillsByCategoryIdRequest,
  getDrillsByCategoryIdSuccess,
  getDrillsByCategoryIdFail,
};

export type drillActions = ActionsUnion<typeof drillActions>;

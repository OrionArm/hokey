import { DrillStatus, NormDrills } from 'src/store/drils/model';
import { ActionsUnion } from 'src/utils/typedAction/action';
import { createAction } from 'src/utils/typedAction/createAction';
import {
  DrillCategoriesGrouped,
  DrillDetailed,
  DrillCategoryType,
  RegenerateDrill,
  DownloadDrill,
  DownloadParams,
} from './model';

export const GET_DRILLS_REQUEST = '[drills] GET_DRILLS_REQUEST';
export const GET_DRILLS_SUCCESS = '[drills] GET_DRILLS_SUCCESS';
export const GET_DRILLS_FAIL = '[drills] GET_DRILLS_FAIL';
// tslint:disable-next-line:max-line-length
export const getDrillsByCategoryIdRequest = (
  id: string,
  categoryType: DrillCategoryType,
) => createAction(GET_DRILLS_REQUEST, { id, categoryType });
export type getDrillsByCategoryIdRequest = ReturnType<
  typeof getDrillsByCategoryIdRequest
>;
export const getDrillsByCategoryIdSuccess = (drills: NormDrills) =>
  createAction(GET_DRILLS_SUCCESS, { drills });
export const getDrillsByCategoryIdFail = (error: any) =>
  createAction(GET_DRILLS_FAIL, { error });

export const GET_CATEGORIES_REQUEST = '[drills] GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = '[drills] GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = '[drills] GET_CATEGORIES_FAIL';
export const getDrillsCategoriesRequest = () =>
  createAction(GET_CATEGORIES_REQUEST, {});
export type getDrillsCategoriesRequest = ReturnType<
  typeof getDrillsCategoriesRequest
>;
export const getDrillsCategoriesSuccess = (
  categories: DrillCategoriesGrouped,
) => createAction(GET_CATEGORIES_SUCCESS, { categories });
export const getDrillsCategoriesFail = (error: any) =>
  createAction(GET_CATEGORIES_FAIL, { error });

export const GET_DRILL_REQUEST = '[drills] GET_DRILL_REQUEST';
export const GET_DRILL_SUCCESS = '[drills] GET_DRILL_SUCCESS';
export const GET_DRILL_FAIL = '[drills] GET_DRILL_FAIL';
export const getDrillRequest = (id: string, userId: string) =>
  createAction(GET_DRILL_REQUEST, { id, userId });
export type getDrillRequest = ReturnType<typeof getDrillRequest>;
export const getDrillSuccess = (drill: DrillDetailed) =>
  createAction(GET_DRILL_SUCCESS, { drill });
export const getDrillFail = (error: any) =>
  createAction(GET_DRILL_FAIL, { error });

export const SEARCH_DRILLS_REQUEST = '[drills] SEARCH_DRILLS_REQUEST';
export const SEARCH_DRILLS_SUCCESS = '[drills] SEARCH_DRILLS_SUCCESS';
export const SEARCH_DRILLS_FAIL = '[drills] GET_DRILLS_FAIL';
export const searchDrillsByIdRequest = (id: string) =>
  createAction(SEARCH_DRILLS_REQUEST, { id });
export type searchDrillsByIdRequest = ReturnType<
  typeof searchDrillsByIdRequest
>;
export const searchDrillsByIdSuccess = (drills: NormDrills) =>
  createAction(SEARCH_DRILLS_SUCCESS, { drills });
export const searchDrillsByIdFail = (error: any) =>
  createAction(SEARCH_DRILLS_FAIL, { error });

export const REGENERATE_DRILLS_REQUEST = '[drills] REGENERATE_DRILLS_REQUEST';
export const REGENERATE_DRILLS_SUCCESS = '[drills] REGENERATE_DRILLS_SUCCESS';
export const REGENERATE_DRILLS_FAIL = '[drills] REGENERATE_DRILLS_FAIL';

export const regenerateDrillsRequest = (payload: RegenerateDrill) =>
  createAction(REGENERATE_DRILLS_REQUEST, payload);
export type regenerateDrillsRequest = ReturnType<
  typeof regenerateDrillsRequest
>;
export const regenerateDrillsSuccess = (status: DrillStatus) =>
  createAction(REGENERATE_DRILLS_SUCCESS, { status });
export const regenerateDrillsFail = (error: any) =>
  createAction(REGENERATE_DRILLS_FAIL, { error });

export const DOWNLOAD_DRILLS_REQUEST = '[drills] DOWNLOAD_DRILLS_REQUEST';
export const DOWNLOAD_DRILLS_SUCCESS = '[drills] DOWNLOAD_DRILLS_SUCCESS';
export const DOWNLOAD_DRILLS_FAIL = '[drills] DOWNLOAD_DRILLS_FAIL';

export const downloadDrillsRequest = (
  payload: DownloadDrill & DownloadParams,
) => createAction(DOWNLOAD_DRILLS_REQUEST, payload);
export type downloadDrillsRequest = ReturnType<typeof downloadDrillsRequest>;
export const downloadDrillsSuccess = (payload: DownloadDrill) => {
  return createAction(DOWNLOAD_DRILLS_SUCCESS, payload);
};
export const downloadDrillsFail = (error: any) =>
  createAction(DOWNLOAD_DRILLS_FAIL, { error });

export const UPDATE_GENERATION_STATUS = '[drills] UPDATE_GENERATION_STATUS';
export const updateGenerationStatus = (status: DrillStatus) =>
  createAction(UPDATE_GENERATION_STATUS, { status });
export type updateGenerationStatus = ReturnType<typeof updateGenerationStatus>;

export const DRILL_GENERATION_STATUS_ERROR =
  '[drills] DRILL_GENERATION_STATUS_ERROR';
export const drillGenerationStatusError = ({ errorDrillId }: any) =>
  createAction(DRILL_GENERATION_STATUS_ERROR, { errorDrillId });
export type drillGenerationStatusError = ReturnType<
  typeof drillGenerationStatusError
>;

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

  regenerateDrillsRequest,
  regenerateDrillsSuccess,
  regenerateDrillsFail,

  downloadDrillsRequest,
  downloadDrillsSuccess,
  downloadDrillsFail,

  updateGenerationStatus,
  drillGenerationStatusError,
};

export type drillActions = ActionsUnion<typeof drillActions>;

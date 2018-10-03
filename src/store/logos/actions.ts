import { logoIdList, NormLogos } from 'src/store/logos/interface';
import { LogoModel } from 'src/store/logos/model';
import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const GET_LOGOS_REQUEST = '[logos] GET_LOGOS_REQUEST';
export type getLogosRequest = ReturnType<typeof getLogosRequest>;
const getLogosRequest = () => createAction(GET_LOGOS_REQUEST);

export const GET_LOGOS_SUCCESS = '[logos] GET_LOGOS_SUCCESS';
export type getLogosSuccess = ReturnType<typeof getLogosSuccess>;
const getLogosSuccess = (payload: { logos: NormLogos }) =>
  createAction(GET_LOGOS_SUCCESS, payload);

export type changeDefaultLogoPayload = { logoId: string; };
export const CHANGE_DEFAULT_LOGOS_REQUEST = '[logos] CHANGE_DEFAULT_LOGOS_REQUEST';
export type changeDefaultLogoRequest = ReturnType<typeof changeDefaultLogoRequest>;
const changeDefaultLogoRequest = (payload: changeDefaultLogoPayload) =>
  createAction(CHANGE_DEFAULT_LOGOS_REQUEST, payload);

export const CHANGE_DEFAULT_LOGOS_SUCCESS = '[logos] CHANGE_DEFAULT_LOGOS_SUCCESS';
export type changeDefaultLogoSuccess = ReturnType<typeof changeDefaultLogoSuccess>;
const changeDefaultLogoSuccess = (payload: changeDefaultLogoPayload) =>
  createAction(CHANGE_DEFAULT_LOGOS_SUCCESS, payload);

export const DELETE_LOGOS_REQUEST = '[logos] DELETE_LOGOS_REQUEST';
export type deleteLogosRequest = ReturnType<typeof deleteLogosRequest>;
const deleteLogosRequest = (payload: logoIdList) => createAction(DELETE_LOGOS_REQUEST, payload);

export const DELETE_LOGOS_SUCCESS = '[logos] DELETE_LOGOS_SUCCESS';
export type deleteLogosSuccess = ReturnType<typeof deleteLogosSuccess>;
const deleteLogosSuccess = (payload: logoIdList) => createAction(DELETE_LOGOS_SUCCESS, payload);

export const DELETE_LOGOS_FAIL = '[logos] DELETE_LOGOS_FAIL';
export type deleteLogosFail= ReturnType<typeof deleteLogosFail>;
const deleteLogosFail = (payload: logoIdList) => createAction(DELETE_LOGOS_SUCCESS, payload);

export const ADD_LOGO_REQUEST = '[logos] ADD_LOGO_REQUEST';
export type addLogosRequest = ReturnType<typeof addLogosRequest>;
const addLogosRequest = (payload: { image: File, name: string }) =>
  createAction(ADD_LOGO_REQUEST, payload);

export const ADD_LOGO_SUCCESS = '[logos] ADD_LOGO_SUCCESS';
export type addLogosSuccess = ReturnType<typeof addLogosSuccess>;
const addLogosSuccess = (payload: {logo: LogoModel}) => createAction(ADD_LOGO_SUCCESS, payload);

export type editLogoPayload = { name: string, logoId: string };
export const EDIT_LOGO_REQUEST = '[logos] EDIT_LOGO_REQUEST';
export type editLogoRequest = ReturnType<typeof editLogoRequest>;
const editLogoRequest = (payload: editLogoPayload) => createAction(EDIT_LOGO_REQUEST, payload);

export const EDIT_LOGO_SUCCESS = '[logos] EDIT_LOGO_SUCCESS';
export type editLogoSuccess = ReturnType<typeof editLogoSuccess>;
const editLogoSuccess = (payload: editLogoPayload) => createAction(EDIT_LOGO_SUCCESS, payload);

export const logosActions = {
  getLogosRequest,
  getLogosSuccess,
  changeDefaultLogoRequest,
  changeDefaultLogoSuccess,
  deleteLogosRequest,
  deleteLogosSuccess,
  deleteLogosFail,
  addLogosRequest,
  addLogosSuccess,
  editLogoRequest,
  editLogoSuccess,
};

export type logosActions = ActionsUnion<typeof logosActions>;
export default logosActions;

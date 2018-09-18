import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';
import { LogoModel } from 'src/logos/model';

export const GET_LOGOS_REQUEST = '[logos] GET_LOGOS_REQUEST';
export type getLogosRequest = ReturnType<typeof getLogosRequest>;
const getLogosRequest = () => createAction(GET_LOGOS_REQUEST);

export const GET_LOGOS_SUCCESS = '[logos] GET_LOGOS_SUCCESS';
export type getLogosSuccess = ReturnType<typeof getLogosSuccess>;
const getLogosSuccess = (payload: { logos: LogoModel[]}) => {
  return createAction(GET_LOGOS_SUCCESS, payload);
};

export const CHANGE_DEFAULT_LOGOS_REQUEST = '[logos] CHANGE_DEFAULT_LOGOS_REQUEST';
export type changeDefaultLogoRequest = ReturnType<typeof changeDefaultLogoRequest>;
const changeDefaultLogoRequest = (payload: { logoId: string; }) => {
  return createAction(CHANGE_DEFAULT_LOGOS_REQUEST, payload);
};

export const CHANGE_DEFAULT_LOGOS_SUCCESS = '[logos] CHANGE_DEFAULT_LOGOS_SUCCESS';
export type changeDefaultLogoSuccess = ReturnType<typeof changeDefaultLogoSuccess>;
const changeDefaultLogoSuccess = () => createAction(CHANGE_DEFAULT_LOGOS_SUCCESS);

export const DELETE_LOGOS_REQUEST = '[logos] DELETE_LOGOS_REQUEST';
export type deleteLogosRequest = ReturnType<typeof deleteLogosRequest>;
const deleteLogosRequest = (payload: { logosIds: string[] }) => {
  return createAction(DELETE_LOGOS_REQUEST, payload);
};

export const DELETE_LOGOS_SUCCESS = '[logos] DELETE_LOGOS_SUCCESS';
export type deleteLogosSuccess = ReturnType<typeof deleteLogosSuccess>;
const deleteLogosSuccess = () => createAction(DELETE_LOGOS_SUCCESS);

export const ADD_LOGO_REQUEST = '[logos] SET_LOGOS_REQUEST';
export type addLogosRequest = ReturnType<typeof addLogosRequest>;
const addLogosRequest = (payload: { images: File[] }) => createAction(ADD_LOGO_REQUEST, payload);

export const ADD_LOGO_SUCCESS = '[logos] SET_LOGOS_SUCCESS';
export type addLogosSuccess = ReturnType<typeof addLogosSuccess>;
const addLogosSuccess = () => createAction(ADD_LOGO_SUCCESS);

export const logosActions = {
  getLogosRequest,
  getLogosSuccess,
  changeDefaultLogoRequest,
  changeDefaultLogoSuccess,
  deleteLogosRequest,
  deleteLogosSuccess,
  addLogosRequest,
  addLogosSuccess,
};

export type logosActions = ActionsUnion<typeof logosActions>;
export default logosActions;

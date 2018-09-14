import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const CLEAR_TOKEN     = '[token] CLEAR_TOKEN';
export const SET_TO_RESPONSE = '[token] SET_TO_RESPONSE';
export const SET_TO_STATE    = '[token] SET_TO_STATE';
export const SET_TO_STORAGE  = '[token] SET_TO_STORAGE';

const setToResponse = (token: string) => createAction(SET_TO_RESPONSE, token);
export type setToResponse = ReturnType<typeof setToResponse>;

const setToState = (token: string) => createAction(SET_TO_STATE, token);
export type setToState = ReturnType<typeof setToState>;

const setToStorage = (itemToStorage: ItemToStorage) => createAction(SET_TO_STORAGE, itemToStorage);
export type setToStorage = ReturnType<typeof setToStorage>;

const clearToken = () => createAction(CLEAR_TOKEN);
export type clearToken = ReturnType<typeof clearToken>;

export const tokenActions = {
  setToResponse,
  setToState,
  setToStorage,
  clearToken,
};
export type tokenActions = ActionsUnion<typeof tokenActions>;

type ItemToStorage = { token: string, isRememberMe: boolean };

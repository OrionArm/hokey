import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const LOGIN_REQUEST = '[user] LOGIN_REQUEST';
const loginRequest         = (loginData: ILoginRequest) => createAction(LOGIN_REQUEST, loginData);
export type loginRequest = ReturnType<typeof loginRequest>;

export const LOGIN_SUCCESS = '[user] LOGIN_SUCCESS';
const loginSuccess         = (user: IUser) => createAction(LOGIN_SUCCESS, user);
export type loginSuccess = ReturnType<typeof loginSuccess>;

export const LOGOUT_REQUEST = '[user] LOGOUT_REQUEST';
const logoutRequest         = () => createAction(LOGOUT_REQUEST);
export type logoutRequest = ReturnType<typeof logoutRequest>;

export const TOKEN_LOGIN = '[user] TOKEN_LOGIN';
const tokenLogin         = (payload: { token: string }) => createAction(TOKEN_LOGIN, payload);
export type tokenLogin = ReturnType<typeof tokenLogin>;

export const SELECT_USER = '[user] SELECT_USER';
const selectUser = (id: number | 'me') => createAction(SELECT_USER, { id });
export type selectUser = ReturnType<typeof selectUser>;

export const userActions = {
  loginRequest,
  loginSuccess,
  logoutRequest,
  tokenLogin,
  selectUser,
};
export type userActions = ActionsUnion<typeof userActions>;

export default userActions;

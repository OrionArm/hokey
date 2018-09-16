import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const LOGIN_REQUEST = '[user] LOGIN_REQUEST';
export const LOGIN_SUCCESS = '[user] LOGIN_SUCCESS';
export const LOGOUT_REQUEST = '[user] LOGOUT_REQUEST';

const loginRequest = (loginData: ILoginRequest) => createAction(LOGIN_REQUEST, loginData);
export type loginRequest = ReturnType<typeof loginRequest>;

const loginSuccess = (user: IUser) => createAction(LOGIN_SUCCESS, user);
export type loginSuccess = ReturnType<typeof loginSuccess>;

const logoutRequest = () => createAction(LOGOUT_REQUEST);
export type logoutRequest = ReturnType<typeof logoutRequest>;

export const userActions = {
  loginRequest,
  loginSuccess,
  logoutRequest,
};
export type userActions = ActionsUnion<typeof userActions>;

export default userActions;

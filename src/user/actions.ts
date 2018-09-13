import { createAction } from '../utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const LOGIN_REQUEST = '[user] LOGIN_REQUEST';
export const LOGIN_SUCCESS = '[user] LOGIN_SUCCESS';

const loginRequest = (loginData: ILoginRequest) => createAction(LOGIN_REQUEST, loginData);
const loginSuccess = (token: string) => createAction(LOGIN_SUCCESS, token);
export type loginRequest = ReturnType<typeof loginRequest>;
export type loginSuccess = ReturnType<typeof loginSuccess>;

export const userActions = {
  loginRequest,
  loginSuccess,
};
export type userActions = ActionsUnion<typeof userActions>;

export default userActions;

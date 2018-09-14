import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const LOGIN_REQUEST = '[user] LOGIN_REQUEST';
export const LOGIN_SUCCESS = '[user] LOGIN_SUCCESS';

const loginRequest = (loginData: ILoginRequest) => createAction(LOGIN_REQUEST, loginData);
export type loginRequest = ReturnType<typeof loginRequest>;

const loginSuccess = (user: IUser) => createAction(LOGIN_SUCCESS, user);
export type loginSuccess = ReturnType<typeof loginSuccess>;

export const userActions = {
  loginRequest,
  loginSuccess,
};
export type userActions = ActionsUnion<typeof userActions>;

export default userActions;

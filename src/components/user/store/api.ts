import { AxiosPromise } from 'axios';
import request from '../../../utils/request';

function login(loginRequest: ILoginRequest): AxiosPromise<ILoginResponse> {
  return request.post('/login', loginRequest);
}

function loginWithToken(): AxiosPromise<ILoginResponse> {
  return request.get('/me');
}

const userAPI = {
  login,
  loginWithToken,
};
export default userAPI;

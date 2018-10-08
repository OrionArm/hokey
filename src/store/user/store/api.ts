import { AxiosPromise } from 'axios';
import request from '../../../utils/request';

function login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
  return request.post('/login', loginRequest)
    .then(response => response.data);
}

function loginWithToken(): AxiosPromise<ILoginResponse> {
  return request.get('/me');
}

const userAPI = {
  login,
  loginWithToken,
};
export default userAPI;

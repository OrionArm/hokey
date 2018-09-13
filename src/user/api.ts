import request from '../utils/request';
import { AxiosPromise } from 'axios';

function login(loginRequest: ILoginRequest): AxiosPromise<ILoginResponse> {
  return request.post('/login', loginRequest);
}

const userAPI = {
  login,
};
export default userAPI;

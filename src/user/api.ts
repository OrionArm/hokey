import { AxiosPromise } from 'axios';
import request from '../utils/request';

function login(loginRequest: ILoginRequest): AxiosPromise<ILoginResponse> {
  return request.post('/login', loginRequest);
}

const userAPI = {
  login,
};
export default userAPI;

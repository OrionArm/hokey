import { Request } from '../utils/request';
import { AxiosPromise } from 'axios';

function login(loginRequest: ILoginRequest): AxiosPromise<any> {
  return Request.post('/login', loginRequest);
}

const userAPI = {
  login,
};
export default userAPI;

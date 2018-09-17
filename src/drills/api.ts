
import { AxiosPromise } from 'axios';
import request from '../utils/request';

interface Payload {
  id: number;
}
interface Response {
}

function getDrillsByCategoryId({ id }: Payload): AxiosPromise<Response> {
  return request.get(`/users/me/drill-categories/public/${id}/drills`);
}

const drillsAPI = {
  getDrillsByCategoryId,
};
export default drillsAPI;

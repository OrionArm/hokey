
import { AxiosPromise } from 'axios';
import request from '../utils/request';

interface Payload {
  id: number;
}
interface Response {
}

function getDrillsByCategoryId({ id }: Payload): AxiosPromise<Response> {
  const toEntity = (x: any) => ({ id: x.drillid, name: x.drillname });
  return request.get(`/users/me/drill-categories/public/${id}/drills`).then(res => {
    res.data = res.data.map(toEntity);
    return res;
  });
}

function getCategories(): AxiosPromise<any> {
  const toEntity = (x: any) => ({ id: x.categoryid, name: x.categoryname, count: 10 });
  return request.get('/users/me/drill-categories').then(res => {
    res.data.custom = res.data.custom.map(toEntity);
    res.data.public = res.data.public.map(toEntity);
    return res;
  });
}

const drillsAPI = {
  getDrillsByCategoryId,
  getCategories,
};
export default drillsAPI;

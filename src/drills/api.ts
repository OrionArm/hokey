
import { AxiosPromise } from 'axios';
import request from '../utils/request';
import downloadRequest from '../utils/download-request';

function getDrillsByCategoryId({ id, categoryType }: any): AxiosPromise<any> {
  const toEntity = (x: any) => ({ id: x.drillid, name: x.drillname });
  return request.get(`/users/me/drill-categories/${categoryType}/${id}/drills`).then(res => {
    res.data = res.data.map(toEntity);
    return res;
  });
}

function getCategories(): AxiosPromise<any> {
  const toEntity = (x: any) => ({ id: x.categoryid, name: x.categoryname, count: +x.total_drills });
  return request.get('/users/me/drill-categories').then(res => {
    res.data.custom = res.data.custom.map(toEntity);
    res.data.public = res.data.public.map(toEntity);
    return res;
  });
}

function downloadPdf(id: string): any {
  return downloadRequest(`/users/me/watermarks/${id}`);
}

function downloadVideo(id: string): any {
  return request.get(`/users/me/drills/${id}/animation`).then(response => {
    const url = response.data.s3video;
    window.open(url, '_blank');
    // return downloadRequest(url);
  });
}

function getDrill(id: string): AxiosPromise<any> {
  return request.get(`/users/me/drills/${id}`);
}

function regenerate(id: string): AxiosPromise<any> {
  return request.post(`/users/me/drills/${id}/regenerate`);
}

const drillsAPI = {
  getDrillsByCategoryId,
  getCategories,
  downloadPdf,
  downloadVideo,
  getDrill,
  regenerate,
};
export default drillsAPI;

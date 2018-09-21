
import { AxiosPromise } from 'axios';
import request from '../utils/request';
import downloadRequest from '../utils/download-request';
import { DrillDetailed, DrillCategoryType } from './model';
import { SearchType } from 'src/layout/drillsPage/CategoriesBar';

function getDrillsByCategoryId(
  payload: {
    id: string,
    categoryType: DrillCategoryType,
    userId: number | 'me',
  }): AxiosPromise<any>;

function getDrillsByCategoryId(payload: any) {
  const { id, categoryType, userId } = payload;
  const toEntity = (x: any) => ({
    id: x.drillid,
    name: x.drillname,
    has_animation: x.has_animation === '1',
  });
  return request.get(`/users/${userId}/drill-categories/${categoryType}/${id}/drills`).then(res => {
    res.data = res.data.map(toEntity);
    return res;
  });
}

function getCategories(userId: number | 'me'): AxiosPromise<any> {
  const toEntity = (x: any) => ({
    id: x.categoryid,
    name: x.categoryname,
    count: x.total_drills === undefined ? undefined : +x.total_drills,
  });
  return request.get(`/users/${userId}/drill-categories`).then(res => {
    res.data.custom = res.data.custom.map(toEntity);
    res.data.public = res.data.public.map(toEntity);
    return res;
  });
}

function downloadPdf(id: string): any {
  return downloadRequest(`https://www.hockeyshare.com/drills/pdf/?id=${id}`);
}

function downloadVideo(id: string, userId: number | 'me'): any {
  return request.get(`/users/${userId}/drills/${id}/animation`).then(response => {
    const url = response.data.s3video;
    window.open(url, '_blank');
    // return downloadRequest(url);
  });
}

function getDrill(id: string, userId: number | 'me'): AxiosPromise<DrillDetailed> {
  const toEntity = (x: any) => ({
    id: x.drillid,
    preview: x.s3url_1,
    name: x.drillname,
    has_animation: x.has_animation === '1',
    animation: x.animation ? x.animation.s3video : '',
    logo_url: x.logo_url ? x.logo_url.watermark_url : '',
  });
  return request.get(`/users/${userId}/drills/${id}`).then(res => {
    res.data = toEntity(res.data);
    return res;
  });
}

function regenerate(id: string, userId: number | 'me'): AxiosPromise<any> {
  return request.post(`/users/${userId}/drills/${id}/regenerate`);
}

function regenerateWithNewLogo(
  id: string,
  logoId: string,
  userId: number | 'me',
): AxiosPromise<any> {
  return request.post(
    `/users/${userId}/watermarks/${logoId}/splice`,
    {},
    { params: { drill_ids: [id] } },
  );
}

function searchUsers(
  value: string,
  type: SearchType,
): AxiosPromise<any[]> {
  return request.get('/users', { params: { value, type } }).then(response => {
    const users = response.data.map((user: any) => ({
      value: +user.userid,
      label: user.username,
    }));
    response.data = users;
    return response;
  });
}

const drillsAPI = {
  getDrillsByCategoryId,
  getCategories,
  downloadPdf,
  downloadVideo,
  getDrill,
  regenerate,
  regenerateWithNewLogo,
  searchUsers,
};
export default drillsAPI;

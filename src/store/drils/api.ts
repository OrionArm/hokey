
import { AxiosPromise } from 'axios';
import FileSaver from 'file-saver';
import { SearchType } from 'src/components/drills/CategoriesBar';
import { RegenereteDrill } from 'src/store/drils/model';
import request from '../../utils/request';
import { DrillCategoryType, DrillDetailed } from './model';

const qs = require('qs');

const toDrillEntity = (x: any) => ({
  id: x.drillid,
  name: x.drillname,
  has_animation: x.has_animation === '1',
  userId: x.user_id || x.userid,
});

function getDrillsByCategoryId(
  payload: {
    id: string,
    categoryType: DrillCategoryType,
    userId: number | 'me',
  }): AxiosPromise<any>;

function getDrillsByCategoryId(payload: any) {
  const { id, categoryType, userId } = payload;

  return request.get(`/users/${userId}/drill-categories/${categoryType}/${id}/drills`).then(res => {
    res.data = res.data.map(toDrillEntity);
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

function downloadPdf(id: string, userId: number | string | 'me'): any {
  return request.post(`/users/${userId}/drills/${id}/export/pdf`).then(response => {
    window.open(response.data, '_blank');
  });
}

function downloadMultiplePdfs(userId: string, drill_ids: string[]) {
  return request.post(
    `/users/${userId}/drills/download/pdfs`,
    undefined,
    {
      params: { drill_ids },
      responseType: 'blob',
    })
    .then(response => {
      FileSaver.saveAs(
        new Blob([response.data]),
        'pdfs.zip',
      );
    });
}

function downloadVideo(id: string, userId: number | 'me'): any {
  return request.get(`/users/${userId}/drills/${id}/animation`).then(response => {
    const url = response.data.s3video;
    window.open(url, '_blank');
  });
}

function downloadMultipleVideos(
  drill_ids: string[],
  userId: number | string | 'me',
) {
  return request.post(
    `/users/${userId}/drills/download/videos`,
    undefined,
    {
      params      : { drill_ids },
      responseType: 'blob',
    })
    .then(response => {
      FileSaver.saveAs(new Blob([response.data]), 'animations.zip');
    });
}

function getDrill(id: string, userId: number | string | 'me'): AxiosPromise<DrillDetailed> {
  const toEntity = (x: any) => ({
    id: x.drillid,
    preview: x.s3url_1,
    name: x.drillname,
    has_animation: x.has_animation === '1',
    animation: x.animation ? x.animation.s3video : '',
    logo_url: x.logo_url,
  });
  return request.get(`/users/${userId}/drills/${id}`).then(res => {
    res.data = toEntity(res.data);
    return res;
  });
}

function regenerate({ drill_ids, userId }: {
  drill_ids: string[], userId: number | string | 'me',
}): AxiosPromise<any> {
  return request.post(
    `/users/${userId}/drills/regenerate`,
    qs.stringify({ drill_ids }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

function regenerateWithNewLogo(payload: RegenereteDrill): AxiosPromise<any> {
  const { drill_ids, logoId, userId } = payload;
  console.log('drill_ids', drill_ids, 'logoId', logoId);
  return request.post(
    `/users/${userId}/watermarks/${logoId}/splice`,
    {},
    { params: { drill_ids: Array.isArray(drill_ids) ? drill_ids : [drill_ids] } },
  );
}

function searchUsers(
  value: string,
  type: SearchType,
): AxiosPromise<any[]> {
  return request.get('/users', { params: { value, type } }).then(response => {
    const users = response.data.map((user: any) => ({
      value: user.userid,
      label: user.username,
    }));
    response.data = users;
    return response;
  });
}

function searchDrills(value: string) {
  return request.get('/drills', { params: { value } })
    .then(res => {
      res.data = toDrillEntity(res.data);
      return res;
    });
}

function checkGenerationStatus(userId: string, generation_ids: string): AxiosPromise<string[]> {
  return request.get(
    `/users/${userId}/watermarks/generation/status`,
    { params: { generation_ids } },
  ).then(response => {
    response.data = Object.keys(response.data)
      .filter(id => response.data[id] !== 'done');
    return response;
  });
}

const drillsAPI = {
  checkGenerationStatus,
  downloadMultiplePdfs,
  downloadMultipleVideos,
  downloadPdf,
  downloadVideo,
  getCategories,
  getDrill,
  getDrillsByCategoryId,
  regenerate,
  regenerateWithNewLogo,
  searchDrills,
  searchUsers,
};
export default drillsAPI;

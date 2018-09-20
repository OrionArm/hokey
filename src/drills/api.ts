
import { AxiosPromise } from 'axios';
import request from '../utils/request';
import downloadRequest from '../utils/download-request';

function getDrillsByCategoryId({ id, categoryType }: any): AxiosPromise<any> {
  const toEntity = (x: any) => ({
    id: x.drillid,
    name: x.drillname,
    has_animation: x.has_animation === '1',
  });
  return request.get(`/users/me/drill-categories/${categoryType}/${id}/drills`).then(res => {
    res.data = res.data.map(toEntity);
    return res;
  });
}

function getCategories(): AxiosPromise<any> {
  const toEntity = (x: any) => ({
    id: x.categoryid,
    name: x.categoryname,
    count: x.total_drills === undefined ? undefined : +x.total_drills,
  });
  return request.get('/users/me/drill-categories').then(res => {
    res.data.custom = res.data.custom.map(toEntity);
    res.data.public = res.data.public.map(toEntity);
    return res;
  });
}

function downloadPdf(id: string): any {
  return downloadRequest(`https://www.hockeyshare.com/drills/pdf/?id=${id}`);
}

function downloadVideo(id: string): any {
  return request.get(`/users/me/drills/${id}/animation`).then(response => {
    const url = response.data.s3video;
    window.open(url, '_blank');
    // return downloadRequest(url);
  });
}

function getDrill(id: string): AxiosPromise<any> {
  const toEntity = (x: any) => ({
    id: x.drillid,
    preview: x.s3url_1,
    name: x.drillname,
    has_animation: x.has_animation === '1',
    animation: x.animation ? x.animation.s3video : '',
    logo_url: x.logo_url ? x.logo_url.watermark_url : '',
  });
  return request.get(`/users/me/drills/${id}`).then(res => {
    res.data = toEntity(res.data);
    return res;
  });
}

function regenerate(id: string): AxiosPromise<any> {
  return request.post(`/users/me/drills/${id}/regenerate`);
}

function regenerateWithNewLogo(id: string, logoId: string): AxiosPromise<any> {
  return request.post(`/users/me/watermarks/${logoId}/splice`, {}, { params: { drill_ids: [id] } });
}

const drillsAPI = {
  getDrillsByCategoryId,
  getCategories,
  downloadPdf,
  downloadVideo,
  getDrill,
  regenerate,
  regenerateWithNewLogo,
};
export default drillsAPI;

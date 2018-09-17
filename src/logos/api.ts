import { AxiosPromise } from 'axios';
import request from '../utils/request';

const logosAPI = {
  getLogos,
  changeDefaultLogo,
  deleteLogos,
  setLogo,
  refreshLogo,
};

function getLogos(payload: { userId: string }): AxiosPromise<any> {
  return request.get(`/users/${payload.userId}/watermarks`);
}

function changeDefaultLogo(payload: IChangeDefaultLogoRequest): AxiosPromise<any> {
  return request.post(`/users/${payload.userId}/watermarks/default`, payload.logoId);
}

function deleteLogos(payload: IDeleteLogosRequest): AxiosPromise<any> {
  return request.delete(`/users/${payload.userId}/watermarks`, { data: payload.logosIds });
}

function setLogo(payload: ISetLogosRequest): AxiosPromise<any> {
  const headers = { 'Content-Type': 'image/png' };
  const config  = { headers };

  // name="image[]"; filename="file.png"
  const fd = new FormData();
  for (let i = 0; i < payload.images.length; i += 1) {
    fd.append(`images[${i}]`, payload.images[i]);
  }
  console.log('FormData = ', FormData);
  return request.post(`/users/${payload.userId}/watermarks`, fd, config);
}

function refreshLogo(payload: IRefreshLogosRequest): AxiosPromise<any> {
  const headers = { 'Content-Type': 'image/png' };
  // name="image[]"; filename="file.png"
  const config  = { headers };
  return request.patch(
    `/users/${payload.userId}/watermarks/${payload.logoId}`,
    payload.images,
    config,
  );
}

export default logosAPI;

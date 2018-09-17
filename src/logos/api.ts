import { AxiosPromise } from 'axios';
import request from '../utils/request';

const logosAPI = {
  getLogos,
  changeDefaultLogo,
  deleteLogos,
  setLogo,
  refreshLogo,
};

function getLogos(): AxiosPromise<any> {
  return request.get('/users/me/watermarks');
}

function changeDefaultLogo(logo: IChangeDefaultLogoRequest): AxiosPromise<any> {
  return request.post('/users/me/watermarks/default', logo);
}

function deleteLogos(logos: IDeleteLogosRequest): AxiosPromise<any> {
  return request.delete('/users/me/watermarks', { data: logos });
}

function setLogo(files: File[]): AxiosPromise<any> {
  const headers = { 'Content-Type': 'image/png' };
  const config  = { headers };

  // name="image[]"; filename="file.png"
  const fd = new FormData();
  for (let i = 0; i < files.length; i += 1) {
    fd.append(`images[${i}]`, files[i]);
  }
  console.log('FormData = ', FormData);
  return request.post('/users/me/watermarks', fd, config);
}

function refreshLogo(logo: ILoginRequest): AxiosPromise<any> {
  const headers = { 'Content-Type': 'image/png' };
  // name="image[]"; filename="file.png"
  const config  = { headers };
  return request.post('/login', logo, config);
}

export default logosAPI;

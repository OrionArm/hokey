import { AxiosPromise } from 'axios';
import {
  IChangeDefaultLogoRequest, IDeleteLogosRequest,
  ISetLogosRequest,
  LogoResponse, NormLogos,
} from 'src/store/logos/interface';
import request, { xWwwFormUrlencoded } from '../../utils/request';
import { LogoModel } from 'src/store/logos/model';

const logosAPI = {
  getLogos,
  changeDefaultLogo,
  deleteLogos,
  addLogo,
  editLogo,
};

function getLogos(payload: { userId: string }): AxiosPromise<NormLogos> {
  return request
    .get(`/users/${payload.userId}/watermarks`)
    .then(res => res.data.reduce(normalizeLogos, {}));
}

function changeDefaultLogo(payload: IChangeDefaultLogoRequest): AxiosPromise<any> {
  return request.patch(`/users/${payload.userId}/watermarks/${payload.logoId}/default`);
}

function deleteLogos(payload: IDeleteLogosRequest): AxiosPromise<any> {
  return request.delete(`/users/${payload.userId}/watermarks`, {
    params: { ids: payload.logosIds },
  });
}

function addLogo(payload: ISetLogosRequest): AxiosPromise<any> {
  const headers  = { 'Content-Type': 'multipart/form-data' };
  const config   = { headers };
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('name', payload.name);
  return request.post(`/users/${payload.userId}/watermarks`, formData, config);
}

function editLogo(payload: { userId: string, logoId: string, name: string }): AxiosPromise<any> {
  const headers    = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const config     = { headers };
  const properties = { name: payload.name };
  const body       = xWwwFormUrlencoded(properties);
  return request.patch(`/users/${payload.userId}/watermarks/${payload.logoId}`, body, config);
}

function normalizeLogos(acc: NormLogos, logoResponse: LogoResponse): NormLogos {
  const logo   = LogoModel.responseToModel(logoResponse);
  acc[logo.id] = logo;
  return acc;
}

export default logosAPI;

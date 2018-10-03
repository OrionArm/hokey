import {
  ChangeDefaultLogoRequest,
  DeleteLogosRequest,
  SetLogosRequest,
  LogoResponse, NormLogos, EditLogoRequest,
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

function getLogos(payload: { userId: string }): Promise<NormLogos> {
  return request
    .get(`/users/${payload.userId}/watermarks`)
    .then(res => res.data.reduce(normalizeLogos, {}));
}

function changeDefaultLogo(payload: ChangeDefaultLogoRequest): Promise<LogoResponse> {
  return request
    .patch(`/users/${payload.userId}/watermarks/${payload.logoId}/default`)
    .then(response => (response.data as LogoResponse));
}

function deleteLogos(payload: DeleteLogosRequest): Promise<ICheckDeleted> {
  return request
    .delete(`/users/${payload.userId}/watermarks`, { params: { ids: payload.logosIds } })
    .then(response => response.data)
    .then(idLogosDeletedFromServer => checkDeleted(payload.logosIds, idLogosDeletedFromServer));
}

function addLogo(payload: SetLogosRequest): Promise<LogoModel> {
  const headers  = { 'Content-Type': 'multipart/form-data' };
  const config   = { headers };
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('name', payload.name);

  return request
    .post(`/users/${payload.userId}/watermarks`, formData, config)
    .then(response => response.data.map(LogoModel.responseToModel))
    .then(logoModelList => logoModelList[0]);
}

function editLogo(payload: EditLogoRequest): Promise<LogoResponse> {
  const headers    = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const config     = { headers };
  const properties = { name: payload.name };
  const body       = xWwwFormUrlencoded(properties);

  return request
    .patch(`/users/${payload.userId}/watermarks/${payload.logoId}`, body, config)
    .then(response => (response.data as LogoResponse));
}

function normalizeLogos(acc: NormLogos, logoResponse: LogoResponse): NormLogos {
  const logo   = LogoModel.responseToModel(logoResponse);
  acc[logo.id] = logo;

  return acc;
}

export type ICheckDeleted = { successDeletedLogos: string[], failDeletedLogos: string[] };
function checkDeleted(idsFoDelete: string[], idsDeleted: string[]): ICheckDeleted {
  const successDeletedLogos: string[] = [];
  const failDeletedLogos: string[]    = [];
  idsFoDelete.forEach(logoId => {
    idsDeleted.forEach(responseId => {
      logoId === responseId
        ? successDeletedLogos.push(logoId)
        : failDeletedLogos.push(logoId);
    });
  });

  return ({ successDeletedLogos, failDeletedLogos });
}

export default logosAPI;

import { AxiosPromise } from 'axios';
import request, { xWwwFormUrlencoded } from '../../utils/request';
import { LogoModel } from 'src/store/logos/model';

const logosAPI = {
  getLogos,
  changeDefaultLogo,
  deleteLogos,
  addLogo,
  editLogo,
};

function getLogos(payload: { userId: string }) {
  const requestWatermarks: AxiosPromise<IGetLogosResponse> = request
    .get(`/users/${payload.userId}/watermarks`);
  return requestWatermarks
    .then(response => {
      const logos: IGetLogosResponse = response.data;
      const logoData: LogoModel[]    = logos.map((logo: LogoResponse) =>
        LogoModel.logoResponseToModel(logo),
      );
      return logoData;
    });

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
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const config  = { headers };
  const properties = { name: payload.name };
  const body = xWwwFormUrlencoded(properties);
  return request.patch(`/users/${payload.userId}/watermarks/${payload.logoId}`, body, config);
}

export default logosAPI;

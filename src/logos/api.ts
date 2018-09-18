import { AxiosPromise } from 'axios';
import request from '../utils/request';
import { LogoModel } from 'src/logos/model';

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
      logos
        .map((logo: LogoResponse) => LogoModel.logoResponseToModel(logo));
      return logos;
    });

}

function changeDefaultLogo(payload: IChangeDefaultLogoRequest): AxiosPromise<any> {
  return request.patch(`/users/${payload.userId}/watermarks/default`, { id: payload.logoId });
}

function deleteLogos(payload: IDeleteLogosRequest): AxiosPromise<any> {
  return request.delete(`/users/${payload.userId}/watermarks`, {
    data: { ids: payload.logosIds },
  });
}

function addLogo(payload: ISetLogosRequest): AxiosPromise<any> {
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

function editLogo(payload: IRefreshLogosRequest): AxiosPromise<any> {
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

import { AxiosInstance, default as axios } from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function xWwwFormUrlencoded(properties: object): string {
  const formBody: string[]  = [];
  for (const property in properties) {
    const encodedKey   = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(properties[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
}

export default request;

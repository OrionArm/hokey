import { AxiosInstance, default as axios } from 'axios';
import FileSaver from 'file-saver';

const downloadRequest: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'blob',
});

export default (url: string) => downloadRequest.get(url).then(response => {
  FileSaver.saveAs(new Blob([response.data]));
});

import axios from 'axios';
import FileSaver from 'file-saver';

export const downloadVideos =
  (urls: string[]) => {
    return axios.post(
      `${process.env.REACT_APP_VIDEO_DOWNLOAD_API}/stream`,
      { urls },
      {
        responseType: 'blob',
      })
      .then((response: any) => {
        FileSaver.saveAs(
          new Blob([response.data]),
          'drills.zip',
        );
      });
  };

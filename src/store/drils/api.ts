import { AxiosPromise } from 'axios';
import FileSaver from 'file-saver';

const qs = require('qs');

import { SearchType } from 'src/components/drills/CategoriesBar';
import { getDrillsByCategoryIdResponse } from 'src/store/drils/model';
import request from 'src/utils/request';
import {
  DrillStatusType,
  GeneratedDrillStatusResponse,
  GeneratedStatusResponse,
  getDrillsByCategoryIdRequest,
  RegenerateDrill,
  DrillDetailed,
  DrillModel,
  NormDrills,
} from './model';

function getDrillsByCategoryId(payload: getDrillsByCategoryIdRequest): AxiosPromise<NormDrills> {
  const { id, categoryType, userId } = payload;

  return request
    .get(`/users/${userId}/drill-categories/${categoryType}/${id}/drills`)
    .then(res => {
      return res.data.reduce(normalizeDrills, {});
    });
}

function getCategories(userId: number | 'me'): AxiosPromise<any> {
  const toEntity = (x: any) => ({
    id: x.categoryid,
    name: x.categoryname,
    count: x.total_drills === undefined ? undefined : +x.total_drills,
  });
  return request.get(`/users/${userId}/drill-categories`).then(res => {
    res.data.custom = res.data.custom.map(toEntity);
    res.data.public = res.data.public.map(toEntity);
    return res;
  });
}

function downloadPdf(id: string, userId: number | string | 'me'): any {
  return request
    .post(`/users/${userId}/drills/${id}/export/pdf`)
    .then(response => {
      window.open(response.data, '_blank');
    });
}

function downloadVideo(id: string, userId: number | 'me'): any {
  return request
    .get(`/users/${userId}/drills/${id}/animation`)
    .then(response => {
      const url = response.data.s3video;
      window.open(url, '_blank');
    });
}

function downloadMultipleVideos(
  drill_ids: string[],
  userId: number | string | 'me',
) {
  return request
    .post(`/users/${userId}/drills/download/videos`, undefined, {
      params: { drill_ids },
      responseType: 'blob',
    })
    .then(response => {
      FileSaver.saveAs(new Blob([response.data]), 'animations.zip');
    });
}

function downloadMultiplePDFs(
  drill_ids: string[],
  userId: number | string | 'me',
) {
  return request
    .post(`/users/${userId}/drills/download/pdfs`, undefined, {
      params: { drill_ids },
      responseType: 'blob',
    })
    .then(response => {
      FileSaver.saveAs(new Blob([response.data]), 'pdfs.zip');
    });
}

function getDrill(
  id: string,
  userId: number | string | 'me',
): AxiosPromise<DrillDetailed> {
  const toEntity = (x: any) => {
    return {
      id: x.drillid,
      preview: x.s3url_1,
      name: x.drillname,
      has_animation: x.has_animation === '1',
      animation: x.animation ? x.animation.s3video : '',
      logo_url: x.logo_url,
    };
  };
  return request.get(`/users/${userId}/drills/${id}`).then(res => {
    res.data = toEntity(res.data);
    return res;
  });
}

function regenerate({
  drill_ids,
  userId,
}: {
  drill_ids: string[];
  userId: number | string | 'me';
}): AxiosPromise<any> {
  return request.post(
    `/users/${userId}/drills/regenerate`,
    qs.stringify({ drill_ids }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

function regenerateWithNewLogo(payload: RegenerateDrill): AxiosPromise<any> {
  const { drill_ids, logoId, userId } = payload;
  console.log('drill_ids', drill_ids, 'logoId', logoId);
  return request.post(
    `/users/${userId}/watermarks/${logoId}/splice`,
    {},
    {
      params: { drill_ids: Array.isArray(drill_ids) ? drill_ids : [drill_ids] },
    },
  );
}

function searchUsers(value: string, type: SearchType): AxiosPromise<any[]> {
  return request
    .get('/users', { params: { value, type } })
    .then(response => {
      const users = response.data.map((user: any) => ({
        value: user.userid,
        label: user.username,
      }));
      response.data = users;
      return response;
    });
}

function searchDrills(value: string): Promise<NormDrills> {
  return request.get('/drills', { params: { value } })
    .then(response => DrillModel.searchResponseToModel(response.data))
    .then(drill => ({ [drill.id]: drill }));
}

function checkGenerationStatus(userId: string, generation_ids: string) {
  return request
    .get(`/users/${userId}/watermarks/generation/status`, {
      params: { generation_ids },
    })
    .then(response => {
      const data: GeneratedStatusResponse = response.data;
      const list: string[] = Object.keys(data);
      const init: GeneratedDrillStatusResponse = {
        generatedIds: [],
        generatedErrorIds: [],
      };

      function checkGenerationStatusReducer(acc: any, id: string) {
        if (id && data[id] === DrillStatusType.error) {
          acc.generatedErrorIds.push(id);
        }
        if (
          data[id] !== DrillStatusType.done &&
          data[id] !== DrillStatusType.error
        ) {
          acc.generatedIds.push(id);
        }

        return acc;
      }

      return list.reduce(checkGenerationStatusReducer, init);
    });
}

function normalizeDrills(
  acc: NormDrills,
  drillResponse: getDrillsByCategoryIdResponse,
): NormDrills {
  const drill = DrillModel.responseToModel(drillResponse);
  acc[drill.id] = drill;
  return acc;
}

const drillsAPI = {
  checkGenerationStatus,
  downloadMultiplePDFs,
  downloadMultipleVideos,
  downloadPdf,
  downloadVideo,
  getCategories,
  getDrill,
  getDrillsByCategoryId,
  regenerate,
  regenerateWithNewLogo,
  searchDrills,
  searchUsers,
};
export default drillsAPI;

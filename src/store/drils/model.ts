export class DrillModel {
  constructor(
    public id: string            = '',
    public name: string          = '',
    public hasAnimation: boolean = false,
    public userId: string        = '',
  ) {
  }

  static responseToModel(json: getDrillsByCategoryIdResponse): DrillModel {
    const drill        = new DrillModel();
    drill.id           = json.drillid;
    drill.name         = json.drillname;
    drill.hasAnimation = json.has_animation === '1';
    drill.userId       = json.user_id;

    return drill;
  }
}
export type NormDrills = {
  [key: string]: DrillModel,
};

export interface DrillDetailed extends DrillModel {
  preview: string;
  animation: string;
  logo_url: string;
}

export interface DrillCategory {
  name: string;
  count: number;
  id: string;
}

export enum DrillCategoryType {
  Custom = 'custom',
  Public = 'public',
}

export interface DrillCategoriesGrouped {
  [DrillCategoryType.Custom]: DrillCategory[];
  [DrillCategoryType.Public]: DrillCategory[];
}

export type RegenerateDrill = {
  drill_ids: string[];
  userId: number | string | 'me';
  logoId?: string;
};

export enum CurrentLoadingType {
  selfVideo  = 'selfVideo',
  allVideo   = 'allVideo',
  allPdf     = 'allPdf',
  selfPdf    = 'selfPdf',
  regenerate = 'regenerate',
}

export type DownloadDrill = {
  loading: Partial<Record<CurrentLoadingType, boolean | string>>;
};

export type DownloadParams = {
  checkedIds: string[];
  selectedUserId: string | number | 'me';
};

export type DrillStatus = { [drillId: string]: string };

export enum DrillStatusType {
  pending = 'pending',
  done    = 'done',
  none    = 'none',
  error   = 'error',
}

export type GeneratedDrillStatusResponse = {
  generatedIds: string[];
  generatedErrorIds: string[];
};

export type GeneratedStatusTypeResponse = 'pending' | 'done' | 'none' | 'error';

export type GeneratedStatusResponse = {
  [drillId: string]: GeneratedStatusTypeResponse;
};

export type getDrillsByCategoryIdRequest = {
  id: string;
  categoryType: DrillCategoryType;
  userId: number | 'me';
};

export type getDrillsByCategoryIdResponse = {
  drillid: string;
  drillname: string;
  has_animation: string;
  user_id: string;
};

export interface Drill {
  id: string;
  name: string;
  has_animation: boolean;
  userId: string;
}

export interface DrillDetailed extends Drill {
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

export interface DrillCategoriesGroupped {
  [DrillCategoryType.Custom]: DrillCategory[];
  [DrillCategoryType.Public]: DrillCategory[];
}

export type RegenereteDrill = {
  drill_ids: string[];
  userId: number | string | 'me';
  logoId?: string;
};

// interface IKeyLoading {
//   allVideo: boolean;
//   allPdf: boolean;
//   selfVideo: boolean;
//   selfPdf: boolean;
// }
type neType = 'allVideo' | 'allPdf' | 'selfVideo' | 'selfPdf';
// const newtest: typeof eKeyLoading;

export type DownloadDrill = {
  loading: Partial<Record<neType, boolean | string>>;
};

export type DownloadParams = {
  checkedIds?: string[];
  selectedUserId?: string | number | 'me';
};

export type DrillStatus = { [drillId: string]: string };

export enum DrillStatusType {
  pending = 'pending',
  done    = 'done',
  none    = 'none',
  error   = 'error',
}
export type GeneratedDrillStatusResponse = { generatedIds: string[], generatedErrorIds: string[] };

export type GeneratedStatusTypeResponse = 'pending' | 'done' | 'none' | 'error';

export type GeneratedStatusResponse = { [drillId: string]: GeneratedStatusTypeResponse };

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
  drill_ids: string[],
  userId: number | string | 'me',
  logoId?: string,
};

export type DrillStatus = { [drillId: string]: string };

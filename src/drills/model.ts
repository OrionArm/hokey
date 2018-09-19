
export interface Drill {
  id: string;
  name: string;
  has_animation: boolean;
}

export interface DrillDetailed extends Drill {
  s3url_1?: string;
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

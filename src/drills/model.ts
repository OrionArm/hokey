
export interface Drill {
  id: string;
  name: string;
  has_animation: boolean;
}

export interface DrillDetailed extends Drill {
  preview: string;
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


export interface Drill {
  id: string;
  name: string;
}

export interface DrillDetailed extends Drill {

}

export interface DrillCategory {
  name: string;
  count: number;
  id: number;
}

export enum DrillCategoryType {
  Custom = 'custom',
  Public = 'public',
}

export interface DrillCategoriesGroupped {
  [DrillCategoryType.Custom]: DrillCategory[];
  [DrillCategoryType.Public]: DrillCategory[];
}

import { LogoModel } from 'src/store/logos/model';

export type IGetLogosResponse = LogoResponse[];

export type LogoResponse = {
  id: string;
  user_id: string;
  is_main: string;
  name: string;
  transparency: string;
  url: string;
  coord_x: string;
  coord_y: string;
  file_id: string;
  height: string;
  width: string;
};

export type LogoEditResponse = {
  id: string;
  user_id: string;
  is_main: string;
  name: string;
  transparency?: string;
  url?: string;
  coord_x?: string;
  coord_y?: string;
  file_id?: string;
  height?: string;
  width?: string;
};

export interface IChangeDefaultLogoRequest {
  logoId: string;
  userId: string;
}

export interface IDeleteLogosRequest {
  logosIds: string[];
  userId: string;
}

export interface ISetLogosRequest {
  image: File;
  userId: string;
  name: string;
}

export interface IRefreshLogosRequest {
  logoId: string;
  images: File;
  userId: string;
}

export type NormLogos = {
  [key: string]: LogoModel;
};

// interface ISetLogoRequest {
//   name;
//   filename;
// }

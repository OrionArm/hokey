import { LogoModel } from 'src/store/logos/model';

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

export type GetLogosResponse = LogoResponse[];

export type ChangeDefaultLogoRequest = { logoId: string; userId: string };

export type DeleteLogosRequest = { logosIds: string[]; userId: string };

export type EditLogoRequest = { userId: string, logoId: string, name: string };

export type SetLogosRequest = { image: File; userId: string; name: string };

export type RefreshLogosRequest = { logoId: string; images: File; userId: string };

export type NormLogos = { [key: string]: LogoModel };

export type logoIdList = { logosIds: string[] };

type IGetLogosResponse = LogoResponse[];

type LogoResponse = {
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

interface IChangeDefaultLogoRequest {
  logoId: string;
  userId: string;
}

interface IDeleteLogosRequest {
  logosIds: string[];
  userId: string;
}

interface ISetLogosRequest {
  images: FileList;
  userId: string;
}

interface IRefreshLogosRequest {
  logoId: string;
  images: File[];
  userId: string;
}

// interface ISetLogoRequest {
//   name;
//   filename;
// }

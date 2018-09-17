interface IChangeDefaultLogoRequest {
  logoId: string;
  userId: string;
}

interface IDeleteLogosRequest {
  logosIds: string[];
  userId: string;
}

interface ISetLogosRequest {
  images: File[];
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

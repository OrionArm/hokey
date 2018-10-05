interface ILoginRequest {
  username: string;
  password: string;
}
interface ILoginResponse {
  user: IUser;
  jwt: string;
}

interface IUser {
  email: string;
  first: string;
  last: string;
  user_level: 'U' | 'A';
  pro_access: '0' | '1';
  logo_overlay: 0 | 1;
  hs_logo: 0 | 1;
  userid: string;
  username: string;
}

interface IUserData extends IUser, ILoginRequest {}

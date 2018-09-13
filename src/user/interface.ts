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
  primaryrole: string;
  userid: string;
  username: string;
}

interface IUserData extends IUser, ILoginRequest {}

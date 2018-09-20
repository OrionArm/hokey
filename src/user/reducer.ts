import * as fromActions from './actions';

export interface UserState {
  profile: IUser | null;
}

export const initialState: UserState = {
  profile: null,
};

export const reducer = (
  state = initialState,
  action: fromActions.userActions): typeof initialState => {
  switch (action.type) {
    case fromActions.LOGIN_SUCCESS: {
      const profile = action.payload;

      return ({ profile });
    }
    default:
      return state;
  }
};

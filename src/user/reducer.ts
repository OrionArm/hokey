import * as fromActions from './actions';

export const initialState = {
  profile: {
    email: '',
    first: '',
    last: '',
    primaryrole: '',
    userid: '',
    username: '',
  },
};
export type UserState = typeof initialState;

export const reducer = (
  state = initialState,
  action: fromActions.userActions): UserState => {
  switch (action.type) {
    case fromActions.LOGIN_SUCCESS: {
      const profile = action.payload;

      return ({ profile });
    }
    default:
      return state;
  }
};

import * as fromActions from './actions';

export const initialState = {
  jwt: '',
  user: {
    email: '',
    first: '',
    last: '',
    primaryrole: '',
    userid: '',
    username: '',
  },
};
export type State = typeof initialState;

export const reducer = (state = initialState, action: fromActions.userActions): State => {
  switch (action.type) {
    case fromActions.LOGIN_SUCCESS: {
      const { jwt, user } = action.payload;

      return ({ jwt, user });
    }
    default:
      return state;
  }
};

import * as fromActions from './actions';

export const initialState = {
  token: '',
};
export type State = typeof initialState;

export const reducer = (state = initialState, action: fromActions.userActions): State => {
  switch (action.type) {
    case fromActions.LOGIN_SUCCESS: {
      const token = action.payload;

      return ({ token });
    }
    default:
      return state;
  }
};

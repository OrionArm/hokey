import * as fromActions from './actions';

export const initialState: string = '';
export type TokenState = typeof initialState;

export const reducer = (state = initialState, action: fromActions.setToState): TokenState => {
  switch (action.type) {
    case fromActions.SET_TO_STATE: {
      const token = action.payload;

      return token;
    }
    default:
      return state;
  }
};

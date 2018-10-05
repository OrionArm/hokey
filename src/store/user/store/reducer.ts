import * as fromActions from './actions';

export type UserState  = {
  profile: IUser | null;
  selectedUserId: string | 'me';
};

export const initialState: UserState = {
  profile: null,
  selectedUserId: 'me',
};

export const reducer = (
  state = initialState,
  action: fromActions.userActions): typeof initialState => {
  switch (action.type) {
    case fromActions.LOGIN_SUCCESS: {
      const profile = action.payload;
      return { ...state, profile };
    }
    case fromActions.SELECT_USER: {
      return { ...state, selectedUserId: action.payload.id };
    }
    default:
      return state;
  }
};

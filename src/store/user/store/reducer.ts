import produce from 'immer';
import * as fromActions from './actions';

export type UserState  = {
  profile: IUser | null;
  selectedUserId: string | 'me';
  loading: boolean,
  error: boolean,
  errorMessage: string,
};

export const initialState: UserState = {
  profile: null,
  selectedUserId: 'me',
  loading: false,
  error: false,
  errorMessage: '',
};

export const reducer = (
  state = initialState,
  action: fromActions.userActions): typeof initialState => {
  return produce<UserState>(state, draft => {
    switch (action.type) {
      case fromActions.LOGIN_REQUEST: {
        draft.loading = true;
        draft.error = false;
        return;
      }
      case fromActions.LOGIN_SUCCESS: {
        draft.profile = action.payload;
        draft.loading = false;
        draft.error = false;
        return;
      }
      case fromActions.LOGIN_FAIL: {
        draft.errorMessage = action.payload.errorMessage;
        draft.loading = false;
        draft.error = true;
        return;
      }
      case fromActions.SELECT_USER: {
        draft.selectedUserId = action.payload.id;
        return;
      }
      default:
        return state;
    }
  });
};

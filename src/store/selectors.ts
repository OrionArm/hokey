import { createSelector } from 'reselect';
import { RootState } from 'src/store/rootReducers';

const getState = (state: RootState) => state;
export const getUserId = createSelector(
  getState,
  state => {
    return state.user.selectedUserId;
    // return state.user.profile ? state.user.profile.userid : null;
  },
);

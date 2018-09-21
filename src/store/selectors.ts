import { createSelector } from 'reselect';
import { RootState } from 'src/store/rootReducers';

const getState = (state: RootState) => state;
const getModalJuggler = createSelector(getState, state => state.modalJuggler);
export const getUserId = createSelector(
  getState,
  state => {
    return state.user.selectedUserId;
    // return state.user.profile ? state.user.profile.userid : null;
  },
);
export const getModals = createSelector(getModalJuggler, modalJuggler => modalJuggler.modals);

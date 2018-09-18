import { createSelector } from 'reselect';
import { RootState } from 'src/store/rootReducers';

const getState        = (state: RootState) => state;
const getModalJuggler = createSelector(getState, state => state.modalJuggler);

export const getModals = createSelector(getModalJuggler, modalJuggler => modalJuggler.modals);

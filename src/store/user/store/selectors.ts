import { createSelector } from 'reselect';
import { RootState } from 'src/store/rootReducers';

const getState = (state: RootState) => state;

export const getUserId = createSelector(
  getState, state => {
    return state.user.selectedUserId;
  },
);

export const getProfile = createSelector(
  getState, state => {
    return state.user.profile;
  },
);

export const userDefaultAccessSelector = createSelector(
  getState, state => state.user.profile
    && state.user.profile.user_level
    && state.user.profile.user_level === 'U'
    && state.user.profile.hs_logo === 1
    && state.user.profile.pro_access === '0'
    || false,
);

export const userProAccessSelector = createSelector(
  getState, state => state.user.profile
    && state.user.profile.user_level
    && state.user.profile.user_level === 'U'
    && state.user.profile.hs_logo === 0
    && state.user.profile.pro_access === '1'
    || false,
);

export const userLogoAccessSelector  = createSelector(
  getState, state => state.user.profile
    && state.user.profile.user_level
    && state.user.profile.user_level === 'U'
    && state.user.profile.logo_overlay === 1
    || false,
);

export const userAdminAccessSelector = createSelector(
  getState, state => state.user.profile ? state.user.profile.user_level === 'A' : false,
);

export const isLogosAvailableSelector = createSelector(
  getState, state =>
    userAdminAccessSelector(state)
    || userProAccessSelector(state)
    || userLogoAccessSelector(state),
);

export const logoAndAdminSelector = createSelector(
  getState, state => userLogoAccessSelector(state) || userAdminAccessSelector(state),
);

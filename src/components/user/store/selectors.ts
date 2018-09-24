import { RootState } from 'src/store/rootReducers';

export const isUserAnAdminSelector = (state: RootState) => {
  return state.user.profile ? state.user.profile.user_level === 'A' : false;
};

export const hasUserProAccessSelector = (state: RootState) => {
  return state.user.profile ? state.user.profile.pro_access === '1' : false;
};

export const isLogosAvailableSelector = (state: RootState) => {
  return isUserAnAdminSelector(state) || hasUserProAccessSelector(state);
};

import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import * as userReducer from 'src/store/user/store/reducer';
import * as tokenReducer from 'src/store/user/token/reducer';
import * as watermarksReducer from 'src/store/logos/reducer';
import * as drillsReducer from 'src/store/drils/reducer';
import * as toastReducer from 'src/store/toast/reducer';

export type RootStateWithoutRouter = {
  readonly user: userReducer.UserState;
  readonly token: tokenReducer.TokenState;
  readonly watermarks: watermarksReducer.logosState;
  readonly drills: drillsReducer.DrillsState;
  readonly toast: toastReducer.toastState;
};
export type RootState = RootStateWithoutRouter & { router: RouterState };

const rootReducer = combineReducers<RootStateWithoutRouter>({
  user: userReducer.reducer,
  token: tokenReducer.reducer,
  watermarks: watermarksReducer.reducer,
  drills: drillsReducer.reducer,
  toast: toastReducer.reducer,
});

export default rootReducer;

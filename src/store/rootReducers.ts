import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import * as userReducer from 'src/store/user/store/reducer';
import * as tokenReducer from 'src/store/user/token/reducer';
import * as watermarksReducer from 'src/store/logos/reducer';
import * as drillsReducer from 'src/store/drils/reducer';

export interface RootState {
  readonly routing: RouterState;
  readonly user: userReducer.UserState;
  readonly token: tokenReducer.TokenState;
  readonly watermarks: watermarksReducer.logosState;
  readonly drills: drillsReducer.DrillsState;
}

export default combineReducers<RootState>({
  routing: routerReducer,
  user: userReducer.reducer,
  token: tokenReducer.reducer,
  watermarks: watermarksReducer.reducer,
  drills: drillsReducer.reducer,
});

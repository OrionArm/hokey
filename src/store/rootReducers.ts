import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import * as userReducer from 'src/components/user/store/reducer';
import * as tokenReducer from 'src/components/user/token/reducer';
import * as watermarksReducer from 'src/components/logos/store/reducer';
import * as drillsReducer from 'src/components/drills/store/reducer';
import modalJugglerReducer from 'src/modal-juggler/reducer';
import { IModalJugglerState } from 'src/modal-juggler/interface';

export interface RootState {
  readonly routing: RouterState;
  readonly user: userReducer.UserState;
  readonly token: tokenReducer.TokenState;
  readonly watermarks: watermarksReducer.logosState;
  readonly drills: drillsReducer.DrillsState;
  readonly modalJuggler: IModalJugglerState;
}

export default combineReducers<RootState>({
  routing: routerReducer,
  user: userReducer.reducer,
  token: tokenReducer.reducer,
  watermarks: watermarksReducer.reducer,
  drills: drillsReducer.reducer,
  modalJuggler: modalJugglerReducer,
});

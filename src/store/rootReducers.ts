import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import * as userReducer from 'src/user/reducer';
import * as tokenReducer from 'src/user/token/reducer';

export interface IRootReducer {
  readonly user: userReducer.UserState;
  readonly token: tokenReducer.TokenState;
  readonly routing: RouterState;
}
export default combineReducers<IRootReducer>({
  user: userReducer.reducer,
  token: tokenReducer.reducer,
  routing: routerReducer,
});

import { combineReducers } from 'redux';
import * as userReducer from 'src/user/reducer';
import * as tokenReducer from 'src/user/token/reducer';

export default combineReducers({
  user: userReducer.reducer,
  token: tokenReducer.reducer,
});

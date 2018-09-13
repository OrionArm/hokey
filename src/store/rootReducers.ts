import { combineReducers } from 'redux';
import * as userReducer from 'src/user/reducer';

export default combineReducers({
  user: userReducer.reducer,
});

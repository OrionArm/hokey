import { all, spawn } from 'redux-saga/effects';
import userSaga from 'src/user/saga';
import tokenSaga from 'src/user/token/saga';

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(tokenSaga),
  ]);
}

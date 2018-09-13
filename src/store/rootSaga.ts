import { all, spawn } from 'redux-saga/effects';
import userSaga from 'src/user/saga';

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
  ]);
}

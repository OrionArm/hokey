import { all, spawn } from 'redux-saga/effects';
import userSaga from 'src/store/user/store/saga';
import tokenSaga from 'src/store/user/token/saga';
import logosSaga from 'src/store/logos/saga';
import drillsSaga from 'src/store/drils/saga';

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(tokenSaga),
    spawn(logosSaga),
    spawn(drillsSaga),
  ]);
}

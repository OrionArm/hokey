import { all, spawn } from 'redux-saga/effects';
import userSaga from 'src/components/user/store/saga';
import tokenSaga from 'src/components/user/token/saga';
import logosSaga from 'src/components/logos/store/saga';
import drillsSaga from 'src/components/drills/store/saga';

export default function* rootSaga() {
  yield all([
    spawn(userSaga),
    spawn(tokenSaga),
    spawn(logosSaga),
    spawn(drillsSaga),
  ]);
}
